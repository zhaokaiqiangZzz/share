import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YzUploaderComponent } from './yz-uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {YzModalModule} from '../yz-modal/yz-modal.module';



@NgModule({
    declarations: [YzUploaderComponent],
    exports: [
        YzUploaderComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    YzModalModule
  ]
})
export class YzUploaderModule { }
