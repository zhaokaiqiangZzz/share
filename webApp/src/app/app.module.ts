import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LayoutModule } from './layout/layout.module';
import { ApiPrefixAndMergeMapInterceptor } from '../interceptor/api-prefix-and-merge-map.interceptor';
import { XAuthTokenInterceptor } from '../interceptor/x-auth-token.interceptor';
import { NullOrUndefinedOrEmptyInterceptor } from '../interceptor/null-or-undefined-or-empty.interceptor';
import { LoadingInterceptor } from '../interceptor/loading.interceptor';
import { HttpErrorInterceptor } from '../interceptor/http-error.interceptor';
import { JobModule } from './job/job.module';
import { PostGraduateModule } from './post-graduate/post-graduate.module';
import { HighEntranceModule } from './high-entrance/high-entrance.module';
import { CompetitionModule } from './competition/competition.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    LayoutModule,
    JobModule,
    PostGraduateModule,
    HighEntranceModule,
    CompetitionModule

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixAndMergeMapInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: XAuthTokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: NullOrUndefinedOrEmptyInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
