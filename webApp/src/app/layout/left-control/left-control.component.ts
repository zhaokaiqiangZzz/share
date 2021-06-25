import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Menu } from '../../../entity/menu';
import { UserService } from '../../../service/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MenuService } from '../../../service/menu.service';

@Component({
  selector: 'app-left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.scss']
})
export class LeftControlComponent implements OnInit {
  menuList: Menu[];      // 菜单

  constructor(private userService: UserService,
              private router: Router,
              private menuService: MenuService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initMenu();
  }

  /**
   * 初始化菜单
   * @Author poshichao
   */
  initMenu(): void {
    this.menuService.initMenusOfCurrentUser();
    this.menuService.getMenusOfCurrentUser()
      .subscribe((menuList: Array<Menu>) => {
        this.menuList = menuList;
        // 初始化菜单获取当前路由 判断选中
        this.resetMenuSelect(this.router.url);
        this.changeDetectorRef.detectChanges();
        // 监听路由变化修改选中
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
          .subscribe((event: NavigationEnd) => {
            this.resetMenuSelect(event.urlAfterRedirects);
          });
      });
  }

  /**
   * @description  根据路由重置菜单的选中状态
   * @param currentUrl 当前路由
   * @author htx
   * @date 下午10:07 19-4-12
   */
  resetMenuSelect(currentUrl: string): void {
    const routers = currentUrl.split('/');
    this.menuList.forEach(menu => {
      menu.selected = (routers.length >= 2 && routers[1] === menu.router);
    });
  }

}
