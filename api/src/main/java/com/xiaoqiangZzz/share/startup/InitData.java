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
    Menu jobMenu = this.menuService.initMenu("就业招聘", "job");
    Menu postGraduateMenu = this.menuService.initMenu("考研保研", "postGraduate");
    Menu highEntranceMenu = this.menuService.initMenu("高考咨询", "highEntrance");
    Menu competitionMenu = this.menuService.initMenu("竞赛信息", "competitionMenu");
    Menu personalMenu = this.menuService.initMenu("个人中心", "personal");


    Authority userAddAuthority = this.authorityService.initAuthority("用户增加", "USER_ADD", userMenu);
    Authority userReadAuthority = this.authorityService.initAuthority("用户查看", "USER_VIEW", userMenu);
    Authority userEditAuthority = this.authorityService.initAuthority("用户编辑", "USER_EDIT", userMenu);
    Authority userDELETEAuthority = this.authorityService.initAuthority("用户删除", "USER_DELETE", userMenu);

    Authority roleAddAuthority = this.authorityService.initAuthority("角色增加", "ROLE_ADD", roleMenu);
    Authority roleReadAuthority = this.authorityService.initAuthority("角色查看", "ROLE_VIEW", roleMenu);
    Authority roleEditAuthority = this.authorityService.initAuthority("角色编辑", "ROLE_EDIT", roleMenu);
    Authority roleDELETEAuthority = this.authorityService.initAuthority("角色删除", "ROLE_DELETE", roleMenu);

    Authority jobAddAuthority = this.authorityService.initAuthority("就业招聘增加", "JOB_ADD", jobMenu);
    Authority jobReadAuthority = this.authorityService.initAuthority("就业招聘查看", "JOB_VIEW", jobMenu);
    Authority jobEditAuthority = this.authorityService.initAuthority("就业招聘编辑", "JOB_EDIT", jobMenu);
    Authority jobDELETEAuthority = this.authorityService.initAuthority("就业招聘删除", "JOB_DELETE", jobMenu);

    Authority postGraduateAddAuthority = this.authorityService.initAuthority("考研保研增加", "POST_GRADUATE_ADD", postGraduateMenu);
    Authority postGraduateReadAuthority = this.authorityService.initAuthority("考研保研查看", "POST_GRADUATE_VIEW", postGraduateMenu);
    Authority postGraduateEditAuthority = this.authorityService.initAuthority("考研保研编辑", "POST_GRADUATE_EDIT", postGraduateMenu);
    Authority postGraduateDELETEAuthority = this.authorityService.initAuthority("考研保研删除", "POST_GRADUATE_DELETE", postGraduateMenu);

    Authority highEntranceAddAuthority = this.authorityService.initAuthority("高考咨询增加", "HIGH_ENTRANCE_ADD", highEntranceMenu);
    Authority highEntranceReadAuthority = this.authorityService.initAuthority("高考咨询查看", "HIGH_ENTRANCE_VIEW", highEntranceMenu);
    Authority highEntranceEditAuthority = this.authorityService.initAuthority("高考咨询编辑", "HIGH_ENTRANCE_EDIT", highEntranceMenu);
    Authority highEntranceDELETEAuthority = this.authorityService.initAuthority("高考咨询删除", "HIGH_ENTRANCE_DELETE", highEntranceMenu);

    Authority competitionAddAuthority = this.authorityService.initAuthority("竞赛信息增加", "COMPETITION_ADD", competitionMenu);
    Authority competitionReadAuthority = this.authorityService.initAuthority("竞赛信息查看", "COMPETITION_VIEW", competitionMenu);
    Authority competitionEditAuthority = this.authorityService.initAuthority("竞赛信息编辑", "COMPETITION_EDIT", competitionMenu);
    Authority competitionDELETEAuthority = this.authorityService.initAuthority("竞赛信息删除", "COMPETITION_DELETE", competitionMenu);

    List<Menu> adminRoleMenus = new ArrayList<>();
    adminRoleMenus.add(userMenu);
    adminRoleMenus.add(roleMenu);
    adminRoleMenus.add(jobMenu);
    adminRoleMenus.add(postGraduateMenu);
    adminRoleMenus.add(highEntranceMenu);
    adminRoleMenus.add(competitionMenu);
    adminRoleMenus.add(personalMenu);

    List<Authority> adminRoleAuthoritys = new ArrayList<>();
    adminRoleAuthoritys.add(userAddAuthority);
    adminRoleAuthoritys.add(userReadAuthority);
    adminRoleAuthoritys.add(userEditAuthority);
    adminRoleAuthoritys.add(userDELETEAuthority);

    adminRoleAuthoritys.add(roleAddAuthority);
    adminRoleAuthoritys.add(roleReadAuthority);
    adminRoleAuthoritys.add(roleEditAuthority);
    adminRoleAuthoritys.add(roleDELETEAuthority);

    adminRoleAuthoritys.add(jobAddAuthority);
    adminRoleAuthoritys.add(jobReadAuthority);
    adminRoleAuthoritys.add(jobEditAuthority);
    adminRoleAuthoritys.add(jobDELETEAuthority);

    adminRoleAuthoritys.add(postGraduateAddAuthority);
    adminRoleAuthoritys.add(postGraduateReadAuthority);
    adminRoleAuthoritys.add(postGraduateEditAuthority);
    adminRoleAuthoritys.add(postGraduateDELETEAuthority);

    adminRoleAuthoritys.add(highEntranceAddAuthority);
    adminRoleAuthoritys.add(highEntranceReadAuthority);
    adminRoleAuthoritys.add(highEntranceEditAuthority);
    adminRoleAuthoritys.add(highEntranceDELETEAuthority);

    adminRoleAuthoritys.add(competitionAddAuthority);
    adminRoleAuthoritys.add(competitionReadAuthority);
    adminRoleAuthoritys.add(competitionEditAuthority);
    adminRoleAuthoritys.add(competitionDELETEAuthority);
    Role adminRole = this.roleService.initRole("管理员", adminRoleMenus, adminRoleAuthoritys);

    List<Menu> normalRoleMenus = new ArrayList<>();
    normalRoleMenus.add(jobMenu);
    normalRoleMenus.add(postGraduateMenu);
    normalRoleMenus.add(highEntranceMenu);
    normalRoleMenus.add(competitionMenu);
    normalRoleMenus.add(personalMenu);

    List<Authority> normalRoleAuthoritys = new ArrayList<>();
    normalRoleAuthoritys.add(jobAddAuthority);
    normalRoleAuthoritys.add(jobReadAuthority);
    normalRoleAuthoritys.add(jobEditAuthority);
    normalRoleAuthoritys.add(jobDELETEAuthority);

    normalRoleAuthoritys.add(postGraduateAddAuthority);
    normalRoleAuthoritys.add(postGraduateReadAuthority);
    normalRoleAuthoritys.add(postGraduateEditAuthority);
    normalRoleAuthoritys.add(postGraduateDELETEAuthority);

    normalRoleAuthoritys.add(highEntranceAddAuthority);
    normalRoleAuthoritys.add(highEntranceReadAuthority);
    normalRoleAuthoritys.add(highEntranceEditAuthority);
    normalRoleAuthoritys.add(highEntranceDELETEAuthority);

    normalRoleAuthoritys.add(competitionAddAuthority);
    normalRoleAuthoritys.add(competitionReadAuthority);
    normalRoleAuthoritys.add(competitionEditAuthority);
    normalRoleAuthoritys.add(competitionDELETEAuthority);

    Role normalRole = this.roleService.initRole("普通用户", normalRoleMenus, normalRoleAuthoritys);

    User user = new User();
    user.setName("赵凯强");
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
