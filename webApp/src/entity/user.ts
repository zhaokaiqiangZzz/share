import { Role } from './role';

export class User {
  id: number;   // 用户id
  username: string; // 用户名（手机号）
  password: string;  // 密码
  role: Role;

  constructor(data = {} as {
    id?: number,
    password?: string,
    username?: string,
    role?: Role
  }) {
    this.id = data.id;
    this.password = data.password;
    this.username = data.username;
    this.role = data.role;
  }
}
