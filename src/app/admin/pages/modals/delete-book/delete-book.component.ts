import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  book_id: any;
  modal!: BsModalRef;
  public onClose: Subject<any> = new Subject();

  constructor(private api: ApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  deleteBook(){
    this.api.deleteData("book/"+this.book_id,{}).subscribe((data: any) =>{
      this.closeModal()
    })
  }
  closeModal(){
    this.modalService.hide();
  }


}
