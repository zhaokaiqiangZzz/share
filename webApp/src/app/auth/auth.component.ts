import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  /** 当前模式 */
  mode = 'login';

  showUpdateBowerTips: boolean | undefined;

  year = new Date().getFullYear();

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    // this.checkBrowsers();
  }

  onChangeToLogin(): void {
    this.mode = 'login';
  }

  onChangeToRegister(): void {
    this.mode = 'register';
  }

  /**
   * 判断是不是需要升级的浏览器
   */
  checkBrowsers(): void {
    const ua = navigator.userAgent.toLowerCase();
    // 如果是IE或者windows版safari，跳转页面
    if (ua.match(/(trident)\/([\d.]+)/) || ua.match(/version\/([\d.]+).*safari/) || ua.match(/msie ([\d.]+)/)) {
      this.showUpdateBowerTips = true;
    }
  }

  onRegisterDone(): void {
    this.mode = 'login';
  }

  onShowYz(): void {
    this.commonService.info(() => {}, '业务联系电话(微信同号)：13920618851', 'YAHAHA');
  }

}
