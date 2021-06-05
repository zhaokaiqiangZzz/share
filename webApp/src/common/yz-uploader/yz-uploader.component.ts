import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {concat} from 'rxjs/operators';
import {AttachmentService} from '../../service/attachment.service';

/**
 * 上传组件
 * 参考：https://github.com/NetanelBasal/ng-file-uploa
 */
@Component({
  selector: 'app-yz-uploader',
  templateUrl: './yz-uploader.component.html',
  styleUrls: ['./yz-uploader.component.scss']
})
export class YzUploaderComponent implements OnInit {
  fileList: Array<File> = [];

  // tslint:disable-next-line:variable-name
  _multiple = false;  // 是否上传多个文件

  finishedTask = 0; // 已成功完成上传的任务

  @Input()
  accept = '';

  @Input()
  uploadFun = null as (file: File) => Observable<HttpEvent<any>>;

  @Input()
  set multiple(multiple: boolean) {
    this._multiple = multiple;
    this.fileList = [];
  }

  @Output()
  beUpload = new EventEmitter<HttpResponse<any>[]>();

  @Output()
  beCancel = new EventEmitter<void>();

  progress = 0;

  uploading = false;

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList): void {
    this.progress = 0;
    if (this._multiple) {
      for (let i = 0; i < event.length; i++) {
        this.fileList.push(event.item(i));
      }
    } else {
      const file = event && event.item(0);
      this.fileList = [file];
    }
  }


  constructor(private attachmentService: AttachmentService) {
  }

  ngOnInit(): void {
    if (!this.uploadFun) {
      this.uploadFun = file => {
        return this.attachmentService.upload(file);
      };
    }
  }

  removeFile(file: File): void {
    this.fileList = this.fileList.filter(f => f !== file);
  }

  onSubmit(): void {
    if (this.fileList.length) {
      this.setProgress(0);
      this.uploading = true;
      this.finishedTask = 0;
      const response: HttpResponse<object | null>[] = [];

      let task: Observable<HttpEvent<object>> = this.uploadFun(this.fileList[0]);
      for (let i = 1; i < this.fileList.length; i++) {
        task = task.pipe(concat(this.uploadFun(this.fileList[i])));
      }
      task.subscribe((data) => {
        if (data.type === HttpEventType.UploadProgress) {
          if (data.total) {
            const progress = Math.round(100 * data.loaded / data.total);
            // 计算总上传进度
            this.setProgress(progress);
          }
        } else if (data.type === HttpEventType.Response) {
          response.push(data);
          this.setProgress(0);
          this.finishedTask++;
          if (this.finishedTask === this.fileList.length) {
            this.uploading = false;
            this.beUpload.emit(response);
          }
        }
      });
    }
  }

  onCancel(): void {
    this.beCancel.emit();
  }

  setProgress(num: number): void {
    this.progress = Number(num.toFixed(2));
  }
}
