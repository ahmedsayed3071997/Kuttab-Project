import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-confirm-delete-favourite',
  templateUrl: './confirm-delete-favourite.component.html',
  styleUrls: ['./confirm-delete-favourite.component.scss']
})
export class ConfirmDeleteFavouriteComponent implements OnInit {

  book_id: any;
  modal: BsModalRef = new BsModalRef();
  buttunAdd: any = false;
  public onClose: Subject<any> = new Subject();
  constructor(
    private api: ApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    console.log(this.book_id)
  }
  closeModal(){
    this.modalService.hide();
  }
  deleteFromFavorite() {
    this.buttunAdd = true;
    this.api.deleteData('favorite/' + this.book_id, {} ).subscribe((res: any) => {
      this.closeModal();
    }, (err: any) => {
      this.buttunAdd = false;
    });

  }

}
