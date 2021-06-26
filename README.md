# share
搭建一个可以供校友、教师、同学等搜索、上传资料、互相交流等的知识共享平台。包含总管理员、模块管理员、教师、学生、校友等角色，实现包括学习资源、考研资源、就业资源、公务员考试资源、出国留学资源、政策信息等资源的管理。要求功能全面，可用性好，执行速度快，支持开源数据库。
# 快速启动
你需要安装<br>
nodejs：https://www.kancloud.cn/yunzhiclub/springboot_angular_guide/1286652<br>
angular-cli：https://www.kancloud.cn/yunzhiclub/springboot_angular_guide/1286655<br>
maven: https://www.kancloud.cn/yunzhiclub/springboot_angular_guide/1287233<br>
mysql<br>
nginx<br>
git<br>

* 克隆项目
```
git clone https://github.com/zhaokaiqiangZzz/share.git
```
* 启动前台
```
cd webApp
npm install
ng serve
```
打开http://localhost:4200网址出现登录界面说明启动成功
* 配置数据库<br>
数据库使用mysql<br>
端口：3307<br>
数据库名：share<br>
用户名：root<br>
密码：（空）<br>
参数可以在api/src/main/resources/application.yml下更改<br>
* 启动后台
```
cd api
mvn install
mvn spring-boot:run
```
*配置nginx
定位到`NGINX`配置目录，引入当前项目下的nginx.conf配置文件。
具体请参考nginx的使用说明。
重新加载nginx
```
nginx -s reload
```
win10用户点击nginx.exe重新启动<br>
启动成功！<br>
初始化用户名：13900000000
初始化密码：admin
