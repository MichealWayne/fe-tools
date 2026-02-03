/**
 * @fileoverview SQL syntax sanity checks for Node.js applications.
 *
 * Provides lightweight, heuristic validation to detect obvious SQL syntax issues.
 * This is NOT a full SQL parser and should not be used as a security or compliance tool.
 *
 * @module SQL
 * @author Wayne
 * @since 1.0.0
 */

/**
 * @function isValidSQL
 * @description 检测SQL语句是否存在明显语法异常(启发式校验，不替代SQL解析器)。Checks for obvious SQL syntax anomalies (heuristic check, not a full parser).
 * @param {string} sql - 待校验的SQL字符串。SQL string to validate
 * @returns {boolean} 如果未发现明显语法异常则返回true。True if no obvious syntax anomalies found
 * @example
 * // Basic SELECT
 * isValidSQL('SELECT * FROM users WHERE id = 1;'); // true
 *
 * @example
 * // Unmatched quote
 * isValidSQL("SELECT * FROM users WHERE name = 'Alice"); // false
 *
 * @example
 * // Unbalanced parentheses
 * isValidSQL('SELECT (id FROM users'); // false
 */
export function isValidSQL(sql: string): boolean {
  const input = sql.trim();
  if (!input) return false;

  let cleaned = '';
  let paren = 0;
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i + 1];

    if (inLineComment) {
      if (ch === '\n') {
        inLineComment = false;
        cleaned += ' ';
      }
      continue;
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
        cleaned += ' ';
      }
      continue;
    }

    if (inSingle) {
      if (ch === "'") {
        if (next === "'") {
          cleaned += "''";
          i++;
          continue;
        }
        inSingle = false;
      }
      cleaned += ch;
      continue;
    }

    if (inDouble) {
      if (ch === '"') {
        if (next === '"') {
          cleaned += '""';
          i++;
          continue;
        }
        inDouble = false;
      }
      cleaned += ch;
      continue;
    }

    if (inBacktick) {
      if (ch === '`') {
        inBacktick = false;
      }
      cleaned += ch;
      continue;
    }

    if (ch === '-' && next === '-') {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === '#') {
      inLineComment = true;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    if (ch === "'") {
      inSingle = true;
      cleaned += ch;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      cleaned += ch;
      continue;
    }
    if (ch === '`') {
      inBacktick = true;
      cleaned += ch;
      continue;
    }

    if (ch === '(') {
      paren++;
    } else if (ch === ')') {
      paren--;
      if (paren < 0) return false;
    }

    cleaned += ch;
  }

  if (inSingle || inDouble || inBacktick || inBlockComment) return false;
  if (paren !== 0) return false;

  const normalized = cleaned.replace(/\s+/g, ' ').trim();
  if (!normalized) return false;
  if (/;;+/.test(normalized)) return false;

  const withoutTrailingSemicolon = normalized.replace(/;+\s*$/, '');
  if (!withoutTrailingSemicolon) return false;
  if (!/[A-Za-z]/.test(withoutTrailingSemicolon)) return false;

  if (/^[,+\-*/=]/.test(withoutTrailingSemicolon)) return false;
  if (/[,+\-*/=]$/.test(withoutTrailingSemicolon)) return false;
  if (/(AND|OR|ON|WHERE|FROM|JOIN|INTO|VALUES|SET|BY|HAVING|LIMIT|OFFSET)$/i.test(withoutTrailingSemicolon)) {
    return false;
  }

  return true;
}
