import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/http/api-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmAddCartComponent } from '../confirm-add-cart/confirm-add-cart.component';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  modal: BsModalRef = new BsModalRef();
  idBook: any = null ;
  book: any ;
  user: any =null;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private auth: AuthinticationService) { }

  ngOnInit(): void {
    this.user = this.auth.isLogin;
    this.route.params.subscribe(params => {
      this.idBook = +params['id'];
      this.getBooksByCategoryID();
    });
  }
  getBooksByCategoryID() {
    this.api.getData('book/' + this.idBook ).subscribe((res: any) =>{
      this.book = res.body;
    })
  }
  openModalConfirmAddToCart(book: number){
    const initialState = { book };
    this.modal = this.modalService.show(ConfirmAddCartComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {

    });
  }
}
