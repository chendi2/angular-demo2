import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import {NzMessageService} from "ng-zorro-antd/message";
import { Router } from '@angular/router';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  email:string = ""
  inviter:string = ""
  imgSrc:any
  ver_key:string = ""
  isError:boolean = false
  errorMessage:string = ""
  isVisible = false;  //对话框显示属性
  isOkLoading = false;  //对话框按钮加载属性
  inputValue: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: NzMessageService,
  ) {
    this.getImgSrc()
  }

  ngOnInit(): void {
  }

  logonForm: FormGroup = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.email
    ]),

    password: new FormControl("",[
      Validators.required,
      Validators.minLength(6)
    ]),

    checkPassword: new FormControl("",[
      Validators.required,
      this.confirmationValidator()
    ]),

    nickname: new FormControl("",[
      Validators.required,
      Validators.minLength(2)
    ]),



    captcha: new FormControl("",[
      Validators.required,
      Validators.minLength(5)
    ]),

    inviter: new FormControl("",[

    ]),
  })


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.logonForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator() : ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return {required: true};
      } else if (control.value !== this.logonForm.controls['password'].value) {
        return {confirm: true, error: true};
      }
      return {};
    }
  };

  transformRequest(data:any) {
    let str = '';
    for (let i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  };


  getImgSrc(){
    this.ver_key = this.getRandomString();
    this.imgSrc =  '/api/user/captcha/' + this.ver_key
  }

  getRandomString() {
    return formatDate(Date.now(), 'mmssSSS','en-US') + Number((Math.random() * 100).toFixed(0))
  }

  onSubmit() {
    if (this.logonForm.valid) {
      let url = '/api/user/logon';
      let data = this.logonForm.value
      let added_data = {"ver_key": this.ver_key}
      let params = Object.assign({}, data, added_data);
      const httpOptions = {
        headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
      };
      this.http.post(url,this.transformRequest(params),httpOptions).subscribe((res:any)=>{
        if (res.code == 200){
          this.isError = false
          this.email = data.email
          this.inviter = data.inviter
          //确认注册响应式表单
          this.showModal()
        }else if (res.code == 400){
          this.getImgSrc()
          this.isError = true
          this.errorMessage = res.message
        }
      })
    } else {
      Object.values(this.logonForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    //进行注册验证
    let url = '/api/user/checkEmail';
    let params = {
      "email": this.email,
      "token": this.inputValue,
      "inviter": this.inviter
    };
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'})
    };
    this.http.post(url,this.transformRequest(params),httpOptions).subscribe((res:any)=> {
      this.isOkLoading = false;
      if (res.code == 200) {
        //跳转到登录界面
        this.isVisible = false;
        this.messageService.create('success', `注册成功！`)
        this.router.navigate(['login']);
      } else if (res.code == 400) {
        this.isVisible = false;
        this.getImgSrc()
        this.isError = true
        this.errorMessage = res.message
      }
    })
  }



  handleCancel(): void {
    this.isVisible = false;
  }

}
