package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.entity.Role;

import java.util.List;

public interface RoleService {
  Role initRole(String name, List<Menu> menuList, List<Authority> authorityList);
}
