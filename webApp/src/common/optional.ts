/**
 * 仿java Optional
 */
import {Assert} from './utils';


export class Optional<T> {
  private readonly value = null as unknown as T;

  public static of<T>(t: T): Optional<T> {
    Assert.notNull(t, '传入的值必须为真');
    return new Optional(t);
  }

  public static empty<T>(): Optional<T> {
    return new Optional();
  }

  private constructor(value?: T) {
    this.value = value as T;
  }

  public get(): T {
    if (this.value === null || this.value === undefined) {
      throw new Error('当前值为null或undefined，不能够调用get方法');
    }
    return this.value;
  }

  public present(): boolean {
    return !this.value === null;
  }
}
