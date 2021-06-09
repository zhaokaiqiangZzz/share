import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Role } from '../../../entity/role';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return RoleSelectComponent;
      })
    }]
})
export class RoleSelectComponent implements OnInit {
  roles = new Array<Role>();

  roleSelect = new FormControl();
  isShowAllRole = false;

  @Input()
  set showAllRole(isShowAllRole: boolean) {
    this.isShowAllRole = isShowAllRole;
  }

  @Output()
  beChange = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取所有的教师，并传给V层
   */
  ngOnInit(): void {
    this.httpClient.get<Array<Role>>('role/getAll')
      .subscribe(roles => {
        this.roles = roles;
      });
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，比如我们当前将弹出一个类型为number的teacherId
   */
  registerOnChange(fn: (data: number) => void): void {
    this.roleSelect.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变换一次，该方法将被重新执行一次
   * 相当于@Input() set xxx
   * @param obj 此类型取决于当前组件的接收类型，比如此时我们接收一个类型为number的teacherId
   */
  writeValue(obj: any): void {
    this.roleSelect.setValue(obj);
  }

  registerOnTouched(fn: any): void {
  }
}
