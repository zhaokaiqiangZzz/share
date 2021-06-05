package com.xiaoqiangZzz.share.filter;

import com.xiaoqiangZzz.share.config.MvcSecurityConfig;
import com.xiaoqiangZzz.share.service.UserService;
import com.xiaoqiangZzz.share.service.UserServiceImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * 添加响应header中的token信息
 */
@Component
public class AddAuthHeaderFilter extends OncePerRequestFilter {
  private final UserService userService;

  public AddAuthHeaderFilter(UserService userService) {
    this.userService = userService;
  }

  /**
   * 有X-auth-token，则验证是否有效，有效则更新有效期；无效则重新发放一个有效的。
   * 未获取到a-auth-token，则发放一个
   *
   * @param request     请求
   * @param response    响应
   * @param filterChain 过滤器链
   * @throws ServletException
   * @throws IOException
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    // 如果用户是通过Basic认证过滤器认证的，则将认证的用户名与xAuthToken相绑定
    Authentication authResult = SecurityContextHolder.getContext().getAuthentication();
    if (authResult != null && authResult.isAuthenticated() && !(authResult instanceof PreAuthenticatedAuthenticationToken)) {
      String xAuthToken = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
      if (xAuthToken == null) {
        throw new RuntimeException("未接收到xAuthToken，请在前置过滤器中加入有效的xAuthToken");
      }
      UserServiceImpl.UserDetail userDetail = (UserServiceImpl.UserDetail) authResult.getPrincipal();
      this.userService.bindAuthTokenLoginUsername(xAuthToken, userDetail, true);
    }

    filterChain.doFilter(request, response);
  }
}
