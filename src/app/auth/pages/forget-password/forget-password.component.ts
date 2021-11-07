import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api-service.service';
import { AuthinticationService } from '../services/authintication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private auth:AuthinticationService,private http: HttpClient,private api:ApiService) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email :['',Validators.required],
    });
  }
  get forgetPasswordFormRef(){ return this.forgetPasswordForm.controls } 

  forgerPassword(){
    this.auth.forgetPassword(this.forgetPasswordFormRef);
  }

}
