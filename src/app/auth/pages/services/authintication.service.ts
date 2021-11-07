import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/http/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinticationService {
  public role:any = new BehaviorSubject({});

  constructor(private api:ApiService,private router:Router) { }

  login(loginRef:any){
    let obj:any = {};
    obj['common'] = loginRef.email.value;
    obj['password'] = loginRef.password.value;
    this.api.postData("login",obj,false).subscribe((data:any) =>{
      localStorage.setItem("token",data.body.token);      
      if(data.body.role == 'customer'){
        this.router.navigate(['user']);
      }
      if(data.body.role == 'admin'){
        this.router.navigate(['admin']);
      }
    })
  }

  register(signinFormRef:any){
    let obj:any = {};
    obj['first_name'] = signinFormRef.first_name.value;
    obj['last_name'] = signinFormRef.last_name.value;
    obj['email'] = signinFormRef.email.value;
    obj['password'] = signinFormRef.password.value;
    obj['password_confirmation'] = signinFormRef.confirm_password.value;
    if((signinFormRef.phone.value.number).toString().includes('+')){
      obj['phone'] = (signinFormRef.phone.value.number).toString();
    } else {
      obj['phone'] = (signinFormRef.phone.value.dialCode + signinFormRef.phone.value.number).toString();

    }
    obj['gender'] = signinFormRef.gender.value;
    this.api.postData("register",obj,false).subscribe((data:any) =>{
      localStorage.setItem("token",data.body.token);
      if(data.body.role == 'customer'){
        this.router.navigate(['user']);
      }
      if(data.body.role == 'admin'){
        this.router.navigate(['admin']);
      }
    })
  }

  forgetPassword(forgetPasswordFormRef:any){
    this.api.postData("forgot_password",{email:forgetPasswordFormRef.email.value},false,true).subscribe(data =>{
      this.router.navigate(['/auth/login']);
    })
  }
   logout(){
    this.api.postData("logout",{}).subscribe(data =>{
      localStorage.removeItem("token");
      this.role.next(null);
      console.log(this.role.getValue());
      
      this.router.navigate(['auth'])
    })
  }

  get isLogin():boolean{
    return localStorage.getItem("token") !== null;
  }
  get isAdmin(){
    return  this.role.getValue()?.role == 'admin';
  }
  get user(){
    return  this.role.getValue();
  }
}
