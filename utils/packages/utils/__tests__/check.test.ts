import { isEmail, isIdCard, isUrl, isPhoneNumber, isPostalCode, isBankCard } from '../src/check';

/**
 * basic check
 */
test('email test', () => {
  expect(isEmail('example@domain.com')).toBe(true);
  expect(isEmail('example@')).toBe(false);
  expect(isEmail('example@domain')).toBe(false);
  expect(isEmail('example@domain.')).toBe(false);
  expect(isEmail('example@domain..com')).toBe(false);
});

test('idCard test', () => {
  expect(isIdCard('610527199201015209')).toBe(true);
  expect(isIdCard('11010519491231002X')).toBe(true);
  expect(isIdCard('1101051949123100')).toBe(false);
  expect(isIdCard('11010519491231002A')).toBe(false);
  expect(isIdCard('123456789012345')).toBe(false);
});

test('url test', () => {
  expect(isUrl('https://www.example.com')).toBe(true);
  expect(isUrl('https://subdomain.example.com/path/page.html?query=string')).toBe(true);
  expect(isUrl('ftp://ftp.example.com')).toBe(true);
  expect(isUrl('example.com')).toBe(true);
  expect(isUrl('http://example')).toBe(false);
});

test('phone number test', () => {
  expect(isPhoneNumber('08613812345678')).toBe(true);
  expect(isPhoneNumber('8613812345678')).toBe(true);
  expect(isPhoneNumber('013812345678')).toBe(true);
  expect(isPhoneNumber('13812345678')).toBe(true);
  expect(isPhoneNumber('086138123456789')).toBe(false);
  expect(isPhoneNumber('86-13812345678')).toBe(false);
  expect(isPhoneNumber('13812345')).toBe(false);
});

test('postal code test', () => {
  expect(isPostalCode('311100')).toBe(true);
  expect(isPostalCode('31110')).toBe(false);
  expect(isPostalCode('3111000')).toBe(false);
  expect(isPostalCode('031110')).toBe(false);
});

test('bank card test', () => {
  expect(isBankCard('6222600584855931')).toBe(true);
  expect(isBankCard('023456789012345')).toBe(false);
  expect(isBankCard('1234567890123456')).toBe(true);
  expect(isBankCard('12345678901234')).toBe(false);
});
