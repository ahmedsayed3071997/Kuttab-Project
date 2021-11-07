import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addressForm!:FormGroup ;
  countries: any;
  cites: any;
  idAddress: any = null;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthinticationService) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      user_id: [this.auth.user.id],
      address :['',[Validators.required]],
      country :['',[Validators.required]],
      city :['',[Validators.required]],
      region :['',[Validators.required]],
      zip :['', [Validators.required]],
    });
    this.getCountries();
    this.route.params.subscribe(params => {
      this.idAddress = +params['id'];
      this.idAddress ? this.getAddress(): null;
    });
  }
  get addressFormRef(){ return this.addressForm.controls }
  getAddress(){
    this.api.getData('address/' + this.idAddress ,  { user_id: this.auth.user.id}).subscribe((res: any) => {
      let address: any = res.body;
      this.addressForm.get('country')?.setValue(address.country);
      this.gitCityes();
      this.addressForm.get('city')?.setValue(address.city);
      this.addressForm.get('region')?.setValue(address.region);
      this.addressForm.get('address')?.setValue(address.address);
      this.addressForm.get('zip')?.setValue(address.zip);
      console.log(this.addressForm)
    })
  }
  getCountries(){
    this.http.get('https://countriesnow.space/api/v0.1/countries').subscribe((res: any) => {
      this.countries = res.data;
      console.log(this.countries)
    })

  }
  gitCityes(){
    this.http.post('https://countriesnow.space/api/v0.1/countries/cities', {country: this.addressForm.get('country')?.value}).subscribe((res: any)=>{
      this.cites = res.data;
    })
  }
  addAdress(){
    if(this.addressForm.valid){
      this.api.postData('address' + (this.idAddress ? '/' + this.idAddress : ''), this.addressForm.value).subscribe((res: any) => {
        this.router.navigate(['/user/profile/address']);
      })
    }
  }

}
