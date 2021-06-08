import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
        data: {
          title: '角色管理'
        }
      },
      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
        data: {
          title: '就业招聘'
        }
      },
      {
        path: 'postGraduate',
        loadChildren: () => import('./post-graduate/post-graduate.module').then(m => m.PostGraduateModule),
        data: {
          title: '考研保研'
        }
      },
      {
        path: 'highEntrance',
        loadChildren: () => import('./high-entrance/high-entrance.module').then(m => m.HighEntranceModule),
        data: {
          title: '高考咨询'
        }
      },
      {
        path: 'competitionMenu',
        loadChildren: () => import('./competition/competition.module').then(m => m.CompetitionModule),
        data: {
          title: '竞赛信息'
        }
      },
      {
        path: 'personal',
        loadChildren: () => import('./personal/teacher-personal.module').then(m => m.TeacherPersonalModule),
        data: {
          title: '个人中心'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
