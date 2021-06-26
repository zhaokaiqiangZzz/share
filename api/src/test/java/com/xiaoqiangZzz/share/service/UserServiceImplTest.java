package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.repository.RoleRepository;
import com.xiaoqiangZzz.share.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


class UserServiceImplTest {

  private UserRepository userRepository;
  private RoleServiceImpl roleService;
  private RoleRepository roleRepository;
  UserServiceImpl userService;

  public UserServiceImplTest() {
    this.userRepository = Mockito.mock(UserRepository.class);
    this.roleService = Mockito.mock(RoleServiceImpl.class);
    this.roleRepository = Mockito.mock(RoleRepository.class);
    this.userService = Mockito.spy(new UserServiceImpl(
        this.userRepository, roleRepository, this.roleService));
  }

  @Test
  void page() {
    String name = RandomString.make();
    Pageable pageable = PageRequest.of(0, 2);
    Page<User> userPage = new PageImpl<User>(new ArrayList<>());

    Mockito.when(this.userRepository.findAllByNameContaining(name, pageable)).thenReturn(userPage);

    this.userService.page(name, pageable);

    Mockito.verify(this.userRepository).findAllByNameContaining(name, pageable);
  }

  @Test
  void add() {
    // 准备数据
    User user = new User();
    user.setName(RandomString.make());
    user.setDeleted(true);
    Role role = new Role();
    role.setId(new Random().nextLong());
    user.setRole(role);

    ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
    Mockito.doReturn(role).when(this.roleService).getById(role.getId());
    this.userService.add(user);

    Mockito.verify(this.userRepository).save(userArgumentCaptor.capture());
    assertThat(userArgumentCaptor.getValue().getName()).isEqualTo(user.getName());
  }

  @Test
  void update() {
    Long id = new Random().nextLong();
    User oldUser = new User();
    oldUser.setId(id);
    User user = new User();
    Role role = new Role();
    role.setId(new Random().nextLong());
    user.setRole(role);
    Mockito.doReturn(role).when(this.roleService).getById(role.getId());
    Mockito.doReturn(oldUser).when(this.userService).getById(oldUser.getId());
    this.userService.update(oldUser.getId(), user);
    Mockito.verify(this.userService).update(oldUser.getId(), user);
    Mockito.verify(this.userRepository).save(oldUser);
  }

  @Test
  void delete() {
    Long id = new Random().nextLong();
    User user = new User();

    UserService userServiceSpy = Mockito.spy(this.userService);
    Mockito.doReturn(user).when(userServiceSpy).getById(id);
    Mockito.doNothing().when(this.userRepository).deleteById(id);

    userServiceSpy.delete(id);
    Mockito.verify(this.userRepository).deleteById(id);
  }

  @Test
  void getById() {
    Long id = new Random().nextLong();
    User user = new User();
    // 断言成功获取
    Mockito.doReturn(Optional.of(user)).when(this.userRepository).findById(id);

    Assertions.assertThat(this.userService.getById(id)).isEqualTo(user);
    Mockito.verify(this.userRepository).findById(id);
  }
}
