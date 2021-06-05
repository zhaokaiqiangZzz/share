package com.xiaoqiangZzz.share.startup;

import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.repository.UserRepository;
import com.xiaoqiangZzz.share.service.AuthorityService;
import com.xiaoqiangZzz.share.service.MenuService;
import com.xiaoqiangZzz.share.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 系统数据初始化.
 */
@Component
public class InitData implements ApplicationListener<ContextRefreshedEvent>, Ordered {
  public final static int order = 0;
  private final MenuService menuService;
  private final AuthorityService authorityService;
  private final RoleService roleService;
  private final UserRepository userRepository;

  private static final Logger logger = LoggerFactory.getLogger(InitData.class);

  public InitData(MenuService menuService,
                  AuthorityService authorityService,
                  RoleService roleService, UserRepository userRepository) {
    this.menuService = menuService;
    this.authorityService = authorityService;
    this.roleService = roleService;
    this.userRepository = userRepository;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent event) {
    logger.debug("查询已有用户");
    List<User> users = this.userRepository.findAll();

    if (!users.isEmpty()) {
      logger.debug("用户存在，return");
      return;
    }

    // 数据库初始化
    Menu userMenu = this.menuService.initMenu("用户管理", "user");
    Menu roleMenu = this.menuService.initMenu("角色管理", "role");

    Authority userAddAuthority = this.authorityService.initAuthority("用户增加", "USER_ADD", userMenu);
    Authority userReadAuthority = this.authorityService.initAuthority("用户查看", "USER_VIEW", userMenu);
    Authority userEditAuthority = this.authorityService.initAuthority("用户编辑", "USER_EDIT", userMenu);
    Authority userDELETEAuthority = this.authorityService.initAuthority("用户删除", "USER_DELETE", userMenu);
    Authority roleAddAuthority = this.authorityService.initAuthority("角色增加", "ROLE_ADD", roleMenu);
    Authority roleReadAuthority = this.authorityService.initAuthority("角色查看", "ROLE_VIEW", roleMenu);
    Authority roleEditAuthority = this.authorityService.initAuthority("角色编辑", "ROLE_EDIT", roleMenu);
    Authority roleDELETEAuthority = this.authorityService.initAuthority("角色删除", "ROLE_DELETE", roleMenu);

    List<Menu> adminRoleMenus = new ArrayList<>();
    adminRoleMenus.add(userMenu);
    adminRoleMenus.add(roleMenu);
    List<Authority> adminRoleAuthoritys = new ArrayList<>();
    adminRoleAuthoritys.add(userAddAuthority);
    adminRoleAuthoritys.add(userReadAuthority);
    adminRoleAuthoritys.add(userEditAuthority);
    adminRoleAuthoritys.add(userDELETEAuthority);
    adminRoleAuthoritys.add(roleAddAuthority);
    adminRoleAuthoritys.add(roleReadAuthority);
    adminRoleAuthoritys.add(roleEditAuthority);
    adminRoleAuthoritys.add(roleDELETEAuthority);
    Role adminRole = this.roleService.initRole("管理员", adminRoleMenus, adminRoleAuthoritys);
    User user = new User();
    user.setUsername("13900000000");
    user.setPassword("admin");
    user.setRole(adminRole);
    this.userRepository.save(user);
  }

  @Override
  public int getOrder() {
    return order;
  }
}
