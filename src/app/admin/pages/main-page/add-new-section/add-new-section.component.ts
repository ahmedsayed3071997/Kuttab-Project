import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-add-new-section',
  templateUrl: './add-new-section.component.html',
  styleUrls: ['./add-new-section.component.scss']
})
export class AddNewSectionComponent implements OnInit {
  categoryForm!:FormGroup;
  image!:string;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private formBuilder:FormBuilder,private api:ApiService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name :['',[Validators.required,Validators.minLength(3)]],
      description :['',[Validators.required, Validators.minLength(6)]],
      picture:['',Validators.required]
    });

    console.log(this.id);
    
    if(this.id){
      this.loadData();
    }
  }
  get categoryFormRef(){ return this.categoryForm.controls } 

  loadData(){
    this.api.getData("category/"+this.id).subscribe((data:any) =>{
      this.categoryFormRef.name.setValue(data.body.name);
      this.categoryFormRef.description.setValue(data.body.description);
      this.categoryForm.get('picture')?.setValidators([]);
      this.categoryForm.get('picture')?.updateValueAndValidity();
      this.image = data.body.photo.path;
      this.categoryForm.updateValueAndValidity();
    })
  }

  addCategory(){
    const formData = new FormData();
    formData.append("name",this.categoryFormRef.name.value);
    formData.append("description",this.categoryFormRef.description.value);
    formData.append("picture",this.categoryFormRef.picture.value,this.categoryFormRef.picture.value.name);
    this.api.postData("category",formData,true,true,'',{'content-type' : null}).subscribe(data =>{
      this.router.navigate(['/admin/all-section']);
    })
  }
  editCategory(){
    const formData = new FormData();
    formData.append("name",this.categoryFormRef.name.value);
    formData.append("description",this.categoryFormRef.description.value);
    if(this.categoryFormRef.picture.value){
      formData.append("picture",this.categoryFormRef.picture.value,this.categoryFormRef.picture.value.name);
    }
    this.api.postData("category/"+this.id,formData,true,true,'',{'content-type' : null}).subscribe(data =>{
      this.router.navigate(['/admin/all-section']);
    })
  }

  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length && 
      (event.target.files[0].type== 'image/jpeg' || event.target.files[0].type== 'image/jpg' )) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
        this.categoryForm.get('picture')?.setValidators([Validators.required]);
        this.categoryForm.get('picture')?.updateValueAndValidity();
        this.categoryFormRef.picture.setValue(file);
        console.log(this.categoryFormRef.picture.value);
      };
    }
    else{
      this.image = '';
      this.categoryFormRef.picture.setValue('');
    }
  }
}