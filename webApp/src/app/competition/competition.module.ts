import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { PageModule } from '../../common/page/page.module';
import { YzUploaderModule } from '../../common/yz-uploader/yz-uploader.module';
import { ImageUploadModule } from '../../common/image-upload/image-upload.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CompetitionComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    PageModule,
    YzUploaderModule,
    ImageUploadModule,
    ReactiveFormsModule
  ]
})
export class CompetitionModule { }
