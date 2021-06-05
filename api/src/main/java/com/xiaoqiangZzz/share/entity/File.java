package com.xiaoqiangZzz.share.entity;

import javax.persistence.Entity;

/**
 * 文件实体.
 */
@Entity
public class File extends BaseEntity {

  private String sha1;

  private String md5;

  /** 文件存储路径 */
  private String path;

  /** 文件存储名称 */
  private String name;

  /**
   * 文件MIME，对应文件类型
   */
  private String contentType;

  /** 文件被引用次数 */
  private int quoteNumber;

  public String getSha1() {
    return sha1;
  }

  public void setSha1(String sha1) {
    this.sha1 = sha1;
  }

  public String getMd5() {
    return md5;
  }

  public void setMd5(String md5) {
    this.md5 = md5;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getQuoteNumber() {
    return quoteNumber;
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }

  public void setQuoteNumber(int quoteNumber) {
    this.quoteNumber = quoteNumber;
  }
}
