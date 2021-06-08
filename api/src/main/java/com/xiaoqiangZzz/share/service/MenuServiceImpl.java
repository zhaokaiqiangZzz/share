package com.xiaoqiangZzz.share.service;

import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

  @Override
  public List<Menu> getAll() {
    return this.menuRepository.findAll();
  }

  @Override
  public Menu getById(Long id) {
    return this.menuRepository.findById(id).orElseThrow(() ->
        new ObjectNotFoundException("role未找到：" + id.toString()));
  }
}
