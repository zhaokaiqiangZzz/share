package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.repository.RoleRepository;
import com.xiaoqiangZzz.share.repository.UserRepository;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.xml.bind.ValidationException;
import java.sql.Timestamp;
import java.util.*;

@Service
public class UserServiceImpl implements UserService, UserDetailsService, AuditorAware<User> {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final HashMap<String, ExpiredUser> hashMap = new HashMap<>();

  private final UserRepository userRepository;

  private final RoleRepository roleRepository;

  private final RoleService roleService;

  public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, RoleService roleService) {
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
    this.roleService = roleService;
  }

  @Override
  public Optional<User> getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (null == authentication) {
      return Optional.empty();
    } else {
      try {
        UserDetail userDetail = (UserDetail) authentication.getPrincipal();
        return Optional.of(userDetail.getUser());
      } catch (Exception e) {
        this.logger.error("???????????????????????????????????????,??????loadUserByUsername?????????UserDetail");
        throw e;
      }
    }
  }

  @Override
  public void bindAuthTokenLoginUsername(String xAuthToken, org.springframework.security.core.userdetails.User user, boolean auth) {
    this.hashMap.put(xAuthToken, new ExpiredUser(user, auth));
  }

  @Override
  public boolean isAuth(String authToken) {
    if (this.hashMap.containsKey(authToken)) {
      ExpiredUser expiredUser = this.hashMap.get(authToken);
      if (expiredUser.isExpired()) {
        hashMap.remove(authToken);
      } else {
        return expiredUser.isAuth();
      }
    }

    return false;
  }

  @Override
  public Optional<org.springframework.security.core.userdetails.User> getUserByToken(String authToken) {
    if (this.hashMap.containsKey(authToken)) {
      ExpiredUser expiredUser = this.hashMap.get(authToken);
      if (expiredUser.isExpired()) {
        hashMap.remove(authToken);
      } else {
        expiredUser.resetExpiredTime();
        if (null != expiredUser.getUser()) {
          return Optional.of(expiredUser.getUser());
        }
      }
    }

    // 1/10???????????????????????????
    if (new Random().nextInt() % 10 == 0) {
      this.hashMap.forEach((key, value) -> {
        if (value.isExpired()) {
          this.hashMap.remove(key);
        }
      });
    }

    return Optional.empty();
  }

  @Override
  public void logout(String token) {
    SecurityContextHolder.clearContext();
    if (this.hashMap.containsKey(token)) {
      this.hashMap.replace(token, new ExpiredUser(null, false));
    }
  }

  @Override
  public User getByUsername(String username) {
    return this.userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("?????????????????????"));
  }

  @Override
  public boolean checkPasswordIsRight(String password) {
    User currentLoginUser = this.getCurrentAuditor().get();
    return currentLoginUser.verifyPassword(password);
  }

  @Override
  public void updatePassword(String password, String newPassword) throws ValidationException {
    if (!this.checkPasswordIsRight(password)) {
      throw new ValidationException("??????????????????");
    }
    User currentUser = this.getCurrentAuditor().get();
    currentUser.setPassword(newPassword);
    this.userRepository.save(currentUser);
  }

  @Override
  public Page<User> page(String name, Pageable pageable) {
    return userRepository.findAllByNameContaining(name, pageable);
  }

  @Override
  public User add(User user) {
    Role role = this.roleService.getById(user.getRole().getId());
    user.setRole(role);
    return this.userRepository.save(user);
  }

  @Override
  public User update(Long id, User user) {
    User oldUser = this.getById(id);
    oldUser.setUsername(user.getUsername());
    Role role = this.roleService.getById(user.getRole().getId());
    oldUser.setRole(role);
    oldUser.setName(user.getName());
    return this.userRepository.save(oldUser);
  }

  @Override
  public void delete(Long id) {
    this.userRepository.deleteById(id);
  }

  @Override
  public void register(User newUser) {
    Role role = this.roleRepository.findByName("????????????");
    newUser.setRole(role);
    this.userRepository.save(newUser);
  }

  @Override
  public void resetPassword(Long id) {
    User user = this.getById(id);
    user.setPassword(User.DEFAULT_PASSWORD);
    this.userRepository.save(user);
  }

  @Override
  public User getById(Long id) {
    return this.userRepository.findById(id).orElseThrow(() ->
        new ObjectNotFoundException("user????????????" + id.toString()));
  }

  private boolean existByUsername(String username) {
    return this.userRepository.findByUsername(username) != null;
  }

  /**
   * ???????????????????????????
   *
   * @param username ?????????
   * @return
   * @throws UsernameNotFoundException
   */
  @Override
  public UserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("???????????????"));

    // ??????????????????
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    for (Authority authority: user.getRole().getAuthorityList()) {
      authorities.add(new SimpleGrantedAuthority(authority.getValue()));
    }
    return new UserDetail(user,true, authorities);
  }

  public static class UserDetail extends org.springframework.security.core.userdetails.User {
    private User user;

    public UserDetail(User user,boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
      super(user.getUsername(),
          user.getPassword(),
          true,
          true,
          true,
          accountNonLocked,
          authorities);
      this.user = user;
    }

    public User getUser() {
      return user;
    }
  }

  /**
   * ???????????????????????????????????????
   */
  private class ExpiredUser {
    private final boolean auth;
    /**
     * ?????????????????????
     */
    private final long effectiveDuration = 30 * 60 * 1000;
    /**
     * ????????????
     */
    private Timestamp expiredTime;
    /**
     * ?????????
     */
    private org.springframework.security.core.userdetails.User user;

    public ExpiredUser(org.springframework.security.core.userdetails.User user, boolean auth) {
      this.user = user;
      this.auth = auth;
      this.expiredTime = new Timestamp(System.currentTimeMillis() + effectiveDuration);
    }

    /**
     * ????????????????????????????????????
     */
    public void resetExpiredTime() {
      this.expiredTime.setTime(System.currentTimeMillis() + effectiveDuration);
    }

    /**
     * ??????????????????
     *
     * @return
     */
    public boolean isExpired() {
      return System.currentTimeMillis() - this.expiredTime.getTime() > 0;
    }

    public void setUser(org.springframework.security.core.userdetails.User user) {
      this.user = user;
    }

    /**
     * ?????????
     *
     * @return
     */
    public org.springframework.security.core.userdetails.User getUser() {
      return user;
    }

    public boolean isAuth() {
      return auth;
    }
  }
}
