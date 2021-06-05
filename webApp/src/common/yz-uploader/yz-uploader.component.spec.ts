import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YzUploaderComponent} from './yz-uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {interval, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse, HttpUploadProgressEvent} from '@angular/common/http';
import {randomNumber} from '../utils';

describe('YzUploaderComponent', () => {
  let component: YzUploaderComponent;
  let fixture: ComponentFixture<YzUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YzUploaderComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YzUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // 模拟一个上传的函数，该函数在2秒内完成上传，上传完成后返回一个空对象
    component.uploadFun = (file: File) => {
      console.log('接收到的文件为：', file);
      return new Observable<HttpEvent<object>>(subscriber => {
        let i = 0;
        const total = randomNumber(10000);
        interval(20).pipe(
          take(100),
          map(() => ++i)
        ).subscribe(data => {
          subscriber.next({
            type: HttpEventType.UploadProgress,
            loaded: data * total / 100,
            total
          } as HttpUploadProgressEvent);
          if (data === 100) {
            subscriber.next({
              type: HttpEventType.Response,
              body: {}
            } as HttpResponse<object>);
            subscriber.complete();
          }
        });
      });
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('progress 进度条', (done) => {
    let i = 0;
    interval(20).pipe(
      take(100),
      map(() => ++i)
    ).subscribe(data => {
      component.progress = data;
      component.uploading = true;
      fixture.detectChanges();
      if (i === 100) {
        done();
      }
    });
  });
});
