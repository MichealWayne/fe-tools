/**
 * @author Wayne
 * @Date 2023-02-07 09:56:41
 * @LastEditTime 2024-02-20 11:18:19
 */
import { compareVersion, digitUppercase } from '../src/others';

describe('others test', () => {
  it('compareVersion()', async () => {
    expect(compareVersion('1.1.8', '1.0.4')).toEqual(1);
    expect(compareVersion('1.0.2', '1.0.2')).toEqual(0);
    expect(compareVersion('2.0', '2.0.0')).toEqual(0);
    expect(compareVersion('3.0.1', '3.0.0.2')).toEqual(1);
    expect(compareVersion('1.1.1', '1.2.3')).toEqual(-1);
  });

  it('digitUppercase()', async () => {
    expect(digitUppercase(1000)).toEqual('壹仟元整');
    expect(digitUppercase(-123.45)).toEqual('欠壹佰贰拾叁元肆角伍分');
  });
});
