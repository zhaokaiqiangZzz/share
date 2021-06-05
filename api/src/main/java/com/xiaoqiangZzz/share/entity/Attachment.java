package com.xiaoqiangZzz.share.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 附件实体.
 */
@Entity
public class Attachment extends BaseEntity {
  /** 附件原始名称 */
  private String originName;

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonView(FileJsonView.class)
  private File file;

  /** 附件扩展名 */
  private String ext;

  public Attachment() {
  }

  public Attachment(Long id) {
    this.id = id;
  }

  @Override
  public Long getId() {
    return id;
  }

  @Override
  public void setId(Long id) {
    this.id = id;
  }

  public String getOriginName() {
    return originName;
  }

  public void setOriginName(String originName) {
    this.originName = originName;
  }

  public File getFile() {
    return file;
  }

  public void setFile(File file) {
    this.file = file;
  }

  public String getExt() {
    return ext;
  }

  public void setExt(String ext) {
    this.ext = ext;
  }

  public interface FileJsonView {
  }

  public interface WorkJsonView {
  }


}
