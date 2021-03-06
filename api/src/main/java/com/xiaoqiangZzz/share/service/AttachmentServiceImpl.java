package com.xiaoqiangZzz.share.service;

import com.mengyunzhi.core.service.CommonService;
import com.xiaoqiangZzz.share.entity.Attachment;
import com.xiaoqiangZzz.share.repository.AttachmentRepository;
import com.xiaoqiangZzz.share.repository.FileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Calendar;

@Service
public class AttachmentServiceImpl implements AttachmentService {

  private static final Logger logger = LoggerFactory.getLogger(AttachmentServiceImpl.class);

  final private FileRepository fileRepository;
  final private AttachmentRepository attachmentRepository;
  final private FileService fileService;
  final private com.xiaoqiangZzz.share.service.CommonService commonService;

  public AttachmentServiceImpl(FileRepository fileRepository, AttachmentRepository attachmentRepository, FileService fileService, com.xiaoqiangZzz.share.service.CommonService commonService) {
    this.fileRepository = fileRepository;
    this.attachmentRepository = attachmentRepository;
    this.fileService = fileService;
    this.commonService = commonService;
  }

  @Override
  public void download(Long id, String md5, HttpServletResponse response) {
    Attachment attachment = this.attachmentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    if (!attachment.getFile().getMd5().equals(md5)) {
      throw new EntityNotFoundException();
    }
    this.fileService.download(attachment.getOriginName(), attachment.getFile(), response);
  }

  @Override
  public Attachment upload(MultipartFile multipartFile) throws Exception {
    Path saveFilePath = Paths.get(CONFIG_PATH + this.getYearMonthDay());
    return this.saveAttachment(multipartFile, saveFilePath, false);
  }

  @Override
  public Attachment saveAttachment(MultipartFile multipartFile, Path saveFilePath, Boolean useOriginNameSave) throws Exception {
    logger.debug("??????????????????");
    Attachment attachment = new Attachment();

    logger.debug("???????????????");
    String fileName = multipartFile.getOriginalFilename();

    logger.debug("??????????????????????????????");
    // ???"."?????????????????????????????????????????????????????????????????????
    assert fileName != null;
    String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

    logger.debug("???????????????sha1,md5??????");
    String sha1ToMultipartFile = CommonService.encrypt(multipartFile, "SHA-1");
    String md5ToMultipartFile = CommonService.encrypt(multipartFile, "MD5");

    logger.debug("??????????????????");
    attachment.setOriginName(fileName);
    attachment.setExt(ext);

    com.xiaoqiangZzz.share.entity.File oldFile = this.fileRepository.findTopBySha1AndMd5(sha1ToMultipartFile, md5ToMultipartFile);
    // ??????????????????file
    if (oldFile == null) {
      logger.debug("?????????????????????");
      String saveName = null;
      if (useOriginNameSave) {
        saveName = fileName;
      } else {
        saveName = CommonService.md5(md5ToMultipartFile + System.currentTimeMillis()) + "." + ext;
      }

      logger.debug("?????????????????????????????????");
      if (multipartFile.isEmpty()) {
        throw new RuntimeException("???????????????????????????" + fileName);
      }

      logger.debug("???????????????????????????????????????????????????????????????????????????");
      if (!Files.exists(saveFilePath)) {
        Files.createDirectories(saveFilePath);
        new File(saveFilePath.resolve("index.html").toString()).createNewFile();
      }

      logger.debug("??????????????????????????????????????????");
      Files.copy(multipartFile.getInputStream(), saveFilePath.resolve(saveName),
          StandardCopyOption.REPLACE_EXISTING);

      logger.debug("??????????????????????????????????????????");
      com.xiaoqiangZzz.share.entity.File file = new com.xiaoqiangZzz.share.entity.File();
      file.setQuoteNumber(1);
      file.setName(saveName);
      file.setContentType(multipartFile.getContentType());
      file.setPath(saveFilePath.toString());
      file.setSha1(sha1ToMultipartFile);
      file.setMd5(md5ToMultipartFile);
      oldFile = this.fileRepository.save(file);
    } else {
      oldFile.setQuoteNumber(oldFile.getQuoteNumber() + 1);
      oldFile = this.fileRepository.save(oldFile);
    }

    attachment.setFile(oldFile);
    this.attachmentRepository.save(attachment);
    return attachment;
  }

  /**
   * ????????????????????????????????????
   */
  private String getYearMonthDay() {
    Calendar calendar = Calendar.getInstance();
    return "" + calendar.get(Calendar.YEAR)
        + (calendar.get(Calendar.MONTH) + 1)
        + calendar.get(Calendar.DAY_OF_MONTH);
  }

  @Override
  public String changeImage(MultipartFile file) {
    return commonService.uploadImage(file);
  }
}
