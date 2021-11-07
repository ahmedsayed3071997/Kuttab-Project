import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api-service.service';
import { AuthinticationService } from '../services/authintication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private auth:AuthinticationService,private http: HttpClient,private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email :['',[Validators.required,Validators.email]],
      password :['',Validators.required],
    });
  }
  get loginFormRef(){ return this.loginForm.controls } 
  login(){    
    this.auth.login(this.loginFormRef);
  }
}
