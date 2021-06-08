import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostGraduateRoutingModule } from './post-graduate-routing.module';
import { PostGraduateComponent } from './post-graduate.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { PageModule } from '../../common/page/page.module';


@NgModule({
  declarations: [PostGraduateComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    PostGraduateRoutingModule,
    PageModule
  ]
})
export class PostGraduateModule { }
