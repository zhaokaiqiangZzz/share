package com.xiaoqiangZzz.share.repository;

import com.xiaoqiangZzz.share.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * 用户仓库.
 */
public interface UserRepository extends CrudRepository<User, Long>, JpaSpecificationExecutor<User> {
  /**
   * 查询所有user.
   * @return user列表
   */
  List<User> findAll();

  Optional<User> findByUsername(String name);
}
