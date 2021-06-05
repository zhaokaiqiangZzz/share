/**
 *  分页信息
 */
export class Pageable {
  page: number;
  size: number;

  constructor(data = {} as {page: number, size: number}) {
      this.page = data.page;
      this.size = data.size;
  }
}
