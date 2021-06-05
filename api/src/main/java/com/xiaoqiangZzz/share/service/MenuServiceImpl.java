package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.repository.MenuRepository;
import org.springframework.stereotype.Service;

@Service
public class MenuServiceImpl implements MenuService {
  private final MenuRepository menuRepository;

  public MenuServiceImpl(MenuRepository menuRepository) {
    this.menuRepository = menuRepository;
  }

  public Menu initMenu(String name, String router) {
    Menu menu = new Menu();
    menu.setName(name);
    menu.setRouter(router);
    return this.menuRepository.save(menu);
  }
}
