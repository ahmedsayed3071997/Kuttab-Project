import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-confirm-add-favourite',
  templateUrl: './confirm-add-favourite.component.html',
  styleUrls: ['./confirm-add-favourite.component.scss']
})
export class ConfirmAddFavouriteComponent implements OnInit {
  book_id: any;
  modal: BsModalRef = new BsModalRef();
  buttunAdd: any = false;
  public onClose: Subject<any> = new Subject();
  constructor(
    private api: ApiService,
    private modalService: BsModalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.book_id)
  }
  closeModal(){
    this.modalService.hide();
  }
  addToFavorite() {
    this.buttunAdd = true;
    this.api.postData('favorite', {book_id: this.book_id}).subscribe((res: any) => {
      // this.toastr.success('تم الاضافه الى سله المشتريات بنجاح');
      this.closeModal();
    }, (err: any) => {
      this.buttunAdd = false;
    });

  }

}
