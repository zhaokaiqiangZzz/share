import { Menu } from './menu';
import { Authority } from './authority';

export class Role {
  id: number;   // 角色id
  name: string;  // 角色名
  menuList: Array<Menu>;  // 菜单
  authorityList: Array<Authority>; // 所拥有权限

  constructor(data = {} as {
    id?: number,
    name?: string,
    menuList?: Array<Menu>,
    authorityList?: Array<Authority>;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.menuList = data.menuList;
    this.authorityList = data.authorityList;
  }
}
