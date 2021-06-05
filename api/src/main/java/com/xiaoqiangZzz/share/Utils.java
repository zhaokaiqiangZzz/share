package com.xiaoqiangZzz.share;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.util.Assert;

import java.text.DecimalFormat;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 基础工作类
 *
 * @author panjie
 */
public class Utils {

    /**
     * 生成随机数字字符串
     *
     * @param length 字符串长度
     * @return
     */
    public static String generateRandomNumberCode(int length) {
        Assert.isTrue(length > 0, "传入的长度必须为正值");
        Assert.isTrue(length <= 9, "最长支持9位随机数");
        int base = 1;
        for (int j = 0; j < length; j++) {
            base = base * 10;
        }
        int randomNum = new Random().nextInt(base);
        return String.format(String.format("%%%sd", length), randomNum).replace(" ", "0");
    }

    /**
     * 随机生成手机号
     * 代码源于网络 由kingYiFan整理  create2019/05/24
     */
    public static String generateRandomPhoneNumber() {
        String[] telFirst = "134,135,136,137,138,139,150,151,152,157,158,159,130,131,132,155,156,133,153".split(",");
        int index = generateRandomNum(0, telFirst.length - 1);
        String first = telFirst[index];
        String second = String.valueOf(generateRandomNum(1, 888) + 10000).substring(1);
        String third = String.valueOf(generateRandomNum(1, 9100) + 10000).substring(1);
        return first + second + third;
    }

    /**
     * 生成随机数字
     *
     * @param start 起始
     * @param end   结束
     * @return
     */
    public static int generateRandomNum(int start, int end) {
        return (int) (Math.random() * (end - start + 1) + start);
    }

    /**
     * 由base64字符串获取验证码
     * 示例：
     * base64String： 由admin:password:1234加密后得到的字符串
     * position: 2
     * 返回值：1234
     *
     * @param base64String base64加密的字符串
     * @param position     位置
     * @return 字解密后的第position个:后面的内容返回，未获取成功则返回空字符串
     */
    public static String getValueFromBase64String(String base64String, int position) {
        if (base64String == null) {
            return null;
        }
        String[] authInfo = (new String(Base64.decodeBase64(base64String.getBytes()))).split(":");
        return authInfo.length > position ? authInfo[position] : null;
    }

    /**
     * https://www.cnblogs.com/zjk1/p/8623965.html
     * 校验手机号是否合法
     *
     * @param phoneNumber 手机号码
     */
    public static boolean isMobile(String phoneNumber) {
        boolean result = false;
        if (phoneNumber != null && !phoneNumber.isEmpty()) {
            Pattern pattern = null;
            Matcher matcher = null;
            String s2 = "^[1](([3|5|8][\\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\\d]{8}$";
            pattern = Pattern.compile(s2);
            matcher = pattern.matcher(phoneNumber);
            result = matcher.matches();
        }
        return result;
    }

    /**
     * 秒 转 天-时分秒(**天**小时**分钟**秒)
     *
     * @return
     */
    public static String getFormattedTime(long time) {
        String formattedTime = new String();
        //添加此以控制double类型数据精度，避免整数后带有小数点，影响观感
        DecimalFormat df = new DecimalFormat("0");
        double day = Math.floor(time / (24 * 60 * 60));
        double hour = Math.floor(time / (60 * 60)) % 24;
        double min = Math.floor(time / 60) % 60;
        double second = time % 60;

        if (day > 0) {
            formattedTime = df.format(day) + "天" + df.format(hour) + "小时";
        } else if (hour > 0) {
            formattedTime = df.format(hour) + "小时" + df.format(min) + "分钟";
        } else if (min > 0) {
            formattedTime = df.format(min) + "分钟" + df.format(second) + "秒";
        } else if (second > 0) {
            formattedTime = df.format(second) + "秒";
        }
        return formattedTime;
    }

    /**
     * 秒 转 天-时分秒(**天**小时**分钟**秒)
     *
     * @return
     */
    public static Long getTimeStamp(String time) {
        Long timeStamp = 0L;
        String secondString = new String();
        String minuteString = new String();
        String hourString = new String();
        String dayString = new String();
        if (time.contains("分钟")) {
            secondString = time.substring(time.indexOf("钟") + 1, time.indexOf("秒"));
            if (time.contains("小时")) {
                minuteString = time.substring(time.indexOf("时") + 1, time.indexOf("分"));
                if (time.contains("天")) {
                    hourString = time.substring(time.indexOf("天") + 1, time.indexOf("小"));
                    dayString = time.substring(0, time.indexOf("天"));
                } else {
                    hourString = time.substring(0, time.indexOf("小"));
                }
            } else {
                minuteString = time.substring(0, time.indexOf("分"));
            }
        } else {
            secondString = time.substring(0, time.indexOf("秒"));
        }
        if (!dayString.isEmpty()) {
            timeStamp = 24 * 60 * 60 * Long.parseLong(dayString)
                    + 60 * 60 * Long.parseLong(hourString)
                    + 60 * Long.parseLong(minuteString)
                    + Long.parseLong(secondString);
        } else if (!hourString.isEmpty()) {
            timeStamp = 60 * 60 * Long.parseLong(hourString)
                    + 60 * Long.parseLong(minuteString)
                    + Long.parseLong(secondString);
        } else if (!minuteString.isEmpty()) {
            timeStamp = 60 * Long.parseLong(minuteString)
                    + Long.parseLong(secondString);
        } else if (!secondString.isEmpty()) {
            timeStamp = Long.parseLong(secondString);
        }
        return timeStamp;
    }
}
