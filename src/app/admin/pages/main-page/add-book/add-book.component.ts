import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  addBookForm!:FormGroup;
  allAuthorData:any = [];
  allCategoryData:any = [];
  image:string = '';
  id = this.route.snapshot.paramMap.get('id');

  constructor(private formBuilder:FormBuilder,private api:ApiService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      name :['',[Validators.required,Validators.minLength(3)]],
      author_id :['',Validators.required],
      category_id :['',Validators.required],
      number_of_copies :['',[Validators.required, Validators.max(6)]],
      version :['',Validators.required],
      price :['',[Validators.required, Validators.max(6)]],
      picture :['',Validators.required],
      discount :[''],
      description :['',[Validators.required, Validators.minLength(6)]],
      publish_house:['',Validators.required],
      closing_date:[''],
    });
    this.addBookForm.get("discount")?.valueChanges.subscribe(data =>{
      if(data){
        this.addBookForm.get('closing_date')?.setValidators([Validators.required]);
        this.addBookForm.get('closing_date')?.updateValueAndValidity();
      }
      else{
        this.addBookForm.get('closing_date')?.setValidators([]);
        this.addBookForm.get('closing_date')?.updateValueAndValidity();
      }
    })
    this.getAllCategory();
    this.getAllAuthor();
    if(this.id){
      this.loadData();
    }
  }
  get addBookFormRef(){ return this.addBookForm.controls }
  loadData(){
    this.api.getData("book/"+this.id).subscribe((data:any) =>{
      this.addBookFormRef.name.setValue(data.body.name);
      this.addBookFormRef.author_id.setValue(data.body.author_id);
      this.addBookFormRef.category_id.setValue(data.body.category_id);
      this.addBookFormRef.number_of_copies.setValue(data.body.number_of_copies);
      this.addBookFormRef.version.setValue(data.body.version);
      this.addBookFormRef.price.setValue(data.body.price);
      this.addBookFormRef.description.setValue(data.body.description);
      if(data.body.discount !=="0")this.addBookFormRef.discount.setValue(data.body.discount);
      this.addBookFormRef.publish_house.setValue(data.body.publish_house);
      this.addBookFormRef.closing_date.setValue(new Date(data.body.closing_date));
      this.addBookForm.get('picture')?.setValidators([]);
      this.addBookForm.get('picture')?.updateValueAndValidity();
      this.image = data.body.photo.path;
      this.addBookForm.updateValueAndValidity();
    })
  }

  getAllCategory(){
    this.api.getData<any>("category").subscribe(data =>{
      this.allCategoryData = data.body;
    })
  }
  getAllAuthor(){
    this.api.getData<any>("writer").subscribe(data =>{
      this.allAuthorData = data.body;
    })
  }
  onFileChange(event:any) {
    const reader = new FileReader();
    console.log(event.target.files)
    if(event.target.files && event.target.files.length && (event.target.files[0].type== 'image/jpeg' || event.target.files[0].type== 'image/jpg' )) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
        this.addBookForm.get('picture')?.setValidators([Validators.required]);
        this.addBookForm.get('picture')?.updateValueAndValidity();
        this.addBookForm.updateValueAndValidity();
        this.addBookFormRef.picture.setValue(file);
      };
    }
    else{
      this.image = '';
      this.addBookFormRef.picture.setValue('');
    }
  }
  addBook(){
    const formData = new FormData();
    formData.append("name",this.addBookFormRef.name.value);
    formData.append("author_id",this.addBookFormRef.author_id.value);
    formData.append("category_id",this.addBookFormRef.category_id.value);
    formData.append("number_of_copies",this.addBookFormRef.number_of_copies.value);
    formData.append("version",this.addBookFormRef.version.value);
    formData.append("price",this.addBookFormRef.price.value);
    formData.append("description",this.addBookFormRef.description.value);
    formData.append("discount",this.addBookFormRef.discount.value);
    formData.append("publish_house",this.addBookFormRef.publish_house.value);
    if(this.addBookFormRef.closing_date.value){
      formData.append("closing_date",moment(this.addBookFormRef.closing_date.value).format('YYYY-MM-DD HH:mm:ss'));
    }
    formData.append("picture",this.addBookFormRef.picture.value,this.addBookFormRef.picture.value.name);
    this.api.postData("book",formData,true,true,'',{'content-type' : null}).subscribe(data =>{
      this.router.navigate(['/admin/all-book']);
    })
  }
  editBook(){
    const formData = new FormData();
    formData.append("name",this.addBookFormRef.name.value);
    formData.append("author_id",this.addBookFormRef.author_id.value);
    formData.append("category_id",this.addBookFormRef.category_id.value);
    formData.append("number_of_copies",this.addBookFormRef.number_of_copies.value);
    formData.append("version",this.addBookFormRef.version.value);
    formData.append("price",this.addBookFormRef.price.value);
    formData.append("description",this.addBookFormRef.description.value);
    formData.append("discount",this.addBookFormRef.discount.value);
    formData.append("publish_house",this.addBookFormRef.publish_house.value);
    if(this.addBookFormRef.closing_date.value){
      formData.append("closing_date",moment(this.addBookFormRef.closing_date.value).format('YYYY-MM-DD HH:mm:ss'));
    }
    if(this.addBookFormRef.picture.value){
      formData.append("picture",this.addBookFormRef.picture.value,this.addBookFormRef.picture.value.name);
    }
    this.api.postData("book/"+this.id,formData,true,true,'',{'content-type' : null}).subscribe(data =>{
      this.router.navigate(['/admin/all-book']);
    })
  }

  test(){
    console.log(this.addBookFormRef);

  }
}
