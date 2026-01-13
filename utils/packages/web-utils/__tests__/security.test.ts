import {
  escapeHtml,
  unescapeHtml,
  sanitizeUrl,
  generateCSPNonce,
  maskPhoneNumber,
  maskEmail,
  maskIDCard,
  maskBankCard,
  maskText,
  generateCSRFToken,
  storeCSRFToken,
  getCSRFToken,
  addCSRFHeader,
  parseCSP,
  stringifyCSP,
  createBaseCSP,
} from '../src/security';

describe('security utils', () => {
  it('escapeHtml and unescapeHtml should be inverse', () => {
    const input = `<div class="x">O'Hara & Co</div>`;
    const escaped = escapeHtml(input);
    expect(escaped).toBe('&lt;div class=&quot;x&quot;&gt;O&#39;Hara &amp; Co&lt;/div&gt;');
    expect(unescapeHtml(escaped)).toBe(input);
  });

  it('sanitizeUrl should block dangerous protocols', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('about:blank');
    expect(sanitizeUrl('data:text/html,evil')).toBe('about:blank');
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
  });

  it('masking utilities should mask sensitive data', () => {
    expect(maskPhoneNumber('13812345678')).toBe('138****5678');
    expect(maskEmail('user@example.com')).toBe('u***r@example.com');
    expect(maskIDCard('1234567890123456')).toBe('1234**********3456');
    expect(maskBankCard('6222021234567890')).toBe('****7890');
    expect(maskText('abcdef', 1, 1)).toBe('a****f');
  });

  it('CSRF helpers should store and read tokens', () => {
    localStorage.clear();
    storeCSRFToken('token123');
    expect(getCSRFToken()).toBe('token123');
    expect(addCSRFHeader({ a: 'b' })).toEqual({ a: 'b', 'X-CSRF-Token': 'token123' });
  });

  it('CSP helpers should parse and stringify', () => {
    const csp = "default-src 'self'; img-src 'self' data:";
    expect(parseCSP(csp)).toEqual({
      'default-src': ["'self'"],
      'img-src': ["'self'", 'data:'],
    });
    expect(stringifyCSP({ 'default-src': ["'self'"] })).toBe("default-src 'self'");
  });

  it('createBaseCSP should include nonce when provided', () => {
    const csp = createBaseCSP('abc');
    expect(csp['script-src']).toContain("'nonce-abc'");
    expect(csp['style-src']).toContain("'nonce-abc'");
  });

  it('should generate CSP and CSRF tokens', () => {
    const originalCrypto = window.crypto;
    Object.defineProperty(window, 'crypto', {
      value: {
        getRandomValues: (arr: Uint8Array) => {
          arr.fill(1);
          return arr;
        },
      },
      configurable: true,
    });

    const nonce = generateCSPNonce();
    const token = generateCSRFToken();
    expect(nonce.length).toBeGreaterThan(0);
    expect(token.length).toBe(64);

    Object.defineProperty(window, 'crypto', {
      value: originalCrypto,
      configurable: true,
    });
  });
});
