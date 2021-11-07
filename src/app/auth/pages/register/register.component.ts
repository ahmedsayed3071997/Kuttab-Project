import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs/operators';
import {AuthinticationService} from '../services/authintication.service'
import { confirmedPassword } from './validator';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signinForm!:FormGroup;
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(private formBuilder:FormBuilder,private auth:AuthinticationService) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      first_name :['',[Validators.required,Validators.minLength(3)]],
      last_name :['',[Validators.required,Validators.minLength(3)]],
      email :['',[Validators.required,Validators.email]],
      password :['',[Validators.required]],
      confirm_password :['',[Validators.required]],
      phone :['',[Validators.required]],
      gender :['',[Validators.required]]
    },{
      validator: confirmedPassword('password', 'confirm_password')
    });
  }
  get signinFormRef(){ return this.signinForm.controls } 
  register(){    
    this.signinForm.markAllAsTouched();
    if(this.signinForm.valid){
      this.auth.register(this.signinFormRef);
    }
    
  }
}
