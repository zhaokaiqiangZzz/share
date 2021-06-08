import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../entity/user';
import {Assert} from '../../common/utils';

@Component({
  selector: 'app-teacher-personal',
  templateUrl: './teacher-personal.component.html',
  styleUrls: ['./teacher-personal.component.scss']
})
export class TeacherPersonalComponent implements OnInit {

  user = new User();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentLoginUser$()
      .subscribe((data) => {
        this.setUser(data);
      });
  }

  /**
   * 设置user内容
   */
  setUser(data: User): void {
    Assert.isDefined(data, data.name, '请保证name为字符串');
    Assert.isString(data.username, '请保证username字符串');

    this.user = data;
  }

}
