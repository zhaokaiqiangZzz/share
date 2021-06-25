import { Component, OnInit } from '@angular/core';
import { Post } from '../../../entity/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { JobService } from '../../../service/job.service';
import { Attachment } from '../../../entity/attachment';
import { AttachmentService } from '../../../service/attachment.service';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  post: Post;
  imageUrl: string;

  constructor(private route: ActivatedRoute,
              private jobService: JobService,
              private attachmentService: AttachmentService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has(('id'))) {
        const id = +params.get('id');
        this.init(id);
      }
    });
  }

  private init(id: number): void {
    this.jobService.getById(id).subscribe((post: Post) => {
      this.post = post;
      this.imageUrl = environment.imageUrl + '/' + this.post.imageUrl;
    });
  }

  onDownloadAttachment(attachment: Attachment, index: number): void {
    const filename = attachment.originName;
    this.attachmentService.download(attachment)
      .subscribe((blob) => {
        this.commonService.saveFile(blob, filename);
      });
  }
}
