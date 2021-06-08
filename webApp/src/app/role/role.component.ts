import { Component, OnInit } from '@angular/core';
import { Page } from '../../common/page';
import { Role } from '../../entity/role';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { RoleService } from '../../service/role.service';
import { Assert, stringToIntegerNumber } from '../../common/utils';
import { config } from '../../conf/app.config';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  pageData = {} as Page<Role>;

  keys = {
    page: 'page',
    size: 'size',
    name: 'name'
  };


  queryForm = new FormGroup({});

  showImportComponent = false;

  private params: Params;

  constructor(private commonService: CommonService,
              private roleService: RoleService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryForm.addControl(this.keys.name, new FormControl());
    this.route.params.subscribe(params => {
      this.params = params;
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      this.roleService.page(
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
   * @param object 角色
   */
  onDelete(object: Role): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.roleService.delete(object.id!)
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
  setData(data: Page<Role>): void {
    this.validateData(data);
    this.pageData = data;
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<Role>): void {
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

}
