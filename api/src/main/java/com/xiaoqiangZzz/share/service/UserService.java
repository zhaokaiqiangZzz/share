package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.vo.BindingUser;
import com.xiaoqiangZzz.share.vo.PasswordUser;
import com.xiaoqiangZzz.share.vo.StatusUser;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Optional;

public interface UserService {

  /**
   * 获取当前登录用户
   *
   * @return user
   */
  Optional<User> getCurrentAuditor();

  /**
   * 将token与用户名绑定
   *
   * @param xAuthToken token
   * @param auth       是否是认证用户
   * @param user       用户
   */
  void bindAuthTokenLoginUsername(String xAuthToken, org.springframework.security.core.userdetails.User user, boolean auth);

  /**
   * 是否为认证token
   *
   * @param authToken 认证token
   * @return boolean
   */
  boolean isAuth(String authToken);

  /**
   * 根据token获取用户名
   *
   * @param authToken token
   * @return user
   */
  Optional<org.springframework.security.core.userdetails.User> getUserByToken(String authToken);

  /**
   * 注销
   *
   * @param token 令牌
   */
  void logout(String token);

  User getByUsername(String username);

  /**
   * 检验密码是否正确.
   *
   * @param password 密码
   * @return boolean
   */
  boolean checkPasswordIsRight(String password);

  /**
   * 重置密码.
   *
   * @param id id
   */
  void resetPassword(Long id);

  /**
   * 通过id查找user.
   *
   * @param id id
   * @return user
   */
  User getById(Long id);

  /**
   * 修改密码.
   *
   * @param password    密码
   * @param newPassword 新密码
   */
  void updatePassword(String password, String newPassword) throws ValidationException;

  Page<User> page(String name, Pageable pageable);

  User add(User user);

  User update(Long id, User user);

  void delete(Long id);
}
