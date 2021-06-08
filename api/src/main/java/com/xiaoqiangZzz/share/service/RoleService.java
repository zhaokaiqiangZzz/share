package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoleService {
  Role initRole(String name, List<Menu> menuList, List<Authority> authorityList);

  Role add(Role role);

  void delete(Long id);

  Role getById(Long id);

  List<Role> getAll();

  Page<Role> page(String name, Pageable pageable);

  Role update(Long id, Role role);
}
