package com.xiaoqiangZzz.share.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

/**
 * 用户实体.
 */
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {}))
@SQLDelete(sql = "update `user` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
@Where(clause = "deleted = false")
public class User extends BaseEntity {

  /**
   * 默认密码
   */
  public static final String DEFAULT_PASSWORD = "hebut";

  private static PasswordEncoder passwordEncoder;

  @JsonView(PasswordJsonView.class)
  private String password;

  @Column(nullable = false)
  private String name = "";

  /**
   * 角色.
   */
  @ManyToOne
  @JoinColumn(nullable = false)
  private Role role;

  @Column(nullable = false)
  private String username;

  private Long deleteAt;

  public static void setPasswordEncoder(PasswordEncoder passwordEncoder) {
    User.passwordEncoder = passwordEncoder;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    if (User.passwordEncoder == null) {
      throw new RuntimeException("未设置User实体的passwordEncoder，请调用set方法设置");
    }
    this.password = User.passwordEncoder.encode(password);
  }

  /**
   * 校验密码.
   *
   * @param password 密码.
   * @return 校验结果.
   */
  public boolean verifyPassword(String password) {
    return User.passwordEncoder.matches(password, this.password);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Long getDeleteAt() {
    return deleteAt;
  }

  public void setDeleteAt(Long deleteAt) {
    this.deleteAt = deleteAt;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public interface PasswordJsonView {
  }

  public interface RolesJsonView {
  }
}
