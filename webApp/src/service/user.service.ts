import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../entity/user';
import {catchError, map, tap} from 'rxjs/operators';
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Router} from '@angular/router';
import {AppOnReadyItem, CommonService} from './common.service';
import {Assert, isNotNullOrUndefined, Random} from '../common/utils';
import {Page} from '../common/page';
import {HttpSuccessResponse} from '../common/http-success-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static VERIFICATION_CODE = 'verificationCode';
  protected baseUrl = 'user';
  private currentLoginUser: User | null | undefined;


  eUser = {
    newEmail: null as unknown as string,
    oldEmail: null as unknown as string
  };

  /**
   * buffer 设置为 1
   * 只保留最新的登录用户
   */
  private currentLoginUser$ = new ReplaySubject<User>(1);

  /**
   * 是否默认密码观察者
   */
  public defaultPassword$ = new ReplaySubject<boolean>(1);

  /**
   * 登录成功后触发的回调函数
   */
  private loginTriggerCallbacks = new Array<() => void>();

  /**
   * 用户注销时触发的回调函数
   * 一般用于清除缓存
   */
  public logoutTriggerCallbacks = new Array<() => void>();

  constructor(protected httpClient: HttpClient,
              private commonService: CommonService,
              private router: Router) {
  }


  /**
   * 校验密码是否正确
   * @param password 密码
   */
  public checkPasswordIsRight(oldPassword: string): Observable<boolean> {
    // 由于后台接收时接收两个参数， 而且不能为null，newPassword未使用到，传入随机值
    // 如果传入user， user的password会被自动加密， 密码必然错误
    const vUser = {password: oldPassword, newPassword: Random.nextString('', 6)};
    return this.httpClient.post<boolean>(this.baseUrl + '/checkPasswordIsRight', vUser);
  }

  /**
   * 校验新密码与校验密码是否相同
   * @param control 表单
   */
  public confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    // 判断确认密码与新密码是否相同
    if (newPassword && confirmNewPassword) {
      return newPassword !== confirmNewPassword ? {confirmPasswordError: true} : null;
    }
    return null;
  }

  /**
   * 删除
   */
  public delete(userId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${userId.toString()}`);
  }

  /**
   * 手机号是否存在
   * @param username 手机号
   */
  public existByUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + '/existByUsername/' + username);
  }

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser$(): Observable<User> {
    return this.currentLoginUser$;
  }

  /**
   * 通过Id获取用户
   */
  public getById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId.toString()}`);
  }

  /**
   * 请求当前登录用户
   */
  initCurrentLoginUser(callback?: () => void): void {
    // 由于在构造函数中使用了本函数, 不加setTimeout在其他地方注入时可能会造成undefined的问题
    // 为什么httpClient请求不以异步进行 需要setTimeout还没研究明白
    this.httpClient.get<User>(`${this.baseUrl}/currentLoginUser`)
      .subscribe((user: User) => {
          this.triggerLoginCallbacks();
          this.setCurrentLoginUser(user);
        }, () => {
          if (callback) {
            callback();
          }
          try {
            this.router.navigateByUrl('/login').then();
          } catch (e) {
            console.error('在跳转路由时发生错误', '/login');
          }
        },
        () => {
          if (callback) {
            callback();
          }
        });
  }

  /**
   * 是否需要输入验证码.
   * @param username 用户名
   */
  public isRequireValidationCode(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/isRequireValidationCode/${username}`);
  }

  /**
   * 判断新邮箱是否已存在于数据表中
   */
  public isEmailExist(param: { email: string }): Observable<boolean> {
    const httpParams = new HttpParams()
      .append('email', param.email ? param.email : '');
    return this.httpClient.get<boolean>(`${this.baseUrl}/isEmailExist`, {params: httpParams});
  }

  login(user: { username: string, password: string }): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //   .append(UserService.VERIFICATION_CODE, user.verificationCode);
    // 添加认证信息
    headers = headers.append('Authorization',
      'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));

    // 发起get请求并返回
    return this.httpClient.get<User>(`${this.baseUrl}/login`, {headers})
      .pipe(tap(data => this.setCurrentLoginUser(data)));
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/logout`).pipe(map(() => {
      this.triggerLogoutCallbacks();
      this.setCurrentLoginUser(null);
    }));
  }

  /**
   * 验证新邮箱是否被占用
   */
  public newEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return this.isEmailExist({email: control.value})
        .pipe(map(result => result ? {exist: true} : null),
          catchError(() => of(null)));
    };
  }

  /**
   * 验证原密码是否正确
   */
  public oldPasswordValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.checkPasswordIsRight(ctrl.value)
        .pipe(map((isRight: boolean) => (isRight ? null : {passwordError: true})),
          catchError(async () => null));
    };
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param username username
   */
  public page(page: number, size: number, username?: string): Observable<Page<User>> {
    const params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(username) ? username.toString() : '');

    return this.httpClient.get<Page<User>>(`${this.baseUrl}/page`, {params})
      .pipe(map((data) => new Page<User>(data).toObject((o) => new User(o))));
  }

  /**
   * 校验手机号是否存在
   * 当user存在时说明是修改，改为本身的手机号时不报错
   * @param user 修改的用户
   */
  public usernameExistValidator(user: User): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (user && ctrl.value === user.username) {
        return of(null);
      }

      return this.existByUsername(ctrl.value)
        .pipe(map((usernameExist: boolean) => (usernameExist ? {usernameExistError: true} : null)),
          catchError(async () => null));
    };
  }

  /**
   * 重置密码
   * @param id 用户id
   */
  public resetPassword(id: number): Observable<void> {
    Assert.isNotNullOrUndefined(id, 'id未传入');
    const url = `${this.baseUrl}/resetPassword/${id}`;
    return this.httpClient.patch<void>(url, {});
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User | null): void {
    this.currentLoginUser = user;
    this.currentLoginUser$.next(user);
  }

  /**
   * 调用登录成功后的回调函数
   */
  public triggerLoginCallbacks(): void {
    this.loginTriggerCallbacks.forEach(callback => {
      if (callback) {
        callback();
      }
    });
  }

  /**
   * 新增
   */
  public save(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}`, user);
  }

  /**
   * 发送登录验证码
   * @param username 手机号
   * @author panjie
   */
  public sendVerificationCode(username: string): Observable<HttpSuccessResponse> {
    Assert.isString(username, '用户名类型为段为字符串');
    const params = new HttpParams().append('username', username);
    return this.httpClient
      .get<HttpSuccessResponse>(`${this.baseUrl}/sendVerificationCode`, {params});
  }

  /**
   * 调用注销后的回调函数
   */
  public triggerLogoutCallbacks(): void {
    this.logoutTriggerCallbacks.forEach(callback => {
      if (callback) {
        callback();
      }
    });
  }

  /**
   * 更新
   */
  public update(userId: number, user: { username: string, name: string }): Observable<User> {
    Assert.isNumber(userId, 'userId must be number');
    Assert.isNotNullOrUndefined(user, user.name, user.username,
      'some properties must be passed');
    return this.httpClient.put<User>(`${this.baseUrl}/${userId.toString()}`, user);
  }

  /**
   * 登录用户修改密码
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  public updatePassword(newPassword: string, oldPassword: string): Observable<void> {
    const vUser = {password: oldPassword, newPassword: encodeURIComponent(newPassword)};
    return this.httpClient.put<void>(this.baseUrl + '/updatePassword', vUser);
  }

  /**
   * 根据username获取角色.
   * @param username 用户名
   */
  getRolesByUsername(username: string): Observable<Array<number>> {
    const params = new HttpParams().append('username', username);
    return this.httpClient.get<Array<number>>(this.baseUrl + '/getRolesByUsername', {params});
  }

  /**
   * 用户绑定
   * @param bUser 用户
   */
  bind(bUser: { name: string, username: string, num: string, verificationCode: string }): Observable<User> {
    Assert.isString(bUser.name, bUser.username, bUser.num, bUser.verificationCode, '姓名，用户名，学号/工号等必须设置');
    return this.httpClient.post<User>(this.baseUrl + '/userBinding', bUser);
  }

  setPassword(password: string): Observable<void> {
    return this.httpClient.patch<void>(this.baseUrl + '/setPassword', {password});
  }

  register(param: { password: string; name: string; username: string }) {
    return this.httpClient.post(this.baseUrl + '/register', param);
  }
}
