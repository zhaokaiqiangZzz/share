import { Optional } from './optional';

describe('Test', () => {
  it('should create an instance', () => {
    let optional = Optional.of({}) as Optional<{}>;
    expect(optional.present).toBeTruthy();
    expect(optional.get()).toEqual({});

    optional = Optional.empty();
    expect(optional.present()).toBeFalsy();
    expect(() => optional.get()).toThrowError('当前值为null或undefined，不能够调用get方法');
  });
});
