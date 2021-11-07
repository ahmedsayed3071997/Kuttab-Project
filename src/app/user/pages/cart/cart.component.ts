import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteCartComponent } from '../confirm-delete-cart/confirm-delete-cart.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any = []
  modal: BsModalRef = new BsModalRef();


  constructor(private api: ApiService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCart();
  }
  getCart(){
    // this.api.getData('cart').subscribe((res: any) =>{
    //   this.cart = res.body;
    // })
    var arr:any = localStorage.getItem("carts");
    this.cart = JSON.parse(arr);
  }
  updateCart(){
    localStorage.setItem("carts",JSON.stringify(this.cart));
  }
  openModalConfirmDeleteFromFavorite(book_id: number) {
    const initialState = { book_id };
    this.modal = this.modalService.show(ConfirmDeleteCartComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      var arr:any = localStorage.getItem("carts");
      this.cart = JSON.parse(arr);
    });
  }


}
