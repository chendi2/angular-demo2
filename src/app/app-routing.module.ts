import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./body/index/index.component";
import {LoginComponent} from "./body/user/login/login.component";
import {LogonComponent} from "./body/user/logon/logon.component";
import {AboutComponent} from "./body/about/about.component";
import {UserComponent} from "./body/user/user.component";
import {ResetComponent} from "./body/user/reset/reset.component";

const routes: Routes = [
  { path: 'home', component: IndexComponent ,data: { breadcrumb: '主页' }},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', component: UserComponent ,data: { breadcrumb: '用户' },children:[
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { breadcrumb: '登陆' } },
      { path: 'logon', component: LogonComponent, data: { breadcrumb: '注册' } },
      { path: 'reset', component: ResetComponent, data: { breadcrumb: '重置密码' } }
    ]},
  { path: 'about', component: AboutComponent, data: { breadcrumb: '关于' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // 初始化路由器，并让它开始监听浏览器的地址变化
  exports: [RouterModule]
})
export class AppRoutingModule { }
