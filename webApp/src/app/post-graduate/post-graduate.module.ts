import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostGraduateRoutingModule } from './post-graduate-routing.module';
import { PostGraduateComponent } from './post-graduate.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [PostGraduateComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    PostGraduateRoutingModule
  ]
})
export class PostGraduateModule { }
