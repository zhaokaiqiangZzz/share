import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../entity/post';
import { Page } from '../common/page';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostGraduateService {

  private baseUrl = 'post';

  constructor(private httpClient: HttpClient) {
  }

  getById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`);
  }

  /**
   * 保存帖子
   * @param post 帖子
   */
  save(post: Post): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl, post);
  }

  /**
   * 更新帖子
   * @param id    帖子id
   * @param post  更新实体
   */
  update(id: number, post: Post): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${id}`, post);
  }

  /**
   * 删除帖子
   * @param id    帖子id
   */
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param name name
   */
  public page(page: number, size: number, name?: string): Observable<Page<Post>> {
    const params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());

    return this.httpClient.get<Page<Post>>(`${this.baseUrl}/page`, {params})
      .pipe(map((data) => new Page<Post>(data).toObject((o) => new Post(o))));
  }
}
