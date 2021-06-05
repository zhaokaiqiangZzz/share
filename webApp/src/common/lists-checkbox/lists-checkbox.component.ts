import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Assert, randomNumber} from '../utils';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {IdAndName} from '../id-and-name.interface';

/**
 * 将数组以checkbox列表的方式输出，并在改变会发送出新的数组.
 */
@Component({
  selector: 'app-lists-checkbox',
  templateUrl: './lists-checkbox.component.html',
  styleUrls: ['./lists-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => ListsCheckboxComponent)
    }
  ]
})
export class ListsCheckboxComponent implements OnInit, ControlValueAccessor {
  /**
   * 随着ID，用于前台使用id与for相结合，点击for时id点亮.
   */
  id = randomNumber().toString();

  /**
   * 前台循环显示的模型.
   */
  models = new Array<Model>();

  /**
   * 有新值时触发的方法.
   */
  changeFn: (data: IdAndName[]) => void;

  /**
   * 以ID为key，实体为值的hashMap.
   */
  hashMap = {} as Record<number, IdAndName>;

  /**
   * 每个checkbox对应一个FormControl.
   */
  formControls = new Array<FormControl>();

  /**
   * 以FormControl形式的传入值.
   */
  lists: IdAndName[];

  /**
   * 查询的名称.
   */
  nameFormControl = new FormControl('');

  /**
   * 显示在查询框的辅助标题.
   */
  @Input()
  subject: string;

  /**
   * 获取所有数据的函数.
   */
  @Input()
  getFn: () => Observable<Array<IdAndName>>;

  constructor() {
  }

  ngOnInit(): void {
    Assert.isTrue(typeof this.getFn === 'function', '未设置getFn或设置的getFn类型不正确');
    this.getFn()
      .subscribe(data => this.setData(data));
  }

  registerOnChange(fn: (data: IdAndName[]) => void): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(objects: IdAndName[]): void {
    if (Array.isArray(objects)) {
      objects.forEach(object => Assert.isNotNullOrUndefined(object.id, 'id属性未获取到'));
      this.lists = objects;
      this.models.forEach(model => {
        const object = model.object;
        if (objects.map(obj => {
          return obj.id;
        }).indexOf(object.id) === -1) {
          model.formControl.setValue(false, {emitEvent: false});
        } else {
          model.formControl.setValue(true, {emitEvent: false});
        }
      });
    } else {
      this.lists = [];
    }
  }

  setData(lists: Array<IdAndName>): void {
    Assert.isArray(lists, '类型不是数组');
    lists.forEach(list => {
      Assert.isNotNullOrUndefined(list.id, list.name, 'id、name属性不存在');
      const formControl = new FormControl();
      formControl.valueChanges.subscribe(checked => {
        if (checked) {
          this.lists.push(list);
        } else {
          const index = this.lists.map(obj => obj.id).indexOf(list.id);
          if (index > -1) {
            this.lists.splice(index, 1);
          }
        }
        if (this.changeFn) {
          this.changeFn([...this.lists]);
        }
      });
      this.models.push(new Model(list, formControl));
    });
  }

}

class Model {
  object: IdAndName;
  formControl: FormControl;

  constructor(object: IdAndName, formControl: FormControl) {
    this.object = object;
    this.formControl = formControl;
  }
}
