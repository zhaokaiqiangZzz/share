package com.xiaoqiangZzz.share.repository;

import com.xiaoqiangZzz.share.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long>, JpaSpecificationExecutor<Post> {
  Page<Post> findAllByType(Integer type, Pageable pageable);
}
