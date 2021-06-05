import {Pageable} from './pageable';
import {Slice} from './slice';
import {Sort} from './sort';

/**
 * 分页
 */
export class Page<T> extends Slice<T> {
  /**
   * 总页数
   */
  totalPages: number;

  /**
   * 总数据条数
   */
  totalElements: number;

  public static getPage<T>(data = {} as {
    number: number,
    size: number,
    allContent: T[],
    filter?: (a: T) => boolean
  }): Page<T> {
    let page = data.number >= 0 ? data.number : 0;
    const size = data.size;
    let first = false;
    let last = false;
    let totalPages;

    let allContent = [] as T[];
    if (data.filter) {
      allContent = data.allContent.filter(a => data.filter(a));
    } else {
      allContent = data.allContent;
    }
    const numberOfElements = allContent.length;

    totalPages = Math.ceil(numberOfElements / size);
    if (page >= totalPages) {
      page = totalPages - 1;
    }

    if (page === totalPages - 1) {
      last = true;
    }

    if (page === 0) {
      first = true;
    }

    const pageable = new Pageable({
      page,
      size
    });

    const content = allContent.slice(page * size,
      (page + 1) * size > numberOfElements ? numberOfElements : (page + 1) * size);

    console.log(page);
    return new Page({
      number: page,
      size,
      numberOfElements,
      content,
      first,
      last,
      pageable,
      totalElements: allContent.length,
      totalPages
    });
  }

  constructor(data = {} as {
    number?: number,
    size?: number,
    numberOfElements?: number,
    content?: T[],
    first?: boolean,
    last?: boolean,
    pageable?: Pageable,
    sort?: Sort
    totalElements?: number
    totalPages?: number,
    convertObjectFn?: (d: T) => T
  }) {
    super(data);
    this.totalPages = data.totalPages as number;
    this.totalElements = data.totalElements as number;
  }

  /**
   * 起始编号
   */
  beginIndex(): number {
    return this.size * this.number;
  }

  /**
   * 将由后台获取到的json数据转化为带有功能的json对象
   * @param convertFn 转换函数
   */
  toObject(convertFn: (d: T) => T): Page<T> {
    const content: T[] = [];
    this.content.forEach(v => content.push(convertFn(v)));
    this.content = content;
    return this;
  }
}
