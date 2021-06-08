import {Component, OnInit} from '@angular/core';
import {User} from '../../../entity/user';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '../../../common/utils';
import {UserService} from '../../../service/user.service';

/**
 * 编辑教师（用户）.
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user = {} as User;

  keys = {
    name: 'name',
    username: 'username',
  };
  formGroup = new FormGroup({});

  constructor(private commonService: CommonService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.keys.name,
      new FormControl('', [Validators.required]));
    this.formGroup.addControl(this.keys.username,
      new FormControl(''));

    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNotNullOrUndefined(id, 'ID类型不正确');
      this.loadById(id);
    });
  }

  loadById(id: number): void {
    this.userService.getById(id)
      .subscribe((user: User) => {
        this.setUser(user);
      }, error => {
        throw new Error(error);
      });
  }

  setUser(user: User): void {
    this.user = user;
    this.formGroup.get(this.keys.name).setValue(user.name);
    this.formGroup.get(this.keys.username).setValue(user.username);
  }

  onSubmit(formGroup: FormGroup): void {
    this.userService.update(this.user.id, {
      name: formGroup.get(this.keys.name).value,
      username: formGroup.get(this.keys.username).value,
    }).subscribe(() => {
      },
      () => {
      },
      () => {
        this.commonService.success(() => {
          this.commonService.back();
        });
      });
  }
}
