package com.xiaoqiangZzz.share.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.xiaoqiangZzz.share.entity.Role;
import com.xiaoqiangZzz.share.service.RoleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("role")
public class RoleController {
  private final RoleService roleService;

  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  public Role add(@RequestBody Role role) {
    return this.roleService.add(role);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.roleService.delete(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Role getById(@PathVariable Long id) {
    return this.roleService.getById(id);
  }

  @GetMapping("getAll")
  @JsonView(GetAllJsonView.class)
  public List<Role> getAll() {
    return this.roleService.getAll();
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Role> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable) {
    return this.roleService.page(name, pageable);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Role update(@PathVariable Long id, @RequestBody Role role) {
    return this.roleService.update(id, role);
  }

  private interface PageJsonView extends Role.MenuListJsonView, Role.AuthorityListJsonView {
  }

  public interface AddJsonView extends Role.MenuListJsonView, Role.AuthorityListJsonView {
  }

  public interface UpdateJsonView extends Role.MenuListJsonView, Role.AuthorityListJsonView {
  }

  public interface GetByIdJsonView extends Role.MenuListJsonView, Role.AuthorityListJsonView {
  }

  public interface GetAllJsonView extends Role.MenuListJsonView, Role.AuthorityListJsonView {
  }
}
