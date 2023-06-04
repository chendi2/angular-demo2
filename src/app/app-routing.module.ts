import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./body/index/index.component";
import {LoginComponent} from "./body/login/login.component";
import {LogonComponent} from "./body/logon/logon.component";
import {AboutComponent} from "./body/about/about.component";

const routes: Routes = [
  { path: 'home', component: IndexComponent ,data: { breadcrumb: '主页' }},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { breadcrumb: '登陆' } },
  { path: 'logon', component: LogonComponent, data: { breadcrumb: '注册' } },
  { path: 'about', component: AboutComponent, data: { breadcrumb: '关于' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // 初始化路由器，并让它开始监听浏览器的地址变化
  exports: [RouterModule]
})
export class AppRoutingModule { }
