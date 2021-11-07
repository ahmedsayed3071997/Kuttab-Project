import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-confirm-delete-card',
  templateUrl: './confirm-delete-card.component.html',
  styleUrls: ['./confirm-delete-card.component.scss']
})
export class ConfirmDeleteCardComponent implements OnInit {

  card_id: any;
  modal!: BsModalRef;
  public onClose: Subject<any> = new Subject();
  constructor(
    private api: ApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.modalService.hide();
  }
  deleteCard() {
    this.api.deleteData('card/' + this.card_id, {}).subscribe((res: any) => {
      this.closeModal();
    });
  }
}
