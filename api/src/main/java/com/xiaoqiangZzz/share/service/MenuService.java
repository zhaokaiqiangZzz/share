package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Menu;

public interface MenuService {
  /**
   * 初始化一个菜单
   * @param name
   * @param router
   * @return
   */
  Menu initMenu(String name, String router);
}
