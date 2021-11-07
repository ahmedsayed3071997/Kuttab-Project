import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';
import { ConfirmAddCartComponent } from '../../confirm-add-cart/confirm-add-cart.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  books: any = [];
  user: any =null;
  modal: BsModalRef = new BsModalRef();
  constructor(private api: ApiService,
    private modalService: BsModalService,
    private auth: AuthinticationService) { }

  ngOnInit(): void {
    this.user = this.auth.isLogin;
    this.getBooks();
  }
  getBooks() {
    this.api.getData('book', {discount: 1}).subscribe((res: any) =>{
      this.books = res.body;
    });
  }
  openModalConfirmAddToCart(book: number){
    const initialState = { book };
    this.modal = this.modalService.show(ConfirmAddCartComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
    });
  }

}
