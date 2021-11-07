import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api-service.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {
  autherForm!:FormGroup;
  image:string = '';
  allNationalities:any=[];
  id = this.route.snapshot.paramMap.get('id');
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(private formBuilder:FormBuilder,private api:ApiService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.autherForm = this.formBuilder.group({
      full_name :['',[Validators.required,Validators.minLength(3)]],
      nationality :['',Validators.required],
      // account_number :['',Validators.required],
      description :['',[Validators.required,Validators.minLength(6)]],
      email :['',[Validators.required,Validators.email]],
      phone :['',[Validators.required,Validators.minLength(6)]],
      picture :['',Validators.required],
    });

    if(this.id){
      this.loadData();
    }

    this.getNationalities();

  }
  get autherFormRef(){ return this.autherForm.controls } 
 
  getNationalities(){
    this.api.getData("GetAllNationalities",{},false).subscribe((data:any) =>{
      this.allNationalities = data.body;
    })
  }
  loadData(){
    this.api.getData("writer/"+this.id).subscribe((data:any) =>{
       this.autherFormRef.full_name.setValue(data.body.full_name);
       this.autherFormRef.nationality.setValue(data.body.nationality);
      //  this.autherFormRef.account_number.setValue(data.body.account_number);
       this.autherFormRef.description.setValue(data.body.description);
       this.autherFormRef.email.setValue(data.body.email);
       this.autherFormRef.phone.setValue(data.body.phone);
      this.autherForm.get('picture')?.setValidators([]);
      this.autherForm.get('picture')?.updateValueAndValidity();
      this.image = data.body.photo.path;
      this.autherForm.updateValueAndValidity();
    })
  }


  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length &&
      (event.target.files[0].type== 'image/jpeg' || event.target.files[0].type== 'image/jpg' )) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.autherForm.get('picture')?.setValidators([Validators.required]);
        this.autherForm.get('picture')?.updateValueAndValidity();
        this.image = reader.result as string;
        this.autherFormRef.picture.setValue(file);
        console.log(this.autherFormRef.picture.value);
      };
   
    }
    else{
      this.image = '';
      this.autherFormRef.picture.setValue('');
    }
  }

  addAuthor(){
    const formData = new FormData();
    formData.append("full_name",this.autherFormRef.full_name.value);
    formData.append("nationality",this.autherFormRef.nationality.value);
    // formData.append("account_number",this.autherFormRef.account_number.value);
    formData.append("description",this.autherFormRef.description.value);
    formData.append("email",this.autherFormRef.email.value);
    if((this.autherFormRef.phone.value.number).toString().includes('+')){
      formData.append("phone",this.autherFormRef.phone.value.number.toString());
    } else {
      formData.append("phone",this.autherFormRef.phone.value.dialCode + this.autherFormRef.phone.value.number.toString());
    }
    if(this.autherFormRef.picture.value){
      formData.append("picture",this.autherFormRef.picture.value,this.autherFormRef.picture.value.name);
    }
    this.api.postData("writer",formData ,true,true,'', {'content-type':null}).subscribe(data =>{
      this.router.navigate(['/admin/all-author']);
    })
}

editAuthor(){
  const formData = new FormData();
  formData.append("full_name",this.autherFormRef.full_name.value);
  formData.append("nationality",this.autherFormRef.nationality.value);
  // formData.append("account_number",this.autherFormRef.account_number.value);
  formData.append("description",this.autherFormRef.description.value);
  formData.append("email",this.autherFormRef.email.value);
  if((this.autherFormRef.phone.value.number).toString().includes('+')){
    formData.append("phone",this.autherFormRef.phone.value.number.toString());
  } else {
    formData.append("phone",this.autherFormRef.phone.value.dialCode + this.autherFormRef.phone.value.number.toString());
  }
  if(this.autherFormRef.picture.value){
    formData.append("picture",this.autherFormRef.picture.value,this.autherFormRef.picture.value.name);
  }
  this.api.postData("writer/"+this.id,formData ,true,true,'', {'content-type':null}).subscribe(data =>{
    this.router.navigate(['/admin/all-author']);
  })
}

}
