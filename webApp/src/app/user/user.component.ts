import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Page} from '../../common/page';
import {User} from '../../entity/user';
import {Assert, stringToIntegerNumber} from '../../common/utils';
import {CommonService} from '../../service/common.service';
import {UserService} from '../../service/user.service';
import {config} from '../../conf/app.config';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pageData = {} as Page<User>;

  keys = {
    page: 'page',
    size: 'size',
    name: 'name'
  };


  queryForm = new FormGroup({});

  showImportComponent = false;

  private params: Params;

  constructor(private commonService: CommonService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryForm.addControl(this.keys.name, new FormControl());
    this.route.params.subscribe(params => {
      this.params = params;
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      this.userService.page(
        stringToIntegerNumber(params[this.keys.page], 0),
        stringToIntegerNumber(params[this.keys.size], config.size),
        params[this.keys.name]
      ).subscribe(data => {
        this.setData(data);
      });

    });
  }

  /**
   * 删除
   * @param object 老师
   */
  onDelete(object: User): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.userService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
      }
    }, '');
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    this.commonService.reloadByParam(params).then();
  }

  /**
   * 设置数据
   * @param data 分页数据
   */
  setData(data: Page<User>): void {
    this.validateData(data);
    this.pageData = data;
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<User>): void {
    Assert.isNotNullOrUndefined(data.number, data.size, data.totalElements, '未满足page组件的初始化条件');
    this.pageData = data;
  }


  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  /**
   * 取消导入
   */
  onImportCancel(): void {
    this.showImportComponent = false;
  }

  /**
   * 导入完成
   */
  onImported(): void {
    this.showImportComponent = false;
    this.commonService.success(() => {
      setTimeout(() => this.commonService.reloadByParam(this.params, {forceReload: true}).then(),
        3000);
    }, '', '上传成功');
  }

  /**
   * 重置密码
   */
  onResetPassword(id: number): void {
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        this.userService.resetPassword(id)
          .subscribe(() => {
            this.commonService.success(() => {
            }, '', '操作成功，密码:' + environment.defaultPassword);
          });
      }
    }, '');
  }
}
