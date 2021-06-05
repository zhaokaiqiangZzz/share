import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SizeComponent} from './size.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [SizeComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SizeComponent
  ]
})
export class SizeModule {
}
