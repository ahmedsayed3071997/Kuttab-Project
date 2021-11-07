import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private auth:AuthinticationService,private api:ApiService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.role.getValue()?.role){
        return true;
       }
       else if ((!this.auth.role.getValue()?.role && !localStorage.getItem("token"))){
         this.router.navigate(["/auth"]);
        return false;
       }
      else if (!this.auth.role.getValue()?.role && localStorage.getItem("token")){
          return this.api.getData("auth",true,true,true).pipe(
             map((data:any) =>{            
               this.auth.role.next(data);
               return true;
           }))
         }
    return false;
  }
  
}
