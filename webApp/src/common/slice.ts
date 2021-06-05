import { Pageable } from './pageable';
import { Sort } from './sort';

export class Slice<T> {
  /**
   * 第几页
   */
  number: number;

  /**
   * 每页大小
   */
  size: number;

  /**
   * 当前页数据条数
   */
  numberOfElements: number;

  content: T[];

  /**
   * 是否首页
   */
  first: boolean;
  /**
   * 是否尾页
   */
  last: boolean;

  pageable: Pageable;

  sort: Sort;

  constructor(data = {} as {
    number?: number,
    size?: number,
    numberOfElements?: number,
    content?: T[],
    first?: boolean,
    last?: boolean,
    pageable?: Pageable,
    sort?: Sort,
    convertObjectFn?: (d: T) => T
  }) {
    this.number = data.number as number;
    this.size = data.size as number;
    this.numberOfElements = data.numberOfElements as number;
    this.first = data.first as boolean;
    this.last = data.last as boolean;
    this.pageable = new Pageable(data.pageable) as Pageable;
    this.sort = data.sort as Sort;
    if (data.convertObjectFn) {
      this.content = [];
      data.content?.forEach(v => {
        if (data.convertObjectFn) {
          this.content.push(data.convertObjectFn(v));
        }
      });
    } else {
      this.content = data.content as T[];
    }
  }
}
