import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from '../http/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouteModuleService {

  constructor(private router:Router,private api:ApiService,private auth:AuthinticationService) { 
  }
}
