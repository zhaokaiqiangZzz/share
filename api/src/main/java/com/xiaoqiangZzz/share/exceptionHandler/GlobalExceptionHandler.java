package com.xiaoqiangZzz.share.exceptionHandler;

import com.mengyunzhi.core.exception.CallingIntervalIllegalException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

/**
 * 全局异常处理器.
 *
 * @author yz
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  /**
   * 权限错误异常.
   *
   * @param request   请求
   * @param exception 异常
   * @return 异常处理器
   */
  @ExceptionHandler(value = {AccessDeniedException.class,
      com.mengyunzhi.core.exception.AccessDeniedException.class})
  public ResponseEntity<ErrorMessage> accessDeniedExceptionHandler(
      HttpServletRequest request, Exception exception) {
    logger.error("非法访问异常: 主机 {} 调用地址 {} 错误信息 {}",
        request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
    return this.buildResponse(exception, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(value = {CallingIntervalIllegalException.class})
  public ResponseEntity<ErrorMessage> callingIntervalIllegalHandler(
      HttpServletRequest request, Exception exception) {
    logger.warn("调用频率过于频繁",
        request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
    return this.buildResponse(exception, HttpStatus.OK);
  }

  /**
   * 实体未找到异常.
   *
   * @param request   请求
   * @param exception 异常
   * @return 异常处理器
   */
  @ExceptionHandler(value = {EntityNotFoundException.class,
      com.mengyunzhi.core.exception.ObjectNotFoundException.class})
  public ResponseEntity<ErrorMessage> entityNotFoundExceptionHandler(
      HttpServletRequest request, Exception exception) {
    logger.error("实体未找到: 主机 {} 调用地址 {} 错误信息 {}",
        request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
    return this.buildResponse(exception, HttpStatus.NOT_FOUND);
  }

  /**
   * 非法参数异常.
   *
   * @param request   请求
   * @param exception 异常
   * @return 异常处理器
   */
  @ExceptionHandler(value = IllegalArgumentException.class)
  public ResponseEntity<ErrorMessage> illegalArgumentExceptionHandler(
      HttpServletRequest request, Exception exception) {
    logger.error("非法参数异常: 主机 {} 调用地址 {} 错误信息 {}",
        request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
    exception.printStackTrace();
    return this.buildResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * 非法状态异常.
   *
   * @param request   请求
   * @param exception 异常
   * @return 异常处理器
   */
  @ExceptionHandler(value = IllegalStateException.class)
  public ResponseEntity<ErrorMessage> illegalStateException(
      HttpServletRequest request, Exception exception) {
    logger.error("非法参数异常: 主机 {} 调用地址 {} 错误信息 {}",
        request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
    return this.buildResponse(exception, HttpStatus.PRECONDITION_FAILED);
  }

  /**
   * 校验异常
   *
   * @param request   请求
   * @param exception 异常
   * @return
   */
  @ExceptionHandler(value = {ValidationException.class, com.mengyunzhi.core.exception.ValidationException.class})
  public ResponseEntity<ErrorMessage> validationException(
      HttpServletRequest request, Exception exception) {
    logger.error("校验错误: 主机 {} 调用地址 {} 错误信息 {}",
        request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
    return this.buildResponse(exception, HttpStatus.BAD_REQUEST);
  }


  /**
   * runtime异常.
   *
   * @param request   请求
   * @param exception 异常
   * @return 异常处理器
   */
  @ExceptionHandler(value = RuntimeException.class)
  public ResponseEntity<ErrorMessage> runtimeExceptionHandler(
      HttpServletRequest request, Exception exception) {
    logger.error("程序运行异常: 主机 {} 调用地址 {} 错误信息 {}",
        request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
    exception.printStackTrace();
    return this.buildResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * 根据异常信息与状态码构建响应实体.
   *
   * @param exception 异常
   * @param status    状态码
   * @return 响应信息
   */
  private ResponseEntity<ErrorMessage> buildResponse(Exception exception, HttpStatus status) {
    return new ResponseEntity<>(this.getRootExceptionMessageFromException(exception), status);
  }


  /**
   * 根据异常获取根异常信息 根异常信息一班是最准确的.
   *
   * @param exception 异常
   * @return 根异常信息
   */
  private ErrorMessage getRootExceptionMessageFromException(Exception exception) {
    Throwable root = exception;
    Throwable cause;
    while ((cause = root.getCause()) != null && cause != root) {
      root = cause;
    }
    return new ErrorMessage(root.getMessage());
  }

  class ErrorMessage {
    private String message;

    public ErrorMessage(String message) {
      this.message = message;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
  }
}
