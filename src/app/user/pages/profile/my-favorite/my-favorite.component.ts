import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/core/http/api-service.service';
import { ConfirmDeleteFavouriteComponent } from '../../confirm-delete-favourite/confirm-delete-favourite.component';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.scss']
})
export class MyFavoriteComponent implements OnInit {
  favourites: any = [];
  modal: BsModalRef = new BsModalRef();

  constructor(private api: ApiService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getMyFavourite();
  }
  getMyFavourite(){
    this.api.getData('favorite').subscribe((res: any) =>{
      this.favourites = res.body;
    })
  }
  openModalConfirmDeleteFromFavorite(book_id: number) {
    const initialState = { book_id };
    this.modal = this.modalService.show(ConfirmDeleteFavouriteComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getMyFavourite();
    });
  }

}
