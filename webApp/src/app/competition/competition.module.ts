import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [CompetitionComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    CompetitionRoutingModule
  ]
})
export class CompetitionModule { }
