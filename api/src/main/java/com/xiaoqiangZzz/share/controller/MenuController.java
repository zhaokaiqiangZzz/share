package com.xiaoqiangZzz.share.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.service.MenuService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("menu")
public class MenuController {
  private final MenuService menuService;

  public MenuController(MenuService menuService) {
    this.menuService = menuService;
  }

  @GetMapping("getAll")
  @JsonView(GetAllJsonView.class)
  public List<Menu> getAll() {
    return this.menuService.getAll();
  }

  private interface GetAllJsonView extends Menu.AuthorityListJsonView {
  }
}
