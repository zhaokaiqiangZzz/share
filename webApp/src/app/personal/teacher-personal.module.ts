import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherPersonalRoutingModule } from './teacher-personal-routing.module';
import {TeacherPersonalComponent} from './teacher-personal.component';
import {ModifyPasswordComponent} from './modify-password/modify-password.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TeacherPersonalComponent, ModifyPasswordComponent],
  imports: [
    CommonModule,
    TeacherPersonalRoutingModule,
    ReactiveFormsModule
  ]
})
export class TeacherPersonalModule { }
