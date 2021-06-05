import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/user';
import {Subject} from 'rxjs';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /** 注册表单对象 */
  registerForm: FormGroup;

  /** 通过输入的手机号判断身份，如果是学生，设置为学号，如果是老师，设置为工号 */
  numName = '学号';

  @Output()
  beDone = new EventEmitter<void>();

  constructor(private userService: UserService,
              private builder: FormBuilder,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    /** 创建注册表单 */
    this.registerForm = this.builder.group({
      registerUsername: ['', [
        Validators.required]],
      name: ['', [Validators.minLength(1),
        Validators.maxLength(100),
        // Validators.pattern('\\w+'),
        Validators.required]],
      num: ['', [Validators.minLength(4),
        Validators.maxLength(18),
        Validators.pattern('\\w+'),
        Validators.required]],
      verificationCode: ['', Validators.required],
    });
  }

  onRegister(): void {
    this.userService.bind({
      name: this.registerForm.get('name').value,
      username: this.registerForm.get('registerUsername').value,
      num: this.registerForm.get('num').value,
      verificationCode: this.registerForm.get('verificationCode').value
    })
      .subscribe((backUser: User) => {
        this.commonService.success(() => {
          this.beDone.emit();
        }, '您的密码为' + backUser.password + ', 请牢记');
      }, () => {
        this.commonService.error(() => {
        }, '用户绑定失败');
      });
  }

}
