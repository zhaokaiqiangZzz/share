import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNotNullOrUndefined} from '../utils';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  /**
   * pageLinkSize:显示的分页范围大小
   */
  state = {
    totalElements: 0,
    page: 0,
    size: 20,
    pageLinkSize: 7
  };

  /**
   * 本组件抄袭自 yunzhiclub/platform 项目
   * https://github.com/yunzhiclub/platform/blob/master/src/app/share/component/paginator/paginator.component.ts
   */
  @Output()
  changePage: EventEmitter<number> = new EventEmitter();

  @Input()
  set totalElements(value: number) {
    this.state.totalElements = value;
    this.generatePaginator();
  }

  get totalElements(): number {
    return this.state.totalElements;
  }

  @Input()
  set page(value: number) {
    this.state.page = value;
    this.generatePaginator();
  }

  get page(): number {
    return this.state.page;
  }

  @Input()
  set size(value: number) {
    this.state.size = value;
    this.generatePaginator();
  }

  get size(): number {
    return this.state.size;
  }

  @Input()
  set pageLinkSize(value: number) {
    this.state.pageLinkSize = value;
    this.generatePaginator();
  } // 分页下标个数

  get pageLinkSize(): number {
    return this.state.pageLinkSize;
  }

  paginatorRange: number[] = []; // 分页范围

  constructor() {
  }

  ngOnInit(): void {
    this.generatePaginator();
  }

  // 生成分页范围
  generatePaginator(): void {
    this.paginatorRange = [];
    const range = this.getStartAndEnd();
    for (let i = range.start; i <= range.end; i++) {
      this.paginatorRange.push(i);
    }
  }

  // 计算开始和结束的分页下标
  getStartAndEnd(): { start: number, end: number } {
    const totalPage = Math.ceil(this.totalElements / this.size); // 向上取整获取总页数
    const visiblePages = Math.min(totalPage, this.pageLinkSize);  // 计算可显示的页数
    let start = Math.max(0, this.page - Math.floor(visiblePages / 2)); // 从0开始或从中间值开始
    let end = Math.min(totalPage - 1, Math.ceil(start + visiblePages - 1)); // 最大页数或起始页加上可显示的页数
    if (end < 0) {
      end = 0;
    }
    // 保证间隔为可显示页数
    const interval = this.pageLinkSize - (end - start + 1);
    start = Math.max(0, start - interval);

    /** 当前页超过最大页码时取最后一页 */
    if (isNotNullOrUndefined(this.page) && this.page > end) {
      this.changePage.emit(end);
    }
    return {start, end};
  }

  onChange(page: number): void {
    this.page = page;
    this.changePage.emit(page);
  }
}
