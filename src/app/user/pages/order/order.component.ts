import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  allCards:any;
  cardNew : boolean = false;
  paymentType: boolean = false;
  payment: boolean= false;
  cardForm!:FormGroup;
  price: any =null;
  paymentForm!:FormGroup;
  address: any = [];
  user: any;
  cardID: any = null;
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(private api:ApiService, private formBuilder: FormBuilder,private auth: AuthinticationService) { }

  ngOnInit(): void {
    this.user = this.auth.user;
    this.getUser();
    this.getData();
    this.cardForm = this.formBuilder.group({
      card_number :['',[Validators.required]],
      holder_name :['',[Validators.required]],
      expire_month :['',[Validators.required]],
      expire_year :['',Validators.required],
      cvv :['',[Validators.required]],
    });
    this.paymentForm = this.formBuilder.group({
      address_id:['', Validators.required],
      payment_type: ['cash', Validators.required],
      card_id: [],
      first_name: ['', [Validators.required, Validators.min(3)]],
      last_name: ['', [Validators.required, Validators.min(3)]],
      first_phone: ['', Validators.required],
      second_phone: ['']
    });
  }

  getData(){
    this.api.postData("cart/clear",{},true).subscribe(data =>{
      var arr:any = localStorage.getItem("carts");
      var cart = JSON.parse(arr);
      for (let i = 0; i < cart.length; i++) {
        this.api.postData("cart",{book_id:cart[i].book.id , number:cart[i].number}).subscribe(data2 =>{
          if((cart.length-1) == i){
            this.api.getData("card").subscribe((data:any) =>{
              this.allCards = data.body;
            });
            this.getPrice();
          }
        })
      }
    })
  }
  get cardFormRef(){ return this.cardForm.controls }
  get paymentFormRef(){ return this.paymentForm.controls }

  addCard(){
    this.api.postData("card",{
      card_number:this.cardFormRef.card_number.value,
      holder_name:this.cardFormRef.holder_name.value,
      expire_month:this.cardFormRef.expire_month.value,
      expire_year:this.cardFormRef.expire_year.value,
      cvv:this.cardFormRef.cvv.value,
    }).subscribe((data: any) =>{
      console.log(data)
      this.paymentForm.get('card_id')?.setValue(data.body[data.body.length - 1].id);
      this.donePay()
    })
  }
  getPrice(){
    this.api.getData('order_price').subscribe((res: any)=>{
      this.price = res.body;
    })
  }
  getUser() {
    this.api.getData('address' ,{user_id: this.user.id}).subscribe((res: any)=>{
      this.address = res.body;
    })
  }
  Next(){
    this.payment = true;
  }
  changePaymentType(type: boolean){
    this.paymentType = type;
    if(type) {
      this.paymentForm.get('payment_type')?.setValue('visa');
      this.paymentForm.get('card_id')?.setValidators(Validators.required);
    } else{
      this.paymentForm.get('payment_type')?.setValue('cash');
      this.paymentForm.get('card_id')?.clearValidators();
    }
    console.log(this.paymentForm)

  }
  pay(){
    if(this.cardID) {
      this.paymentForm.get('card_id')?.setValue(this.cardID);
      this.donePay()
    }
    else if(this.paymentForm.get('payment_type')?.value == 'visa' && this.cardForm.valid){
      this.addCard();
    }else if(this.paymentForm.get('payment_type')?.value == 'cash'){
      this.donePay()
    }

  }
  donePay() {
    let obj: any = {}
    this.paymentForm.get('payment_type')?.value ? obj.payment_type = this.paymentForm.get('payment_type')?.value : null;
    this.paymentForm.get('address_id')?.value ? obj.address_id = this.paymentForm.get('address_id')?.value : null;
    this.paymentForm.get('card_id')?.value ? obj.card_id = this.paymentForm.get('card_id')?.value : null;
    this.paymentForm.get('first_name')?.value ? obj.first_name = this.paymentForm.get('first_name')?.value : null;
    this.paymentForm.get('last_name')?.value ? obj.last_name = this.paymentForm.get('last_name')?.value : null;
    this.paymentForm.get('first_phone')?.value ? obj.first_phone = this.paymentForm.get('first_phone')?.value : null;
    this.paymentForm.get('second_phone')?.value ? obj.second_phone = this.paymentForm.get('second_phone')?.value : null;
    this.api.postData('order', obj).subscribe((res: any)=>{
      localStorage.removeItem("carts");
    })
  }



}
