import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './pages/header/header.component';
import { SubHeaderComponent } from './pages/sub-header/sub-header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ControlBoardComponent } from './pages/main-page/control-board/control-board.component';
import { AddBookComponent } from './pages/main-page/add-book/add-book.component';
import { AllBookComponent } from './pages/main-page/all-book/all-book.component';
import { AllSectionsComponent } from './pages/main-page/all-sections/all-sections.component';
import { AllAuthorComponent } from './pages/main-page/all-author/all-author.component';
import { AddAuthorComponent } from './pages/main-page/add-author/add-author.component';
import { AddNewSectionComponent } from './pages/main-page/add-new-section/add-new-section.component';
import { StatisticsComponent } from './pages/main-page/statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from '../core/http/api-service.service';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { DeleteCardComponent } from './pages/modals/delete-card/delete-card.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AdvertisingComponent } from './pages/main-page/advertising/advertising.component';
import { DeleteBookComponent } from './pages/modals/delete-book/delete-book.component';
import { DeleteCategoryComponent } from './pages/modals/delete-category/delete-category.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SubHeaderComponent,
    MainPageComponent,
    ControlBoardComponent,
    AddBookComponent,
    AllBookComponent,
    AllSectionsComponent,
    AddAuthorComponent,
    AddNewSectionComponent,
    StatisticsComponent,
    AllAuthorComponent,
    DeleteCardComponent,
    AdvertisingComponent,
    DeleteBookComponent,
    DeleteCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    ModalModule.forRoot(),
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgxIntlTelInputModule
  ],
  entryComponents:[
    DeleteCardComponent
  ],
  providers:[ApiService,BsModalService]
})
export class AdminModule { }
