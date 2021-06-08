import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../entity/role';
import { Menu } from '../entity/menu';
import { Page } from '../common/page';
import { isNotNullOrUndefined } from '../common/utils';
import { map } from 'rxjs/operators';

/**
 * 角色
 * @Author poshichao
 */
@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private baseUrl = 'role';

    constructor(private httpClient: HttpClient) {
    }

    /**
     * 获取所有角色
     */
    getAll(): Observable<Array<Role>> {
        return this.httpClient.get<Array<Role>>(this.baseUrl + '/getAll');
    }

    getById(id: number): Observable<Role> {
        return this.httpClient.get<Role>(`${this.baseUrl}/${id}`);
    }

    /**
     * 保存角色
     * @param role 角色
     */
    save(role: Role): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl, role);
    }

    /**
     * 更新角色
     * @param id    角色id
     * @param role  更新实体
     */
    update(id: number, role: Role): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${id}`, role);
    }

    /**
     * 删除角色
     * @param id    角色id
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
  public page(page: number, size: number, name?: string): Observable<Page<Role>> {
    const params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(name) ? name.toString() : '');

    return this.httpClient.get<Page<Role>>(`${this.baseUrl}/page`, {params})
      .pipe(map((data) => new Page<Role>(data).toObject((o) => new Role(o))));
  }
}
