package com.xiaoqiangZzz.share.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;
import java.util.Objects;

/**
 * 抽象实体.
 *
 * @author panjie
 */
@MappedSuperclass
public class BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;

  @JsonView(DeletedJsonView.class)
  private Boolean deleted = false;

  @CreationTimestamp
  private Timestamp createTime;

  public Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Timestamp createTime) {
    this.createTime = createTime;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Boolean getDeleted() {
    return deleted;
  }

  public void setDeleted(Boolean deleted) {
    this.deleted = deleted;
  }

  @Override
  public boolean equals(Object o) {
    try {
      if (this == o) {
        return true;
      }
      if (o == null || getClass() != o.getClass()) {
        return false;
      }
      BaseEntity that = (BaseEntity) o;
      return id.equals(that.id);
    } catch (Exception e) {
      return super.equals(o);
    }
  }

  @Override
  public int hashCode() {
    try {
      return Objects.hash(id);
    } catch (Exception e) {
      return super.hashCode();
    }
  }

  public interface DeletedJsonView {}
}
