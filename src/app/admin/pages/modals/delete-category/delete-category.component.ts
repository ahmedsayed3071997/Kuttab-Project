import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  category_id: any;
  modal!: BsModalRef;
  public onClose: Subject<any> = new Subject();
  constructor(
    private api: ApiService,
    private modalService: BsModalService) { }
  ngOnInit(): void {
  }

  deleteCategory(){
    this.api.deleteData("category/"+this.category_id,{}).subscribe(data =>{
      this.closeModal();
    })
  }

  closeModal(){
    this.modalService.hide();
  }

}
