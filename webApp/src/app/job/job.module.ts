import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { PageModule } from '../../common/page/page.module';
import { ReactiveFormsModule } from '@angular/forms';
import { YzUploaderModule } from '../../common/yz-uploader/yz-uploader.module';
import { ImageUploadModule } from '../../common/image-upload/image-upload.module';


@NgModule({
  declarations: [JobComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    PageModule,
    ReactiveFormsModule,
    YzUploaderModule,
    ImageUploadModule
  ]
})
export class JobModule { }
