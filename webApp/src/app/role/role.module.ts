import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { PageModule } from '../../common/page/page.module';
import { SizeModule } from '../../common/size/size.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [RoleComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    PageModule,
    SizeModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
