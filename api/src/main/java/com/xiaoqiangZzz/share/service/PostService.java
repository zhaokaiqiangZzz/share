package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PostService {
  Page<Post> pageByType(Integer type, Pageable pageable);

  Post add(Post post);

  void delete(Long id);

  Post getById(Long id);

  Post update(Long id, Post post);
}
