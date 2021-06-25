import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../../entity/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentLoginUser: User;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCurrentLoginUser();
  }

  /**
   * 用户注销
   */
  onLogout(): void {
    this.userService.logout()
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      }, () => {
        console.log('network error');
      });
  }

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser(): void {
    this.userService.getCurrentLoginUser$().subscribe((user: User) => {
      this.currentLoginUser = user;
    });
  }
}
