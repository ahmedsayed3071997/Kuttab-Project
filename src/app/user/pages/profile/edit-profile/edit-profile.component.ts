import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmedPassword } from 'src/app/auth/pages/register/validator';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user:any = this.auth.user;
  profileForm!:FormGroup;
  constructor(private api:ApiService,private auth:AuthinticationService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      first_name :[this.user.first_name,[Validators.required,Validators.minLength(3)]],
      last_name :[this.user.last_name,[Validators.required,Validators.minLength(3)]],
      email :[this.user.email,[Validators.required,Validators.email]],
      password :['',[Validators.required]],
      confirm_password :['',[Validators.required]],
      phone :[this.user.phone,[Validators.required]],
    },{
      validator: confirmedPassword('password', 'confirm_password')
    });
  }
  get profileFormRef(){ return this.profileForm.controls } 
  editProfile(){
    let obj:any = {};
    obj['first_name'] = this.profileFormRef.first_name.value;
    obj['last_name'] = this.profileFormRef.last_name.value;
    obj['email'] = this.profileFormRef.email.value;
    obj['password'] = this.profileFormRef.password.value;
    //obj['password_confirmation'] =  this.profileFormRef.confirm_password.value;
    obj['phone'] = '966'+ (this.profileFormRef.phone.value).toString();
    this.api.postData("user/"+this.user.id,obj).subscribe((data:any) =>{
      this.auth.role.next(data.body)
    })
  }
}
