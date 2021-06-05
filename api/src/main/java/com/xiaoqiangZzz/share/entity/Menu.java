package com.xiaoqiangZzz.share.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Menu extends BaseEntity {
  private String name;
  private String router;

  @OneToMany(mappedBy = "menu")
  @JsonView(AuthorityListJsonView.class)
  private List<Authority> authorityList = new ArrayList<>();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRouter() {
    return router;
  }

  public void setRouter(String router) {
    this.router = router;
  }

  public List<Authority> getAuthorityList() {
    return authorityList;
  }

  public void setAuthorityList(List<Authority> authorityList) {
    this.authorityList = authorityList;
  }

  public interface AuthorityListJsonView {
  }
}
