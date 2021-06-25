package com.xiaoqiangZzz.share.config;

import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.filter.AddAuthHeaderFilter;
import com.xiaoqiangZzz.share.filter.HeaderAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class MvcSecurityConfig extends WebSecurityConfigurerAdapter {
  public static String xAuthTokenKey = "x-auth-token";

  private final HeaderAuthenticationFilter headerAuthenticationFilter;
  private final AddAuthHeaderFilter addAuthHeaderFilter;
  private BCryptPasswordEncoder passwordEncoder;

  public MvcSecurityConfig(HeaderAuthenticationFilter headerAuthenticationFilter,
                           AddAuthHeaderFilter addAuthHeaderFilter) {
    this.headerAuthenticationFilter = headerAuthenticationFilter;
    this.addAuthHeaderFilter = addAuthHeaderFilter;
    this.passwordEncoder = new BCryptPasswordEncoder();
    User.setPasswordEncoder(this.passwordEncoder);
  }

  /**
   * https://spring.io/guides/gs/securing-web/
   *
   * @param http http安全
   * @throws Exception 异常
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
        // 开放端口
        .antMatchers("/user/register").permitAll()
        .anyRequest().authenticated()
        .and().cors()
        .and().httpBasic()
        .and().csrf().disable()
        .addFilterBefore(this.headerAuthenticationFilter, BasicAuthenticationFilter.class)
        .addFilterAfter(this.addAuthHeaderFilter, BasicAuthenticationFilter.class);
  }

  /**
   * CORS设置.
   * CORS出现错误时，请日志等级设置为debug查看具体原因
   *
   * @return 配置
   */
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:9876", "http://localhost:4200", "http://localhost:8102", "http://192.168.1.100:8102", "http://work-review.yunzhi.club:81"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("content-type", "x-auth-token", "authorization", "verificationCode"));
    configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return this.passwordEncoder;
  }

}
