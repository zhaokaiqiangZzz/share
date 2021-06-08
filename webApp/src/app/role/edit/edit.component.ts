import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Menu } from '../../../entity/menu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { MenuService } from '../../../service/menu.service';
import { YzAsyncValidators } from '../../../validator/yz-async.validators';
import { RoleService } from '../../../service/role.service';
import { Authority } from '../../../entity/authority';
import { Role } from '../../../entity/role';
import { Assert } from '../../../common/utils';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  menusMap: Map<number, boolean>;

  authorityMap: Map<number, boolean>;

  menus: Array<Menu>;

  role: Role;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private commonService: CommonService,
              private menuService: MenuService,
              private yzAsyncValidators: YzAsyncValidators,
              private roleService: RoleService,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.menusMap = new Map<number, boolean>();
    this.authorityMap = new Map<number, boolean>();
    this.menuService.getAll()
      .subscribe((menus: Array<Menu>) => {
        this.menus = menus;
      });
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNotNullOrUndefined(id, 'ID类型不正确');
      this.loadById(id);
    });
  }

  loadById(id: number): void {
    this.roleService.getById(id)
      .subscribe((role: Role) => {
        this.role = role;
        this.formGroup.get('name').setValue(role.name);
        this.role.menuList.forEach((menu: Menu) => {
          menu.checked = true;
          this.menusMap.set(menu.id, true);
        });
        this.role.authorityList.forEach((authority: Authority) => {
          authority.checked = true;
          this.authorityMap.set(authority.id, true);
        });
        this.changeDetectorRef.detectChanges();
      }, error => {
        throw new Error(error);
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

    this.roleService.update(this.role.id, role)
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

  isMenuChecked(id: number): boolean {
    return this.menusMap.get(id);

  }

  isAuthorityChecked(id: number): boolean {
    return this.authorityMap.get(id);
  }
}
