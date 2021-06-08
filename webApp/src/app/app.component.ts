import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  loading: boolean;
  showLoading: boolean;
  /* showLoading计时器 */
  showLoadingTimer: any;

  constructor(private commonService: CommonService,
              private userService: UserService,
              private router: Router) {
    this.commonService.loading$.subscribe(loading => {
      this.setLoading(loading);
    });
  }

  ngOnInit(): void {
    const appOnReadyItem = this.commonService.getAppOnReadyItem();
    if (this.router && this.router.url && !this.router.url.includes('login')) {
      this.userService.initCurrentLoginUser(() => {
        appOnReadyItem.ready = true;
      });
    } else {
      appOnReadyItem.ready = true;
    }
  }

  setLoading(loading: boolean): void {
    if (loading) {
      if (!this.loading) {
        this.loading = true;
        this.showLoadingTimer = setTimeout(() => this.showLoading = true, 500);
      }
    } else {
      this.loading = this.showLoading = false;
      if (this.showLoadingTimer !== null && this.showLoadingTimer !== undefined) {
        clearTimeout(this.showLoadingTimer);
        this.showLoadingTimer = null;
      }
    }
  }
}
