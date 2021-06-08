import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class YzAsyncValidators {

  constructor(private userService: UserService) {
  }

  /**
   * 用户名是否存在
   * @param control 控制器
   */
  usernameExist(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return control => {
      return new Observable<ValidationErrors | null>(subscriber => {
        this.userService.existByUsername(control.value)
          .subscribe(result => {
            result ? subscriber.next({usernameExist: '用户名已存在'}) : subscriber.next(null);
            subscriber.complete();
          });
      });
    };
  }
}
