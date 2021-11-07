import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-my-adddress',
  templateUrl: './my-adddress.component.html',
  styleUrls: ['./my-adddress.component.scss']
})
export class MyAdddressComponent implements OnInit {
  user: any = null;
  address: any = null;
  idAddress: any =null;
  constructor(
    private api: ApiService,
    private auth: AuthinticationService,
    public modalService: BsModalService) { }

  ngOnInit(): void {
    this.user = this.auth.user;
    this.getUser();
  }
  getUser() {
    this.api.getData('address' ,{user_id: this.user.id}).subscribe((res: any)=>{
      this.address = res.body;
    })
  }
  deleteAdress(){
    this.api.deleteData('address/'+ this.idAddress, {}).subscribe((res)=>{
      this.getUser();
      this.closeModal();
    })
  }

  closeModal(){
    this.modalService.hide();
  }

}
