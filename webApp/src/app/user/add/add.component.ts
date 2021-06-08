import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/user';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';
import { YzValidator } from '../../../validator/yz-validator';
import { YzAsyncValidators } from '../../../validator/yz-async.validators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', YzValidator.phone, this.yzAsyncValidators.usernameExist())
  });

  constructor(private commonService: CommonService,
              private yzAsyncValidators: YzAsyncValidators,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit(formGroup: FormGroup): void {
    const user = new User({
      name: formGroup.get('name')?.value,
      username: formGroup.get('username')?.value
    });

    this.userService.save(user)
      .subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        });
      });
  }

  onSave(): void {
    this.commonService.success(() => {
      this.commonService.back();
    });
  }
}
