import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    /**
     * complete 时跳转
     */
    this.userService.logout()
      .subscribe(() => {
        }, (error) => {
          console.error('error', error);
        },
        () => {
          this.router.navigateByUrl('login').then();
        }
      );
  }
}
