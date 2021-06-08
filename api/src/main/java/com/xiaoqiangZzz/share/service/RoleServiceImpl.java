package com.xiaoqiangZzz.share.service;

import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.repository.RoleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;
  private final MenuService menuService;
  private final AuthorityService authorityService;

  public RoleServiceImpl(RoleRepository roleRepository,
                         MenuService menuService,
                         AuthorityService authorityService) {
    this.roleRepository = roleRepository;
    this.menuService = menuService;
    this.authorityService = authorityService;
  }

  @Override
  public Role initRole(String name, List<Menu> menuList, List<Authority> authorityList) {
    Role role = new Role();
    role.setName(name);
    role.setMenuList(menuList);
    role.setAuthorityList(authorityList);
    return this.roleRepository.save(role);
  }

  @Override
  public Role add(Role role) {
    List<Menu> menuList = new ArrayList<>();
    for (Menu menu: role.getMenuList()) {
      menuList.add(this.menuService.getById(menu.getId()));
    }
    List<Authority> authorityList = new ArrayList<>();
    for (Authority authority: role.getAuthorityList()) {
      authorityList.add(this.authorityService.getById(authority.getId()));
    }
    Role newRole = new Role();
    newRole.setName(role.getName());
    newRole.setMenuList(menuList);
    newRole.setAuthorityList(authorityList);
    return this.roleRepository.save(newRole);
  }

  @Override
  public void delete(Long id) {
    this.roleRepository.deleteById(id);
  }

  @Override
  public Role getById(Long id) {
    return this.roleRepository.findById(id).orElseThrow(() ->
        new ObjectNotFoundException("role未找到：" + id.toString()));
  }

  @Override
  public List<Role> getAll() {
    return this.roleRepository.findAll();
  }

  @Override
  public Page<Role> page(String name, Pageable pageable) {
    return this.roleRepository.findAllByNameContaining(name, pageable);
  }

  @Override
  public Role update(Long id, Role role) {
    Role oldRole = this.getById(id);
    List<Menu> menuList = new ArrayList<>();
    for (Menu menu: role.getMenuList()) {
      menuList.add(this.menuService.getById(menu.getId()));
    }
    List<Authority> authorityList = new ArrayList<>();
    for (Authority authority: role.getAuthorityList()) {
      authorityList.add(this.authorityService.getById(authority.getId()));
    }
    oldRole.setName(role.getName());
    oldRole.setMenuList(menuList);
    oldRole.setAuthorityList(authorityList);
    return this.roleRepository.save(oldRole);
  }
}
