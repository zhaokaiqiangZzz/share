package com.xiaoqiangZzz.share.config;

import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
  /**
   * 配置JsonView.
   *
   * @param converters 转换器
   */
  @Override
  public void configureMessageConverters(final List<HttpMessageConverter<?>> converters) {
    final ObjectMapper mapper = Jackson2ObjectMapperBuilder.json().defaultViewInclusion(true)
        .build();
    converters.add(new MappingJackson2HttpMessageConverter(mapper));
  }

  /**
   * 审计 获取当前登录用户实现.
   */
  private class SpringSecurityAuditorAware implements AuditorAware<User> {

    @Autowired
    private UserService userService;

    @Override
    public Optional<User> getCurrentAuditor() {
      Optional<User> user = this.userService.getCurrentAuditor();
      return user;
    }
  }
}
