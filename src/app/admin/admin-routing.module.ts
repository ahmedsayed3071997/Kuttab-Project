import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddAuthorComponent } from './pages/main-page/add-author/add-author.component';
import { AddBookComponent } from './pages/main-page/add-book/add-book.component';
import { AddNewSectionComponent } from './pages/main-page/add-new-section/add-new-section.component';
import { AdvertisingComponent } from './pages/main-page/advertising/advertising.component';
import { AllAuthorComponent } from './pages/main-page/all-author/all-author.component';
import { AllBookComponent } from './pages/main-page/all-book/all-book.component';
import { AllSectionsComponent } from './pages/main-page/all-sections/all-sections.component';
import { ControlBoardComponent } from './pages/main-page/control-board/control-board.component';
import { StatisticsComponent } from './pages/main-page/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: AdminComponent ,children:[
    {path:'control-board' , component:ControlBoardComponent},
    {path:'add-book' , component:AddBookComponent},
    {path:'edit-book/:id' , component:AddBookComponent},
    {path:'add-section' , component:AddNewSectionComponent},
    {path:'edit-section/:id' , component:AddNewSectionComponent},
    {path:'all-author' , component:AllAuthorComponent},
    {path:'add-author' , component:AddAuthorComponent},
    {path:'edit-author/:id' , component:AddAuthorComponent},
    {path:'statisties' , component:StatisticsComponent},
    {path:'all-book' , component:AllBookComponent},
    {path:'all-section' , component:AllSectionsComponent},
    {path: 'advertising', component: AdvertisingComponent},
    {path: '', redirectTo: 'control-board', pathMatch: 'full' },
  { path: '**', redirectTo: 'control-board', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
