package com.xiaoqiangZzz.share.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public interface CommonService {
  /**
   * 签名秘钥
   */
  String SECRET = "shareMusic";
  String IMAGE_PATH = "resources/image/";


  // 根据用户id生成token
  static String createJwtToken(Long id) {
    long ttlMillis = -1; // 表示不添加过期时间
    return createJwtToken(id.toString(), ttlMillis);
  }

  /**
   * 生成Token
   *
   * @param id        编号
   * @param ttlMillis 签发时间 （有效时间，过期会报错）
   * @return token String
   */
  static String createJwtToken(String id, long ttlMillis) {

    // 签名算法 ，将对token进行签名
    SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    // 生成签发时间
    long nowMillis = System.currentTimeMillis();
    Date now = new Date(nowMillis);

    // 通过秘钥签名JWT
    byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET);
    Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

    // Let's set the JWT Claims
    JwtBuilder builder = Jwts.builder().setId(id)
        .setIssuedAt(now)
        .signWith(signatureAlgorithm, signingKey);

    // if it has been specified, let's add the expiration
    if (ttlMillis >= 0) {
      long expMillis = nowMillis + ttlMillis;
      Date exp = new Date(expMillis);
      builder.setExpiration(exp);
    }

    // Builds the JWT and serializes it to a compact, URL-safe string
    return builder.compact();

  }

  // Sample method to validate and read the JWT
  static Claims parseJWT(String jwt) {
    // This line will throw an exception if it is not a signed JWS (as expected)
    Claims claims = Jwts.parser()
        .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET))
        .parseClaimsJws(jwt).getBody();
    return claims;
  }


  String uploadImage(
      MultipartFile file);

  String sha256(String content);

  String uploadImageByPath(MultipartFile file, String savePath);

}
