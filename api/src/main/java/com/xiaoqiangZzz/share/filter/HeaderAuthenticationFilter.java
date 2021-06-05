package com.xiaoqiangZzz.share.filter;

import com.xiaoqiangZzz.share.config.MvcSecurityConfig;
import com.xiaoqiangZzz.share.entity.User;
import com.xiaoqiangZzz.share.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

/**
 * header中x-auth-token认证
 * 如果xAuthToken有效，则设置认证信息PreAuthenticatedAuthenticationToken
 */
@Component
public class HeaderAuthenticationFilter extends OncePerRequestFilter {
  private final UserService userService;

  public HeaderAuthenticationFilter(UserService userService) {
    this.userService = userService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    // 获取token，且token为已认证，则设置PreAuthenticatedAuthenticationToken，表明当前用户已认证
    String authToken = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
    if (authToken == null) {
      authToken = UUID.randomUUID().toString();
      this.userService.bindAuthTokenLoginUsername(authToken, null, false);
    } else if (this.userService.isAuth(authToken)) {
      Optional<org.springframework.security.core.userdetails.User> userOptional = this.userService.getUserByToken(authToken);
      if (userOptional.isPresent()) {
        // token有效，则设置登录信息
        PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(
            userOptional.get(), null, userOptional.get().getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } else if (!this.userService.getUserByToken(authToken).isPresent()) {
      this.userService.bindAuthTokenLoginUsername(authToken, null, false);
    }

    response.setHeader(MvcSecurityConfig.xAuthTokenKey, authToken);

    filterChain.doFilter(new RequestWrapper(request, authToken), response);
  }

  private class RequestWrapper extends HttpServletRequestWrapper {
    private final String xAuthToken;

    /**
     * Constructs a request object wrapping the given request.
     *
     * @param request The request to wrap
     * @throws IllegalArgumentException if the request is null
     */
    public RequestWrapper(HttpServletRequest request, String xAuthToken) {
      super(request);
      this.xAuthToken = xAuthToken;
    }


    @Override
    public String getHeader(String name) {
      if ("x-auth-token".equals(name)) {
        return this.xAuthToken;
      }
      return super.getHeader(name);
    }
  }
}
