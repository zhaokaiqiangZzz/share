package com.xiaoqiangZzz.share.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.xiaoqiangZzz.share.entity.Attachment;
import com.xiaoqiangZzz.share.entity.Post;
import com.xiaoqiangZzz.share.security.SecurityRole;
import com.xiaoqiangZzz.share.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("postGraduate")
public class PostGraduateController {
  private final PostService postService;

  public PostGraduateController(PostService postService) {
    this.postService = postService;
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  @Secured(SecurityRole.POST_GRADUATE_ADD)
  public Post add(@RequestBody Post post) {
    post.setType(Post.TYPE_POST_GRADUATE);
    return this.postService.add(post);
  }

  @DeleteMapping("{id}")
  @Secured(SecurityRole.POST_GRADUATE_DELETE)
  public void delete(@PathVariable Long id) {
    this.postService.delete(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  @Secured(SecurityRole.POST_GRADUATE_VIEW)
  public Post getById(@PathVariable Long id) {
    return this.postService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  @Secured(SecurityRole.POST_GRADUATE_VIEW)
  public Page<Post> page(
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable) {
    return this.postService.pageByType(Post.TYPE_POST_GRADUATE, pageable);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  @Secured(SecurityRole.POST_GRADUATE_EDIT)
  public Post update(@PathVariable Long id, @RequestBody Post post) {
    return this.postService.update(id, post);
  }

  private interface AddJsonView extends Post.UserJsonView {
  }

  private interface GetByIdJsonView extends Post.UserJsonView, Attachment.FileJsonView {
  }

  private interface PageJsonView extends Post.UserJsonView {
  }

  private interface UpdateJsonView extends Post.UserJsonView {
  }
}
