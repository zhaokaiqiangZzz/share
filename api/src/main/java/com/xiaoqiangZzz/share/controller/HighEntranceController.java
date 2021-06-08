package com.xiaoqiangZzz.share.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.xiaoqiangZzz.share.entity.Post;
import com.xiaoqiangZzz.share.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("highEntrance")
public class HighEntranceController {
  private final PostService postService;

  public HighEntranceController(PostService postService) {
    this.postService = postService;
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  @Secured("HIGH_ENTRANCE_ADD")
  public Post add(@RequestBody Post post) {
    post.setType(Post.TYPE_HIGH_ENTRANCE);
    return this.postService.add(post);
  }

  @DeleteMapping("{id}")
  @Secured("HIGH_ENTRANCE_DELETE")
  public void delete(@PathVariable Long id) {
    this.postService.delete(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  @Secured("HIGH_ENTRANCE_VIEW")
  public Post getById(@PathVariable Long id) {
    return this.postService.getById(id);
  }

  @GetMapping("page")
  @Secured("HIGH_ENTRANCE_VIEW")
  @JsonView(PageJsonView.class)
  public Page<Post> page(
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable) {
    return this.postService.pageByType(Post.TYPE_HIGH_ENTRANCE, pageable);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  @Secured("HIGH_ENTRANCE_EDIT")
  public Post update(@PathVariable Long id, @RequestBody Post post) {
    return this.postService.update(id, post);
  }

  private interface AddJsonView extends Post.UserJsonView {
  }

  private interface GetByIdJsonView extends Post.UserJsonView {
  }

  private interface PageJsonView extends Post.UserJsonView {
  }

  private interface UpdateJsonView extends Post.UserJsonView {
  }
}
