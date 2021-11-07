import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/http/api-service.service';
import { DeleteCardComponent } from '../../modals/delete-card/delete-card.component';

@Component({
  selector: 'app-all-author',
  templateUrl: './all-author.component.html',
  styleUrls: ['./all-author.component.scss']
})
export class AllAuthorComponent implements OnInit {
  modal!: BsModalRef;
  allAuthor :any = [];
  constructor(private api:ApiService,private ngxService: NgxUiLoaderService,private modalService:BsModalService) { }

  ngOnInit(): void {
   this.getData("");
  }

  getData(name:any){
    this.api.getData("writer",{name:name},true,true).subscribe((data:any) =>{
      this.allAuthor = data.body;
    })
  }


  openModalDeleteAuthor(author_id: number) {
    const initialState = { author_id:author_id };
    this.modal = this.modalService.show(DeleteCardComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getData("");
    });
  }

}
