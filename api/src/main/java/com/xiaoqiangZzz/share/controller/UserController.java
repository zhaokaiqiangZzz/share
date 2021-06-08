package com.xiaoqiangZzz.share.controller;

import com.xiaoqiangZzz.share.config.MvcSecurityConfig;
import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.repository.UserRepository;
import com.xiaoqiangZzz.share.service.UserService;
import com.xiaoqiangZzz.share.vo.PasswordUser;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.ValidationException;
import java.security.Principal;

@RestController
@RequestMapping("user")
public class UserController {
  private final UserRepository userRepository;
  private final UserService userService;

  public UserController(UserRepository userRepository, UserService userService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  @GetMapping("existByUsername/{username}")
  public boolean existByUsername(@PathVariable String username) {
    try {
      this.userService.getByUsername(username);
      return true;
    } catch (EntityNotFoundException e) {
      return false;
    }
  }

  @RequestMapping("login")
  @JsonView(LoginJsonView.class)
  public User login(Principal user) {
    return this.userRepository.findByUsername(user.getName())
        .orElseThrow(() -> new EntityNotFoundException("未在数据库中找到用户，这可能是当前用户被删除导致的"));
  }

  @GetMapping("currentLoginUser")
  @JsonView(GetCurrentLoginUserJsonView.class)
  public User getCurrentLoginUser() {
    return this.userService.getCurrentAuditor().get();
  }

  @RequestMapping("logout")
  public void logout(HttpServletRequest request) {
    String token = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
    if (null == token) {
      throw new RuntimeException("未获取到token，请检查调用的逻辑性或配置的安全规则是否正常");
    }
    this.userService.logout(token);
  }

  /**
   * 校验密码是否正确接口
   * @param user user
   * @return boolean
   */
  @PostMapping("checkPasswordIsRight")
  public boolean checkPasswordIsRight(@RequestBody PasswordUser user) {
    return this.userService.checkPasswordIsRight(user.getPassword());
  }

  /**
   * 更新密码接口.
   * @param user user
   * @throws ValidationException 验证异常.
   */
  @PutMapping("updatePassword")
  public void updatePassword(@RequestBody PasswordUser user) throws ValidationException {
    this.userService.updatePassword(user.getPassword(), user.getNewPassword());
  }

  /**
   * 重置密码接口.
   * @param id id
   */
  @PatchMapping("resetPassword/{id}")
  public void resetPassword(@PathVariable Long id) {
    this.userService.resetPassword(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  @Secured("USER_VIEW")
  public User getById(@PathVariable Long id) {
    return this.userService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  @Secured("USER_VIEW")
  public Page<User> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable) {
    return this.userService.page(name, pageable);
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  @Secured("USER_ADD")
  public User add(@RequestBody User user) {
    return this.userService.add(user);
  }

  @PutMapping("{id}")
  @Secured("USER_EDIT")
  @JsonView(UpdateJsonView.class)
  public User update(@PathVariable Long id, @RequestBody User user) {
    return this.userService.update(id, user);
  }

  @DeleteMapping("{id}")
  @Secured("USER_DELETE")
  public void delete(@PathVariable Long id) {
    this.userService.delete(id);
  }

  private interface LoginJsonView extends Role.MenuListJsonView, Role.AuthorityListJsonView {
  }

  private interface GetCurrentLoginUserJsonView extends Role.MenuListJsonView, Role.AuthorityListJsonView {
  }

  private interface PageJsonView extends User.RolesJsonView {
  }

  public interface AddJsonView extends User.RolesJsonView {
  }

  public interface UpdateJsonView extends User.RolesJsonView {
  }

  public interface GetByIdJsonView extends User.RolesJsonView {
  }

}
