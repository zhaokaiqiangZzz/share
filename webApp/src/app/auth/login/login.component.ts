import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import { HTTP_STATUS_CODE } from '../../../common/http-code';
import { config } from '../../../conf/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  keys = {
    username: 'username',
    password: 'password'
  };

  // 正在倒计时
  countDowning = false;

  /** 登录表单对象 */
  loginForm: FormGroup = new FormGroup({});

  /** 错误信息 */
  errorInfo: string | undefined;


  constructor(private builder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    /** 创建登录表单 */
    this.loginForm.addControl(this.keys.username, new FormControl('',
      [Validators.minLength(5),
        Validators.required]));
    this.loginForm.addControl(this.keys.password, new FormControl('', Validators.required));
  }

  ngOnInit(): void {

  }

  onLogin(): void {
    this.userService.login({
      username: this.loginForm.get(this.keys.username).value,
      password: this.loginForm.get(this.keys.password).value
    }).subscribe(() => {
        this.userService.initCurrentLoginUser(() => {
          this.router.navigateByUrl('/user').then();
        });
      }, (response) => {
        const errorCode = +response.headers.get(config.ERROR_RESPONSE_CODE_KEY);
        const errorMessage = response.headers.get(config.ERROR_RESPONSE_MESSAGE_KEY);
        console.log(`发生错误：${errorCode}, ${errorMessage}`);
        this.errorInfo = '登录失败，请检查您填写的信息是否正确, 如若检查无误，可能是您的账号被冻结';
      }
    );
  }
}
