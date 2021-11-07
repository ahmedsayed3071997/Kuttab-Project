import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';
import { ConfirmAddCartComponent } from '../confirm-add-cart/confirm-add-cart.component';
import { ConfirmAddFavouriteComponent } from '../confirm-add-favourite/confirm-add-favourite.component';
import { ConfirmDeleteFavouriteComponent } from '../confirm-delete-favourite/confirm-delete-favourite.component';

@Component({
  // selector: 'app-offers-2',
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.scss']
})
export class AllOffersComponent implements OnInit {
  books: any = [];
  user: any =null;
  modal: BsModalRef = new BsModalRef();

  constructor(
    private api: ApiService,
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
  openModalConfirmAddToFavorite(book_id: number) {
    const initialState = { book_id };
    this.modal = this.modalService.show(ConfirmAddFavouriteComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getBooks();
    });
  }
  openModalConfirmDeleteFromFavorite(book_id: number) {
    const initialState = { book_id };
    this.modal = this.modalService.show(ConfirmDeleteFavouriteComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getBooks();
    });
  }
  handleEvent(e: any){
    console.log(e);
  }

}
