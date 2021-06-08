package com.xiaoqiangZzz.share.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class CommonServiceImpl implements CommonService {

    @Override
    public String uploadImage(MultipartFile file) {
        return uploadImageByPath(file, IMAGE_PATH);
    }

    @Override
    public String uploadImageByPath(MultipartFile file, String savePath) {
        String fileName = file.getOriginalFilename();
        Path saveFilePath = Paths.get(savePath);
        // 从"."最后一次出现的位置的下一位开始截取，获取扩展名
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
        Path path = Paths.get(saveFilePath.toString() + "/" + sha256(fileName + System.currentTimeMillis()) + "." + ext);
        try {
            if (!Files.exists(saveFilePath)) {
                Files.createDirectories(saveFilePath);
            }
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            System.out.println(e);
        }
        return path.toString();
    }

    @Override
    public String sha256(String content) {
        return SHA(content, "SHA-256");
    }

    private String SHA(final String strText, final String strType) {
        // 返回值
        String strResult = null;

        // 是否是有效字符串
        if (strText != null && strText.length() > 0) {
            try {
                // SHA 加密开始
                // 创建加密对象 并傳入加密類型
                MessageDigest messageDigest = MessageDigest.getInstance(strType);
                // 传入要加密的字符串
                messageDigest.update(strText.getBytes());
                // 得到 byte 類型结果
                byte byteBuffer[] = messageDigest.digest();

                // 將 byte 轉換爲 string
                StringBuffer strHexString = new StringBuffer();
                // 遍歷 byte buffer
                for (int i = 0; i < byteBuffer.length; i++) {
                    String hex = Integer.toHexString(0xff & byteBuffer[i]);
                    if (hex.length() == 1) {
                        strHexString.append('0');
                    }
                    strHexString.append(hex);
                }
                // 得到返回結果
                strResult = strHexString.toString();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }

        return strResult;
    }
}
