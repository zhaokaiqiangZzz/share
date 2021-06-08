package com.xiaoqiangZzz.share.service;


import com.xiaoqiangZzz.share.entity.File;

import javax.servlet.http.HttpServletResponse;

/**
 * 文件服务.
 */
public interface FileService {
  String CONFIG_PATH = AttachmentService.CONFIG_PATH;
  void download(String filename, File file, HttpServletResponse response);
}
