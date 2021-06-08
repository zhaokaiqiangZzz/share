import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {
  modifyPasswordForm: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder,
              private commonService: CommonService,
              private userService: UserService,
              private router: Router) {
    // updateOn 作用是在什么时候更新表单数据
    // https://angular.cn/guide/form-validation#note-on-performance
    this.modifyPasswordForm = this.fb.group({
        oldPassword: [null, {
          validators: [Validators.required],
          asyncValidators: [this.userService.oldPasswordValidator()],
          updateOn: 'blur'
        }],
        newPassword: [null, [Validators.required, Validators.minLength(5)]],
        confirmNewPassword: [null, Validators.required]
      }, {validators: this.userService.confirmPasswordValidator},
    );
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.submitting = true;
    this.userService.updatePassword(this.modifyPasswordForm.get('newPassword').value,
                                    this.modifyPasswordForm.get('oldPassword').value)
      .subscribe(() => {
        this.userService.logout()
          .subscribe(() => {
          }, (error) => {
            console.log(error);
          }, () => {
            console.log('修改密码后完成跳转');
            this.commonService.success(() => {
              this.router.navigateByUrl('login').then();
            });
          });
      });
  }
}
