package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Attachment;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.nio.file.Path;

public interface AttachmentService {
  String CONFIG_PATH = "attachment/";

  /**
   * 下载
   *
   * @param id       附件ID
   * @param md5      md5
   * @param response 响应
   */
  void download(Long id, String md5, HttpServletResponse response);

  /**
   * 上传附件
   *
   * @param multipartFile 文件
   */
  Attachment upload(MultipartFile multipartFile) throws Exception;

  /**
   * 保存上传的文件
   *
   * @param multipartFile     上传的文件
   * @param saveFilePath      文件保存路径
   * @param useOriginNameSave 是否使用文件原名存储
   * @return 保存的附件实体
   */
  Attachment saveAttachment(MultipartFile multipartFile, Path saveFilePath, Boolean useOriginNameSave) throws Exception;

  String changeImage(MultipartFile file);
}
