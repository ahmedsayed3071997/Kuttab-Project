import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/core/http/api-service.service';
import { DeleteCategoryComponent } from '../../modals/delete-category/delete-category.component';

@Component({
  selector: 'app-all-sections',
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.scss']
})
export class AllSectionsComponent implements OnInit {
  allCategoryData:any = [];
  modal!: BsModalRef;

  constructor(private api:ApiService,private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }


  getAllCategory(){
    this.api.getData<any>("category").subscribe(data =>{
      this.allCategoryData = data.body;
    })
  }

  deleteCategory(category_id:any){
    const initialState = { category_id:category_id };
    this.modal = this.modalService.show(DeleteCategoryComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getAllCategory();
    });
  }
}
