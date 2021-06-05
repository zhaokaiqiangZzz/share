package com.xiaoqiangZzz.share.repository;

import com.xiaoqiangZzz.share.entity.Authority;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface AuthorityRepository extends CrudRepository<Authority, Long>, JpaSpecificationExecutor<Authority> {
}
