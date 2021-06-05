import {Page} from './page';

describe('page', () => {
  it('构造函数->一般', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const page = Page.getPage({
      number: 0,
      size: 3,
      allContent: array
    });
    expect(page.number).toBe(0);
    expect(page.size).toBe(3);
    expect(page.first).toBe(true);
    expect(page.last).toBe(false);
    expect(page.totalPages).toBe(2);
    expect(page.content.length).toBe(3);
  });

  it('构造函数 -> 最后一页少元素', () => {
    const array = [1, 2, 3, 4];
    const page = Page.getPage({
      number: 0,
      size: 3,
      allContent: array
    });
    expect(page.number).toBe(0);
    expect(page.size).toBe(3);
    expect(page.first).toBe(true);
    expect(page.last).toBe(false);
    expect(page.totalPages).toBe(2);
    expect(page.content.length).toBe(3);
  });

  it('就一页', () => {
    const array = [1, 2];
    const page = Page.getPage({
      number: 0,
      size: 3,
      allContent: array
    });
    expect(page.first).toBe(true);
    expect(page.last).toBe(true);
    expect(page.totalPages).toBe(1);
    expect(page.content.length).toBe(2);
  });

  it('最后一页', () => {
    const array = [1, 2, 3, 4, 5];
    const page = Page.getPage({
      number: 1,
      size: 3,
      allContent: array
    });
    expect(page.number).toBe(1);
    expect(page.size).toBe(3);
    expect(page.first).toBe(false);
    expect(page.last).toBe(true);
    expect(page.totalPages).toBe(2);
    expect(page.content.length).toBe(2);
  });

  it('越界', () => {
    const array = [1, 2, 3, 4, 5, 6, 7];
    const page = Page.getPage({
      number: 3,
      size: 3,
      allContent: array
    });
    expect(page.number).toBe(2);
    expect(page.size).toBe(3);
    expect(page.first).toBe(false);
    expect(page.last).toBe(true);
    expect(page.totalPages).toBe(3);
    expect(page.content.length).toBe(1);
  });

  it('filter', () => {
    const array = [1, 2, 3, 4, 5, 6, 7];
    const page = Page.getPage({
      number: 3,
      size: 3,
      allContent: array,
      filter: a => a % 2 === 0
    });

    expect(page.number).toBe(0);
    expect(page.size).toBe(3);
    expect(page.first).toBe(true);
    expect(page.last).toBe(true);
    expect(page.totalPages).toBe(1);
    expect(page.content.length).toBe(3);
  });
});
