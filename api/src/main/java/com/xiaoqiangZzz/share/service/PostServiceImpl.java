package com.xiaoqiangZzz.share.service;

import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.xiaoqiangZzz.share.entity.Post;
import com.xiaoqiangZzz.share.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;

  public PostServiceImpl(PostRepository postRepository) {
    this.postRepository = postRepository;
  }

  @Override
  public Page<Post> pageByType(Integer type, Pageable pageable) {
    return this.postRepository.findAllByType(type, pageable);
  }

  @Override
  public Post add(Post post) {
    return this.postRepository.save(post);
  }

  @Override
  public void delete(Long id) {
    this.postRepository.deleteById(id);
  }

  @Override
  public Post getById(Long id) {
    return this.postRepository.findById(id).orElseThrow(() ->
        new ObjectNotFoundException("post未找到：" + id.toString()));
  }

  @Override
  public Post update(Long id, Post post) {
    Post oldPost = this.getById(id);
    oldPost.setTitle(post.getTitle());
    oldPost.setContent(post.getContent());
    oldPost.setImageUrl(post.getImageUrl());
    oldPost.setAttachments(post.getAttachments());
    return this.postRepository.save(oldPost);
  }
}
