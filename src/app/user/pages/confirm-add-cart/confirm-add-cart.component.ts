import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'angular-alert-module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/http/api-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-confirm-add-cart',
  templateUrl: './confirm-add-cart.component.html',
  styleUrls: ['./confirm-add-cart.component.scss']
})
export class ConfirmAddCartComponent implements OnInit {
  book: any;
  modal: BsModalRef = new BsModalRef();
  countBook: any = null;
  buttunAdd: any = false;
  public onClose: Subject<any> = new Subject();
  constructor(
    private api: ApiService,
    private modalService: BsModalService,
    private alerts: AlertsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.book)
  }
  closeModal(){
    this.modalService.hide();
  }
  addToCart() {
    this.buttunAdd = true;
    if(this.countBook > 0) {
      var books:any = [];
      if(localStorage.getItem("carts")){
        var arr:any = localStorage.getItem("carts");
        books = JSON.parse(arr);
      }
      console.log(books);
      if(this.book.number_of_copies >= this.countBook){
        books.push({book: this.book, number: this.countBook});
        localStorage.setItem("carts",JSON.stringify(books));
        this.closeModal();
      }
      else{
        this.toastr.error(this.book.number_of_copies+' الرجاء اضافه عدد نسخ اقل من ');
        this.buttunAdd = false;
      }
      
      // this.api.postData('cart', {book_id: this.book_id, number: this.countBook}).subscribe((res: any) => {
      //   this.closeModal();
      // })
    } else{
      this.buttunAdd = false;
      this.toastr.error('الرجاء اضافه عدد النسخ');
      // this.alerts.setMessage('الرجاء اضافه عدد النسخ','error');
    }

  }

}
