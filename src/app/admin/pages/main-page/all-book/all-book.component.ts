import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/core/http/api-service.service';
import { DeleteBookComponent } from '../../modals/delete-book/delete-book.component';

@Component({
  selector: 'app-all-book',
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.scss']
})
export class AllBookComponent implements OnInit {
  filterBookForm!:FormGroup;
  allBooks :any = [];
  allAuthorData:any = [];
  allCategoryData:any = [];
  modal!: BsModalRef;
  constructor(private api:ApiService,private formBuilder:FormBuilder, private modalService:BsModalService) { }

  ngOnInit(): void {
    this.filterBookForm = this.formBuilder.group({
      category_id:[''],
      author_id:[''],
      version:['']
    });
    this.getAllCategory();
    this.getAllAuthor();
    this.getAllBook();
  }
  get filterBookFormRef(){ return this.filterBookForm.controls }

  getAllBook(){
    console.log(this.filterBookFormRef);

    let obj:any ={};
    if(this.filterBookFormRef.category_id.value) obj['category_id'] = this.filterBookFormRef.category_id.value;
    if(this.filterBookFormRef.author_id.value) obj['author_id'] = this.filterBookFormRef.author_id.value;
    if(this.filterBookFormRef.version.value) obj['version'] = this.filterBookFormRef.version.value;
    this.api.getData("book",obj,true,true).subscribe((data:any) =>{
      this.allBooks = data.body;
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


  openModalDeleteBook(book_id: number) {
    const initialState = { book_id:book_id };
    this.modal = this.modalService.show(DeleteBookComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getAllBook();
    });
  }

}
