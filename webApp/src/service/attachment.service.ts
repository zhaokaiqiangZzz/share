import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Attachment} from '../entity/attachment';

@Injectable({
  providedIn: 'root'
})
/**
 * 附件对应的M层
 */
export class AttachmentService {

  private url = 'attachment';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 数据导出
   * @param attachment 单个导出的附件
   */
  download(attachment: Attachment): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.url}/download/${attachment.id}/${attachment.file.md5}`,
      {responseType: 'blob' as 'json'});
  }

  // todo: https://github.com/yunzhiclub/work-review/issues/239
  downloadAttachmentsAsZip(attachments: Attachment[], name: string, callback?: () => void): void {

  }

  /**
   * 上传文件
   * @param file 文件
   */
  upload(file: File): Observable<HttpEvent<object>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.url}/upload`,
      formData, {reportProgress: true, observe: 'events'});
  }

  uploadImage(file: File): Observable<HttpEvent<object>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.url}/uploadImage`,
      formData, {reportProgress: true, observe: 'events'});
  }
}
