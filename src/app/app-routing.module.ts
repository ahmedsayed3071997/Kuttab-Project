import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guard } from './core/guard/guard.guard';

const routes: Routes = [
  { 
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
     canActivate: [ Guard ],
     data: { permission: 'admin' } 
  },
  { 
    path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), 
    canActivate: [ Guard ],
    data: { permission: 'customer' }
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), 
    canActivate: [ Guard ],
    data: { permission: 'auth' } 
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user', pathMatch: 'full' },
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: 'enabled',
    scrollPositionRestoration:'enabled',
    useHash:true,
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
