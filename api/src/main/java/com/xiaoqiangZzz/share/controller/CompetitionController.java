package com.xiaoqiangZzz.share.controller;

import com.xiaoqiangZzz.share.entity.Post;
import com.xiaoqiangZzz.share.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("competition")
public class CompetitionController {
  private final PostService postService;

  public CompetitionController(PostService postService) {
    this.postService = postService;
  }

  @PostMapping
  public Post add(@RequestBody Post post) {
    return this.postService.add(post);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.postService.delete(id);
  }

  @GetMapping("{id}")
  public Post getById(@PathVariable Long id) {
    return this.postService.getById(id);
  }

  @GetMapping("page")
  public Page<Post> page(
      @RequestParam(required = false) Integer type,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable) {
    return this.postService.pageByType(type, pageable);
  }

  @PutMapping("{id}")
  public Post update(@PathVariable Long id, @RequestBody Post post) {
    return this.postService.update(id, post);
  }
}
