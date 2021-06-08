import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherPersonalComponent} from './teacher-personal.component';
import {ModifyPasswordComponent} from './modify-password/modify-password.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherPersonalComponent
  },
  {
    path: 'modifyPassword',
    component: ModifyPasswordComponent,
    data: {
      title: '修改密码'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherPersonalRoutingModule { }
