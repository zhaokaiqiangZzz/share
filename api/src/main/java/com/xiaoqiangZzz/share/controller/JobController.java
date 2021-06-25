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
@RequestMapping("job")
public class JobController {
  private final PostService postService;

  public JobController(PostService postService) {
    this.postService = postService;
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  @Secured(SecurityRole.JOB_ADD)
  public Post add(@RequestBody Post post) {
    post.setType(Post.TYPE_JOB);
    return this.postService.add(post);
  }

  @DeleteMapping("{id}")
  @Secured(SecurityRole.JOB_DELETE)
  public void delete(@PathVariable Long id) {
    this.postService.delete(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  @Secured(SecurityRole.JOB_VIEW)
  public Post getById(@PathVariable Long id) {
    return this.postService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  @Secured(SecurityRole.JOB_VIEW)
  public Page<Post> page(
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable) {
    return this.postService.pageByType(Post.TYPE_JOB, pageable);
  }

  @PutMapping("{id}")
  @Secured(SecurityRole.JOB_EDIT)
  @JsonView(UpdateJsonView.class)
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
