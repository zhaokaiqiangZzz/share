import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzGridModule} from 'ng-zorro-antd/grid';
import { LeftControlComponent } from './left-control/left-control.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [LayoutComponent, LeftControlComponent, ContentComponent, MenuComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzIconModule,
  ]
})
export class LayoutModule { }
