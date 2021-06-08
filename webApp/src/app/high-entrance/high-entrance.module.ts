import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighEntranceRoutingModule } from './high-entrance-routing.module';
import { HighEntranceComponent } from './high-entrance.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [HighEntranceComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    HighEntranceRoutingModule
  ]
})
export class HighEntranceModule { }
