import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { SuiModule } from 'ng2-semantic-ui';
import { IndexComponent } from './body/index/index.component';
import { LoginComponent } from './body/login/login.component';
import { LogonComponent } from './body/logon/logon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    IndexComponent,
    LoginComponent,
    LogonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule // Add Semantic UI module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
