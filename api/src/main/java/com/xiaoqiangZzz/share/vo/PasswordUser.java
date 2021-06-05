package com.xiaoqiangZzz.share.vo;

/**
 * user对于密码的输入输出.
 */
public class PasswordUser {
    /**
     * 原密码
     */
    private String password;

    /**
     * 新密码
     */
    private String newPassword;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
