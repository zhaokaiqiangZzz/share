/**
 * user的验证类
 */
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class YzValidator {
  /**
   * 整理验证器.
   * @param control 表单控制器
   */
  static integer(control: AbstractControl): ValidationErrors | null {
    return Number.isInteger(control.value) ? null : {integer: '输入必须为整型'};
  }

  /**
   * 非空字符串
   * @param control 控制器
   */
  static notEmpty(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (value.trim().length > 0) {
      return null;
    }

    return {notEmpty: '字符串为空'};
  }

  static phone(control: AbstractControl): ValidationErrors | null {
    const phone = control.value as string;
    if (/^1[3456789]\d{9}$/.test(phone)) {
      return null;
    }
    return {phone: '手机号格式不正确'};
  }

  static score(control: AbstractControl): ValidationErrors | null {
    if (control.value === undefined || control.value === null || control.value === '') {
      return {score: '分数不正确'};
    }

    if ((typeof control.value) === 'number') {
      if (control.value <= 100 && control.value >= 0) {
        return null;
      }
    } else {
      const score = control.value as number;
      if (score <= 100 && score >= 0) {
        return null;
      }
    }
    return {score: '分数不正确'};
  }

  /**
   * 数组最小长度.
   * @param length 长度
   */
  static arrayMinLength(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as [];
      if (!Array.isArray(value)) {
        return {arrayMinLength: {value: '输入类型错误'}};
      }

      return value.length >= length ? null : {arrayMinLength: {value: '数组长度过短'}};
    };
  }
}
