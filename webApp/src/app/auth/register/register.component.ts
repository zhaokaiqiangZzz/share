import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/user';
import {Subject} from 'rxjs';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {Router} from "@angular/router";
import {config} from "../../../conf/app.config";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  keys = {
    username: 'username',
    password: 'password',
    name: 'name',
  };

  // 正在倒计时
  countDowning = false;

  /** 登录表单对象 */
  registerForm: FormGroup = new FormGroup({});

  /** 错误信息 */
  errorInfo: string | undefined;


  constructor(private builder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private commonService: CommonService) {
    /** 创建登录表单 */
    this.registerForm.addControl(this.keys.username, new FormControl('',
      [Validators.minLength(5),
        Validators.required]));
    this.registerForm.addControl(this.keys.password, new FormControl('', Validators.required));
    this.registerForm.addControl(this.keys.name, new FormControl('', Validators.minLength(2)));
  }

  ngOnInit(): void {
    console.log("初始化执行register");
  }

  onRegister() {
    // console.log(this.registerForm.get(this.keys.username).value);
    // console.log(this.registerForm.get(this.keys.password).value);
    // console.log(this.registerForm.get(this.keys.name).value);
    this.userService.register({
      username: this.registerForm.get(this.keys.username).value,
      password: this.registerForm.get(this.keys.password).value,
      name: this.registerForm.get(this.keys.name).value,
    })
      .subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back()
        });
      });
  }
}
