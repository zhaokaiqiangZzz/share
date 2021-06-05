package com.xiaoqiangZzz.share.repository;

import com.xiaoqiangZzz.share.entity.Role;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long>, JpaSpecificationExecutor<Role> {
}
