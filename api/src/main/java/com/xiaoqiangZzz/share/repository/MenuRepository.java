package com.xiaoqiangZzz.share.repository;

import com.xiaoqiangZzz.share.entity.Menu;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MenuRepository extends CrudRepository<Menu, Long>, JpaSpecificationExecutor<Menu> {
  List<Menu> findAll();
}
