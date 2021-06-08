import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { YzSubmitButtonModule } from '../../common/yz-submit-button/yz-submit-button.module';
import { SizeModule } from '../../common/size/size.module';
import { PageModule } from '../../common/page/page.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { RoleSelectComponent } from './role-select/role-select.component';


@NgModule({
  declarations: [UserComponent, AddComponent, EditComponent, RoleSelectComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    YzSubmitButtonModule,
    SizeModule,
    PageModule,
  ]
})
export class UserModule { }
