/**
 * SQL validation tests
 */
import { isValidSQL } from '../src/common/sql';

describe('isValidSQL', () => {
  it('should validate common SQL statements', () => {
    expect(isValidSQL('SELECT * FROM users WHERE id = 1;')).toBe(true);
    expect(isValidSQL("INSERT INTO users (id, name) VALUES (1, 'Alice');")).toBe(true);
    expect(isValidSQL("UPDATE users SET name = 'Bob' WHERE id = 2;")).toBe(true);
  });

  it('should handle comments and whitespace', () => {
    const sql = 'SELECT * FROM users -- comment\nWHERE id = 1;';
    expect(isValidSQL(sql)).toBe(true);
  });

  it('should reject empty or obviously broken SQL', () => {
    expect(isValidSQL('')).toBe(false);
    expect(isValidSQL('   ')).toBe(false);
    expect(isValidSQL("SELECT * FROM users WHERE name = 'Alice")).toBe(false);
    expect(isValidSQL('SELECT (id FROM users')).toBe(false);
    expect(isValidSQL('SELECT * FROM users WHERE')).toBe(false);
    expect(isValidSQL('* FROM users')).toBe(false);
    expect(isValidSQL('SELECT * FROM users WHERE id =')).toBe(false);
    expect(isValidSQL('SELECT * FROM users)')).toBe(false);
    expect(isValidSQL('SELECT 1;;')).toBe(false);
  });
});
