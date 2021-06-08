import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { YzModalModule } from '../yz-modal/yz-modal.module';



@NgModule({
  declarations: [ImageUploadComponent],
  exports: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    YzModalModule
  ]
})
export class ImageUploadModule { }
