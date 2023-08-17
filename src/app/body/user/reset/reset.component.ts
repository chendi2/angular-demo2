import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  email:string = "";  //验证邮箱
  isError:boolean = false
  errorMessage:string = ""
  isLoading:boolean = false
  isVisible = false;  //对话框显示属性
  isOkLoading = false;  //对话框按钮加载属性
  inputValue: string | null = null;
  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  resetForm: FormGroup = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.email
    ])
  })

  transformRequest(data:any) {
    let str = '';
    for (let i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  };

  onSubmit() {
    this.isLoading = true
    if (this.resetForm.valid) {
      let url = '/api/user/reset';
      let params = this.resetForm.value
      const httpOptions = {
        headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
      };
      this.http.post(url,this.transformRequest(params),httpOptions).subscribe((res:any)=>{
        this.isLoading = false
        if (res.code == 200){
          this.isError = false
          this.email = params.email
          //确认注册响应式表单
          this.showModal()
        }else if (res.code == 400){
          this.isError = true
          this.errorMessage = res.message
        }
      })
    }else {
      Object.values(this.resetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isLoading = false
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    //进行验证
    let url = '/api/user/checkEmail';
    let params = {
      "email": this.email,
      "token": this.inputValue,
      "type": 2
    };
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
    };
    this.http.post(url,this.transformRequest(params),httpOptions).subscribe((res:any)=> {
      this.isOkLoading = false;
      if (res.code == 200) {
        //跳转到登录界面
        this.isVisible = false;
        this.messageService.create('success', `重置成功！`)
        this.router.navigate(['login']);
      } else if (res.code == 400) {
        this.isVisible = false;
        this.isError = true
        this.errorMessage = res.message
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
