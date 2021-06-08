package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.entity.Role;

import java.util.List;

public interface MenuService {
  /**
   * 初始化一个菜单
   * @param name
   * @param router
   * @return
   */
  Menu initMenu(String name, String router);

  List<Menu> getAll();

  Menu getById(Long id);
}
