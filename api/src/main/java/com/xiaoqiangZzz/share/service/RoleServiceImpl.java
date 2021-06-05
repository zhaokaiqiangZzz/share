package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;

  public RoleServiceImpl(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  public Role initRole(String name, List<Menu> menuList, List<Authority> authorityList) {
    Role role = new Role();
    role.setName(name);
    role.setMenuList(menuList);
    role.setAuthorityList(authorityList);
    return this.roleRepository.save(role);
  }
}
