package com.xiaoqiangZzz.share.repository;

import com.xiaoqiangZzz.share.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RoleRepository extends CrudRepository<Role, Long>, JpaSpecificationExecutor<Role> {
  List<Role> findAll();

  Page<Role> findAllByNameContaining(String name, Pageable pageable);

  Role findByName(String name);
}
