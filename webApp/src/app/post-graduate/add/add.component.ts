import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../entity/post';
import { CommonService } from '../../../service/common.service';
import { JobService } from '../../../service/job.service';
import { Attachment } from '../../../entity/attachment';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PostGraduateService } from '../../../service/post-graduate.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formGroup = new FormGroup({});
  showFileComponent = false;

  showImageComponent = false;

  imageUrl: string;

  post: Post;

  constructor(private commonService: CommonService,
              private postGraduateService: PostGraduateService) { }

  ngOnInit(): void {
    this.post = new Post({});
    this.post.attachments = new Array<Attachment>();
    this.formGroup.addControl('title', new FormControl('', Validators.required));
    this.formGroup.addControl('content', new FormControl('', Validators.required));
  }

  onSubmit(): void {
    this.post.title = this.formGroup.get('title').value;
    this.post.content = this.formGroup.get('content').value;
    this.postGraduateService.save(this.post)
      .subscribe(d => {
        this.commonService.success();
      });
  }

  /**
   * 导入完成
   */
  onImported($event: HttpResponse<Attachment>[]): void {
    $event.forEach(v => {
      this.post.attachments.push(v.body);
    });
    this.commonService.success(() => {
      this.showFileComponent = false;
    });
  }

  /**
   * 取消导入
   */
  onImportCancel(): void {
    this.showFileComponent = false;
  }

  onImageImported($event: HttpResponse<string>[]): void {
    $event.forEach(v => {
      this.post.imageUrl = v.body;
      this.imageUrl = environment.imageUrl + '/' + this.post.imageUrl;
    });
    this.commonService.success(() => {
      this.showImageComponent = false;
    });
  }

  onImageImportCancel(): void {
    this.showImageComponent = false;
  }

  onAttachmentDelete(index: number): void {
    this.post.attachments.splice(index, 1);
  }

}
