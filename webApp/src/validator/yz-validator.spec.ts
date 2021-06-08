import { YzValidator } from './yz-validator';
import {FormControl} from '@angular/forms';

describe('UserValidator', () => {
  it('手机号验证', () => {
    expect(new YzValidator()).toBeTruthy();

    // 空手机号，返回非null
    const formControl = new FormControl('');
    expect(YzValidator.phone(formControl)).toBeTruthy();

    // 正常的手机号，返回null
    formControl.setValue('13900000000');
    expect(YzValidator.phone(formControl)).toBeNull();

    // 以2打头，返回非null
    formControl.setValue('23900000000');
    expect(YzValidator.phone(formControl)).toBeTruthy();

    // 不足11位，返回非null
    formControl.setValue('1390000000');
    expect(YzValidator.phone(formControl)).toBeTruthy();
  });

  it('分数验证', () => {
    expect(new YzValidator()).toBeTruthy();

    // 分数为空，返回非null
    const formControl = new FormControl('');
    expect(YzValidator.score(formControl)).toBeTruthy();

    // 分数大于100，返回非null
    formControl.setValue(1000);
    expect(YzValidator.score(formControl)).toBeTruthy();

    // 分数小于100大于0，返回null
    formControl.setValue(88);
    expect(YzValidator.score(formControl)).toBeNull();
  });
});
