package com.xiaoqiangZzz.share.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Authority extends BaseEntity {
  private String name;
  private String value;

  @ManyToOne
  @JsonView(MenuJsonView.class)
  private Menu menu;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public Menu getMenu() {
    return menu;
  }

  public void setMenu(Menu menu) {
    this.menu = menu;
  }

  public interface MenuJsonView {
  }
}
