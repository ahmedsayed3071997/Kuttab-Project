import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-confirm-delete-cart',
  templateUrl: './confirm-delete-cart.component.html',
  styleUrls: ['./confirm-delete-cart.component.scss']
})
export class ConfirmDeleteCartComponent implements OnInit {


  book_id: any;
  modal: BsModalRef = new BsModalRef();
  buttunAdd: any = false;
  public onClose: Subject<any> = new Subject();
  constructor(
    private api: ApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.modalService.hide();
  }
  addToFavorite() {
    var arr:any = localStorage.getItem("carts");
    var cart = JSON.parse(arr);
    cart = cart.filter((x:any)=>{return x.book.id != this.book_id});
    localStorage.setItem("carts",JSON.stringify(cart));
    console.log(cart);
    console.log(this.book_id);
    this.closeModal();
  }
}
