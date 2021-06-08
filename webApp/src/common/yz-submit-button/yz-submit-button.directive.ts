import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Assert } from '../utils';

/**
 * 使用方法
 *  <button [appYzSubmitButton]="{submitting: true}">
 * .....
 *  </button>
 *
 *  submitting 默认值应为 false
 *  方法开始执行设置    submitting= true
 *  方法调用完成以后设置 submitting = false
 *
 */
@Directive({
  selector: 'button[appYzSubmitButton]'
})
export class YzSubmitButtonDirective implements OnInit, AfterViewInit, OnDestroy {
  public state = {
    text: null as string,
    suffix: '.',
    // 样式变化的时间间隔
    interval: 1000,
  };

  // 按钮
  htmlButton: HTMLButtonElement;

  // 用于加载样式变化
  timer: any;

  // 当网速慢时才变化显示内容
  delayShow: any;

  originButtonInnerHtml: string;

  /**
   * 宿主元素样式的原始宽度值
   * 在开始前获取原始宽度，并使用其设置为元素的固定值
   * 以防止在动态改变按钮的文字的过程中按钮宽度发生变化的问题
   * 在结束时恢复按钮的style.width宽度值
   */
  styleWidth: string;

  /**
   * 指令初始化
   * @param param submitting: 是否正在提交中 text:提交过程中显示的文本 suffix:在加载过程中的文本后缀  interval:动态变换的时间间隔
   */
  @Input()
  private set appYzSubmitButton(param: { submitting: boolean, text?: string, suffix?: string, interval?: number }) {
    Assert.isObject(param, '参数类型必须为对象');

    if (param.suffix) {
      this.state.suffix = param.suffix;
    }
    if (param.text) {
      this.state.text = param.text;
    }
    if (param.interval) {
      this.state.interval = param.interval;
    }

    if (param.submitting) {
      this.submitting();
    } else if (this.originButtonInnerHtml) {
      clearInterval(this.timer);
      clearTimeout(this.delayShow);
      this.htmlButton.innerHTML = this.originButtonInnerHtml;
      this.htmlButton.disabled = false;
      this.htmlButton.style.width = this.styleWidth;
    }
  }

  constructor(el: ElementRef) {
    this.htmlButton = el.nativeElement;
  }

  /**
   * 获取按钮的文本
   *
   * @sample
   * input:
   * <button><i class="xxx"></i> 查询</button>
   * output:
   * 查询
   *
   * @param htmlButton 按钮
   */
  public getButtonText(htmlButton: HTMLButtonElement): string {
    if (!this.state.text) {
      const iHtml = htmlButton.querySelector('i');
      if (iHtml) {
        htmlButton.removeChild(iHtml);
      }
      this.state.text = htmlButton.innerText.replace(/\s/g, '');
    }

    return this.state.text;
  }

  /**
   * 获取html按钮的当前宽度
   * 由于htmlButton.offsetWidth是一个整数，所以当按钮的宽度精确到小数点后时，htmlButton.offsetWidth得到的值实际上将小于按钮的实际值
   * 比如按钮的实际值为：58.03，但htmlButton.offsetWidth此时却是58
   * 此时如果使用58来设置按钮的宽度，则可能产生按钮无法容纳按钮中文本的情况
   * 此时，将导致按钮中原本为一行的内容会自动扩充为2行。
   *
   * 而在htmlButton.offsetWidth上加1，则可以规避设置按钮的宽度后出现的可能无法容纳按钮文本的问题
   * @param htmlButton Html按钮
   */
  getHtmlButtonWidth(htmlButton: HTMLButtonElement): number {
    return htmlButton.offsetWidth + 1;
  }

  ngOnInit(): void {
  }

  /**
   * 设置按钮提交中的状态
   */
  public submitting(): void {
    this.styleWidth = this.htmlButton.style.width;
    // this.htmlButton.offsetWidth会自动下取整
    const width = this.getHtmlButtonWidth(this.htmlButton);
    this.htmlButton.style.width = width + 'px';
    // 延迟0.2秒显示,防止网速良好时按钮突兀的变化
    this.delayShow = setTimeout(() => {
      this.htmlButton.innerText = this.getButtonText(this.htmlButton);
      this.htmlButton.disabled = true;
      // 加载请求中的样式
      this.timer = setInterval(() => {
        const strings = this.htmlButton.innerText.split(this.state.suffix);
        if (strings.length < 4) {
          this.htmlButton.innerText += this.state.suffix;
        } else {
          this.htmlButton.innerText = this.state.text;
        }
      }, this.state.interval);
    }, 200);
  }

  ngAfterViewInit(): void {
    this.originButtonInnerHtml = this.htmlButton.innerHTML;
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
      clearTimeout(this.delayShow);
    }
  }
}
