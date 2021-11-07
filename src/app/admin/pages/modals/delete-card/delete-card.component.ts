import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent implements OnInit {

  author_id: any;
  modal!: BsModalRef;
  public onClose: Subject<any> = new Subject();
  constructor(
    private api: ApiService,
    private modalService: BsModalService) { }
  ngOnInit(): void {
  }

  deleteAuthor(){
    this.api.postData("writer/delete/"+this.author_id,{}).subscribe(data =>{
      this.closeModal();
    })
  }

  closeModal(){
    this.modalService.hide();
  }

}
