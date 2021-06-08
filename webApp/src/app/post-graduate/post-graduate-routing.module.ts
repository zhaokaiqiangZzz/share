import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostGraduateComponent } from './post-graduate.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: PostGraduateComponent,
    data: {
      title: '列表'
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: '查看'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGraduateRoutingModule { }
