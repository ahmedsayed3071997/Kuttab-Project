import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/http/api-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmAddCartComponent } from '../confirm-add-cart/confirm-add-cart.component';
import { ConfirmAddFavouriteComponent } from '../confirm-add-favourite/confirm-add-favourite.component';
import { ConfirmDeleteFavouriteComponent } from '../confirm-delete-favourite/confirm-delete-favourite.component';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
@Component({
  selector: 'app-writer',
  templateUrl: './auther.component.html',
  styleUrls: ['./auther.component.scss']
})
export class AutherComponent implements OnInit {
  modal: BsModalRef = new BsModalRef();
  idAuther: any = null ;
  auther: any = []
  books: any = [];
  user: any =null;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private auth: AuthinticationService) { }

  ngOnInit(): void {
    this.user = this.auth.isLogin;
    this.idAuther = this.route.snapshot.paramMap.get('id');
    this.getAuther();
    this.getBooksByautherID();
  }
  getAuther() {
    this.api.getData('writer/' + this.idAuther).subscribe((res: any) =>{
      this.auther = res.body;
    });
  }
  getBooksByautherID() {
    this.api.getData('book', {author_id: this.idAuther}).subscribe((res: any) =>{
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
      this.getBooksByautherID();
    });
  }
  openModalConfirmDeleteFromFavorite(book_id: number) {
    const initialState = { book_id };
    this.modal = this.modalService.show(ConfirmDeleteFavouriteComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getBooksByautherID();
    });
  }

}
