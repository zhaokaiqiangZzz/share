/**
 * 前台菜单实体
 */
import { UserRole } from '../entity/enum/user-role';

export class BaseMenu {
  /** 名称 */
  name: string | undefined;

  /** 路由 */
  url: string | undefined;

  /** 图标 */
  icon: string | undefined;

  /** 默认显示: 可选 无论是否有权限都显示 */
  defaultShow?: boolean;

  roles = new Array<UserRole>();
}
