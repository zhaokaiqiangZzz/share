package com.xiaoqiangZzz.share.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Role extends BaseEntity {
  private String name;

  @ManyToMany(fetch = FetchType.EAGER)
  @Fetch(FetchMode.SUBSELECT)
  @JsonView(MenuListJsonView.class)
  private List<Menu> menuList = new ArrayList<>();

  @ManyToMany(fetch = FetchType.EAGER)
  @Fetch(FetchMode.SUBSELECT)
  @JsonView(MenuListJsonView.class)
  private List<Authority> authorityList = new ArrayList<>();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Menu> getMenuList() {
    return menuList;
  }

  public void setMenuList(List<Menu> menuList) {
    this.menuList = menuList;
  }

  public List<Authority> getAuthorityList() {
    return authorityList;
  }

  public void setAuthorityList(List<Authority> authorityList) {
    this.authorityList = authorityList;
  }

  public interface MenuListJsonView {
  }

  public interface AuthorityListJsonView {
  }
}
