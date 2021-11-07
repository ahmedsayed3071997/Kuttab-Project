import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/core/http/api-service.service';
import { ConfirmDeleteCardComponent } from '../../confirm-delete-card/confirm-delete-card.component';

@Component({
  selector: 'app-master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.scss']
})
export class MasterCardComponent implements OnInit {
  allCards:any;
  modal!:BsModalRef;
  constructor(private api:ApiService,private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.api.getData("card").subscribe((data:any) =>{
      this.allCards = data.body;
    })
  }

  openModalDeleteCard(card_id: number) {
    const initialState = { card_id:card_id };
    this.modal = this.modalService.show(ConfirmDeleteCardComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getData();
    });
  }
}
