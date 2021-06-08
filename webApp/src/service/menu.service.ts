import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { UserService } from './user.service';
import { Menu } from '../entity/menu';
import { User } from '../entity/user';
import { Role } from '../entity/role';
import { map } from 'rxjs/operators';
import { Page } from '../common/page';

/**
 * 菜单
 * @Author poshichao
 */
@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private baseUrl = 'menu';

    private currentMenuList: Array<Menu>;      // 这里存储所有的菜单
    private currentMenu = new ReplaySubject<Array<Menu>>(1);

    constructor(private http: HttpClient,
                private userService: UserService) {
        this.initMenusOfCurrentUser();
    }

    /**
     * 获取所有菜单
     * @Author poshichao
     */
    getAll(): Observable<Array<Menu>> {
        return this.http.get<Array<Menu>>(this.baseUrl + '/getAll')
          .pipe(map(menus => menus.map(menu => new Menu(menu))));
    }

    /**
     * 设置当前菜单列表
     * @Author poshichao
     */
    private initMenusOfCurrentUser(): void {
        this.userService.getCurrentLoginUser$().subscribe((user: User) => {
            this.currentMenuList = user.role.menuList;
            this.currentMenu.next(this.currentMenuList);
        });
    }

    /**
     * 获取当前登录用户的菜单列表
     * @Author poshichao
     */
    getMenusOfCurrentUser(): Observable<Array<Menu>> {
        return this.currentMenu.asObservable();
    }
}
