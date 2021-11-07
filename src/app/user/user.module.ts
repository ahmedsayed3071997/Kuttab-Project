import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderHomeComponent } from './pages/home/header-home/header-home.component';
import { SectionsComponent } from './pages/home/sections/sections.component';
import { BestsellerComponent } from './pages/home/bestseller/bestseller.component';
import { RecentAddedComponent } from './pages/home/recent-added/recent-added.component';
import { OffersComponent } from './pages/home/offers/offers.component';
import { BookComponent } from './pages/book/book.component';
import { AutherComponent } from './pages/auther/auther.component';
import { SectionBookComponent } from './pages/section-book/section-book.component';
import { CartComponent } from './pages/cart/cart.component';
import { SimilarBooksComponent } from './pages/book/similar-books/similar-books.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalProfileComponent } from './pages/profile/personal-profile/personal-profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { MasterCardComponent } from './pages/profile/master-card/master-card.component';
import { MyAdddressComponent } from './pages/profile/my-adddress/my-adddress.component';
import { PurchasesComponent } from './pages/profile/purchases/purchases.component';
import { MyFavoriteComponent } from './pages/profile/my-favorite/my-favorite.component';
import { ConfirmAddCartComponent } from './pages/confirm-add-cart/confirm-add-cart.component';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



import { AlertsModule } from 'angular-alert-module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmAddFavouriteComponent } from './pages/confirm-add-favourite/confirm-add-favourite.component';
import { ConfirmDeleteFavouriteComponent } from './pages/confirm-delete-favourite/confirm-delete-favourite.component';
import { ConfirmDeleteCartComponent } from './pages/confirm-delete-cart/confirm-delete-cart.component';
import { ApiService } from '../core/http/api-service.service';
import { AddAddressComponent } from './pages/profile/add-address/add-address.component';
import { AddMasterCardComponent } from './pages/profile/add-master-card/add-master-card.component';
import { from } from 'rxjs';
import { AllSectionsComponent } from './pages/all-sections/all-sections.component';
import { AllOffersComponent } from './pages/all-offers/all-offers.component';
import { ConfirmDeleteCardComponent } from './pages/confirm-delete-card/confirm-delete-card.component';
import { GetAdvertisingComponent } from './pages/home/get-advertising/get-advertising.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { OrderComponent } from './pages/order/order.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';







@NgModule({
  declarations: [
    UserComponent,
    ToolbarComponent,
    FooterComponent,
    HomeComponent,
    HeaderHomeComponent,
    SectionsComponent,
    BestsellerComponent,
    RecentAddedComponent,
    OffersComponent,
    BookComponent,
    AutherComponent,
    SectionBookComponent,
    CartComponent,
    SimilarBooksComponent,
    ProfileComponent,
    PersonalProfileComponent,
    EditProfileComponent,
    MasterCardComponent,
    MyAdddressComponent,
    PurchasesComponent,
    MyFavoriteComponent,
    ConfirmAddCartComponent,
    ConfirmAddFavouriteComponent,
    ConfirmDeleteFavouriteComponent,
    ConfirmDeleteCartComponent,
    AddAddressComponent,
    AddMasterCardComponent,
    AllSectionsComponent,
    AllOffersComponent,
    ConfirmDeleteCardComponent,
    GetAdvertisingComponent,
    TermsAndConditionsComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ModalModule.forRoot(),
    AlertsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
    }),
    MatTooltipModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxIntlTelInputModule

  ],
  providers: [BsModalService,ApiService]
})
export class UserModule { }
