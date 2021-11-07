import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from '../http/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {
  constructor(private auth:AuthinticationService,private api:ApiService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //  return true;
    if(route.data.permission == 'admin'){
      if (!this.auth.role.getValue()?.role && localStorage.getItem("token")){
        return this.api.getData("auth",true,true,true).pipe(
           map((data:any) =>{            
             this.auth.role.next(data);
             if(data.role =='admin'){
               return true;
             }
             else{
              this.router.navigate(['/user']);
             }
            return false;
         }))
       }
       if(this.auth.role.getValue()?.role == 'admin'){
        return true;
       }
       else if ((!this.auth.role.getValue()?.role && !localStorage.getItem("token"))){
        this.router.navigate(['/user']);
       }
    }

    else if(route.data.permission == 'customer'){
      if (!this.auth.role.getValue()?.role && localStorage.getItem("token")){
        return  this.api.getData("auth",true,true,true).pipe(
          map((data:any) =>{            
            this.auth.role.next(data);
            return true;
        }))
      }
      return true;
    }
    else if(route.data.permission == 'auth'){
      if(!localStorage.getItem("token")) return true;
    }
    return false;
  }
}
