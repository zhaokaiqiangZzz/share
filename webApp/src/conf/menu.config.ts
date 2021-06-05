import {BaseMenu} from '../common/base-menu';
import {USER_ROLE} from '../entity/enum/user-role';

/**
 * 菜单配置
 */
export const menus: Array<BaseMenu> = [
  {
    name: '首页',
    url: 'dashboard',
    icon: 'fas fa-tachometer-alt',
    defaultShow: true,
    roles: [
      USER_ROLE.teacher.value,
      USER_ROLE.manager.value,
      USER_ROLE.admin.value,
      USER_ROLE.student.value]
  },
  {
    name: '班级管理',
    url: 'clazz',
    icon: 'fas fa-university',
    roles: [USER_ROLE.admin.value]
  },
  {
    name: '教师管理',
    url: 'teacher',
    icon: 'fas fa-users',
    roles: [USER_ROLE.admin.value]
  },
  {
    name: '学生管理',
    url: 'student',
    icon: 'fas fa-user-graduate',
    roles: [USER_ROLE.admin.value]
  },
  {
    name: '任务管理',
    url: 'test',
    icon: 'fas fa-network-wired',
    roles: [USER_ROLE.manager.value]
  },
  {
    name: '作业评阅',
    url: 'review',
    icon: 'fas fa-pen-nib',
    roles: [USER_ROLE.teacher.value]
  },
  {
    name: '我的作业',
    url: 'my-work',
    icon: 'fas fa-book',
    roles: [USER_ROLE.student.value]
  },
  {
    name: '作业浏览',
    url: 'work',
    icon: 'fas fa-eye',
    roles: [USER_ROLE.student.value, USER_ROLE.teacher.value]
  },
  {
    name: '个人中心',
    url: 'teacher-personal',
    icon: 'fas fa-user',
    roles: [USER_ROLE.teacher.value,
      USER_ROLE.manager.value,
      USER_ROLE.admin.value]
  },
  {
    name: '个人中心',
    url: 'student-personal',
    icon: 'fas fa-user',
    roles: [USER_ROLE.student.value]
  }
];
