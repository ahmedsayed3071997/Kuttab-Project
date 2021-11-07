import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-add-master-card',
  templateUrl: './add-master-card.component.html',
  styleUrls: ['./add-master-card.component.scss']
})
export class AddMasterCardComponent implements OnInit {

  cardForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      card_number :['',[Validators.required]],
      holder_name :['',[Validators.required]],
      expire_month :['',[Validators.required]],
      expire_year :['',Validators.required],
      cvv :['',[Validators.required]],
    });
  }
  get cardFormRef(){ return this.cardForm.controls } 
  
  addCard(){    
    this.api.postData("card",{
      card_number:this.cardFormRef.card_number.value,
      holder_name:this.cardFormRef.holder_name.value,
      expire_month:this.cardFormRef.expire_month.value,
      expire_year:this.cardFormRef.expire_year.value,
      cvv:this.cardFormRef.cvv.value,
    }).subscribe(data =>{
      this.router.navigate(['/user/profile/credit-card']);
    })
  }

}
