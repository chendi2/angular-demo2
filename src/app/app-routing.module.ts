import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./body/index/index.component";
import {LoginComponent} from "./body/login/login.component";
import {LogonComponent} from "./body/logon/logon.component";

const routes: Routes = [
  { path: 'home', component: IndexComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logon', component: LogonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // 初始化路由器，并让它开始监听浏览器的地址变化
  exports: [RouterModule]
})
export class AppRoutingModule { }
