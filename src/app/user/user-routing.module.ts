import { AutherComponent } from './pages/auther/auther.component';
import { BookComponent } from './pages/book/book.component';
import { SectionBookComponent } from './pages/section-book/section-book.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserGuard } from './core/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalProfileComponent } from './pages/profile/personal-profile/personal-profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { MasterCardComponent } from './pages/profile/master-card/master-card.component';
import { MyAdddressComponent } from './pages/profile/my-adddress/my-adddress.component';
import { PurchasesComponent } from './pages/profile/purchases/purchases.component';
import { MyFavoriteComponent } from './pages/profile/my-favorite/my-favorite.component';
import { CartComponent } from './pages/cart/cart.component';
import { AddAddressComponent } from './pages/profile/add-address/add-address.component';
import { AddMasterCardComponent } from './pages/profile/add-master-card/add-master-card.component';
import { AllSectionsComponent } from './pages/all-sections/all-sections.component';
import { AllOffersComponent } from './pages/all-offers/all-offers.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent ,
    children:[
      {
      path:'',
      component: HomeComponent
      },{
        path:'home',component: HomeComponent
      },{
        path:'all-sections', component: AllSectionsComponent
      },{
        path:'section-book/:id', component: SectionBookComponent
      },{
        path:'book/:id', component: BookComponent
      },{
        path:'auther/:id', component: AutherComponent
      },{
        path:'cart',
        component: CartComponent,
       // canActivate:[UserGuard]
      },{
        path:'offers', component: AllOffersComponent
      },{
        path:'infromation', component: TermsAndConditionsComponent
      },{
        path:'order' ,
        component:OrderComponent,
        canActivate:[UserGuard]
      },{
        path:'profile',
        component: ProfileComponent,
        canActivate:[UserGuard],
        children:[
          {path:'' , component:PersonalProfileComponent},
          {path:'edit' , component:EditProfileComponent},
          {path:'credit-card' , component:MasterCardComponent},
          {path:'add-credit-card' , component:AddMasterCardComponent},
          {path:'address' , component:MyAdddressComponent},
          {path:'add-address' , component:AddAddressComponent},
          {path:'add-address/:id' , component:AddAddressComponent},
          {path:'purchases' , component:PurchasesComponent},
          {path:'myFavorite' , component:MyFavoriteComponent},

        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
