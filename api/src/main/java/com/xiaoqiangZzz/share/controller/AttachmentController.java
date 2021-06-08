package com.xiaoqiangZzz.share.controller;

import com.xiaoqiangZzz.share.entity.Attachment;
import com.xiaoqiangZzz.share.service.AttachmentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("attachment")
public class AttachmentController {
    final private AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    /**
     * 上传文件
     * @param multipartFile
     * @return  上传附件结果
     */
    @PostMapping("upload")
    public Attachment upload(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        return this.attachmentService.upload(multipartFile);
    }

    @GetMapping("download/{id}/{md5}")
    public void download(@PathVariable Long id, @PathVariable String md5, HttpServletResponse response) {
      this.attachmentService.download(id, md5, response);
    }

    @PostMapping("/uploadImage")
    public String changeImage(@RequestParam("file") MultipartFile file) {
        return attachmentService.changeImage(file);
    }
}
