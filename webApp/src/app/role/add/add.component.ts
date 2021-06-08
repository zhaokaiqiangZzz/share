import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { YzAsyncValidators } from '../../../validator/yz-async.validators';
import { RoleService } from '../../../service/role.service';
import { Role } from '../../../entity/role';
import { Menu } from '../../../entity/menu';
import { MenuService } from '../../../service/menu.service';
import { Authority } from '../../../entity/authority';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  menusMap: Map<number, boolean>;

  authorityMap: Map<number, boolean>;

  menus: Array<Menu>;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private commonService: CommonService,
              private menuService: MenuService,
              private yzAsyncValidators: YzAsyncValidators,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.menusMap = new Map<number, boolean>();
    this.authorityMap = new Map<number, boolean>();
    this.menuService.getAll()
      .subscribe((menus: Array<Menu>) => {
        this.menus = menus;
      });
  }

  onSubmit(formGroup: FormGroup): void {
    const menuList: Array<Menu> = new Array<Menu>();
    this.menusMap.forEach((value, key) => {
      menuList.push({
        id: key,
      } as Menu);
    });

    const authorityList: Array<Authority> = new Array<Authority>();
    this.authorityMap.forEach((value, key) => {
      authorityList.push({
        id: key,
      } as Authority);
    });
    const role = new Role({
      name: formGroup.get('name')?.value,
      menuList,
      authorityList
    });

    this.roleService.save(role)
      .subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        });
      });
  }

  public onMenuChange(menuId: number): void {
    if (this.menusMap.get(menuId)) {
      /** 如果已选中，则删除 */
      this.menusMap.delete(menuId);
    } else {
      /** 如果未选中，设置选中 */
      this.menusMap.set(menuId, true);
    }
  }

  public onAuthorityChange(authorityId: number): void {
    if (this.authorityMap.get(authorityId)) {
      /** 如果已选中，则删除 */
      this.authorityMap.delete(authorityId);
    } else {
      /** 如果未选中，设置选中 */
      this.authorityMap.set(authorityId, true);
    }
  }

}
