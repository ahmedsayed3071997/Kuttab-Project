import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatRadioModule} from '@angular/material/radio';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from '../core/http/api-service.service';
import { AuthinticationService } from './pages/services/authintication.service';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatRadioModule,
    SharedModule,
    NgxIntlTelInputModule
  ]
  ,
  providers:[ApiService,AuthinticationService]
})
export class AuthModule { }
