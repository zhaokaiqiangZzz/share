package com.xiaoqiangZzz.share.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 数据初始化
 * https://spring.io/guides/tutorials/rest/
 */
@Configuration
public class DataInitConfig {

  @Bean
  CommandLineRunner initDatabase() {
    return args -> {
    };
  }
}
