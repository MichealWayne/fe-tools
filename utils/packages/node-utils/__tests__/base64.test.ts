import { base64Encode, base64Decode } from '../src/lib/util/base64';

describe('base64Encode', () => {
  it('should encode a string to base64', () => {
    const result = base64Encode('hello world');
    expect(result).toEqual('aGVsbG8gd29ybGQ=');
  });
});

describe('base64Decode', () => {
  it('should decode a base64 string to the original string', () => {
    const result = base64Decode('aGVsbG8gd29ybGQ=');
    expect(result).toEqual('hello world');
  });
});
