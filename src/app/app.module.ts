import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { IndexComponent } from './body/index/index.component';
import { LoginComponent } from './body/login/login.component';
import { LogonComponent } from './body/logon/logon.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzInputModule} from "ng-zorro-antd/input";
import { NzImageModule } from 'ng-zorro-antd/image';
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzTimelineModule} from "ng-zorro-antd/timeline";
import { AboutComponent } from './body/about/about.component';
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzIconModule} from "ng-zorro-antd/icon";


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    IndexComponent,
    LoginComponent,
    LogonComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzImageModule,
    NzAlertModule,
    NzTimelineModule,
    NzTypographyModule,
    NzIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    {provide: NzMessageService}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

