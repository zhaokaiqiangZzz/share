package com.xiaoqiangZzz.share.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

/**
 * 帖子
 */
@Entity
@SQLDelete(sql = "update `post` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
@Where(clause = "deleted = false")
@EntityListeners(AuditingEntityListener.class)
public class Post extends BaseEntity {

  public static Integer TYPE_JOB = 0;
  public static Integer TYPE_POST_GRADUATE = 1;
  public static Integer TYPE_HIGH_ENTRANCE = 2;
  public static Integer TYPE_COMPETITION = 3;

  private String title;

  private String content;

  private String imageUrl;

  private Integer type;

  @OneToMany
  private List<Attachment> attachments = new ArrayList<>();

  @CreatedBy
  @ManyToOne
  private User createUser;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public List<Attachment> getAttachments() {
    return attachments;
  }

  public void setAttachments(List<Attachment> attachments) {
    this.attachments = attachments;
  }

  public User getCreateUser() {
    return createUser;
  }

  public void setCreateUser(User createUser) {
    this.createUser = createUser;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
