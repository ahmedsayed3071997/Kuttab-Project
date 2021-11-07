import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/http/api-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmAddCartComponent } from '../confirm-add-cart/confirm-add-cart.component';
import { ConfirmAddFavouriteComponent } from '../confirm-add-favourite/confirm-add-favourite.component';
import { ConfirmDeleteFavouriteComponent } from '../confirm-delete-favourite/confirm-delete-favourite.component';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';

@Component({
  selector: 'app-section-book',
  templateUrl: './section-book.component.html',
  styleUrls: ['./section-book.component.scss']
})
export class SectionBookComponent implements OnInit {
  modal: BsModalRef = new BsModalRef();
  filterBooksForm!: FormGroup;
  idCategory: any = null ;
  books: any = []
  gategories: any = [];
  authers: any = [];
  category: any ;
  user: any =null;
  houeses:any = [];
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private auth: AuthinticationService) { }

  ngOnInit(): void {
    this.user = this.auth.isLogin;
    console.log(this.user)
    this.filterBooksForm = this.formBuilder.group({
      name :[''],
      author_id :[''],
      category_id :[''],
      number_of_copies :[false],
      version :[''],
      price :[''],
      publish_house :[''],
      discount :[''],
    });
    this.idCategory = this.route.snapshot.paramMap.get('id');
    this.filterBooksForm.controls.category_id.setValue(this.idCategory);
    this.getCategory();
    this.getBooksByCategoryID();
    this.getGategories();
    this.getAuthers();
    this.getHouses();
  }
  get addBookFormRef(){ return this.filterBooksForm.controls }
  getBooksByCategoryID() {
    this.api.getData('book', {category_id: this.idCategory}).subscribe((res: any) =>{
      this.books = res.body;
      console.log(this.books)
    });
  }
  getGategories(){
    this.api.getData('category').subscribe((res: any) =>{
      this.gategories = res.body;
    });
  }
  getCategory() {
    this.api.getData('category/' + this.idCategory).subscribe((res: any) =>{
      this.category = res.body;
    });
  }
  getAuthers(){
    if(this.idCategory){
      this.api.getData('writer' , {category_id: this.idCategory}).subscribe((res: any) =>{
        this.authers = res.body;
      });
    }
   
  }
  getHouses(){
    this.api.getData('book' , {houses:'true'}).subscribe((res: any) =>{
      this.houeses = Object.values(res.body);
      console.log(this.houeses)
    });
  }
  clear(){
    let a = this.idCategory
    this.filterBooksForm.reset();
    this.idCategory = a;
    this.filterBooksForm.controls.category_id.setValue(this.idCategory);
    console.log(this.filterBooksForm)
    this.filterbook();
  }
  filterbook(){
    let obj: any = {};
    this.getCategory();
    this.filterBooksForm.get('name')?.value ? obj.name = this.filterBooksForm.get('name')?.value : null;
    this.filterBooksForm.get('category_id')?.value ? obj.category_id = this.filterBooksForm.get('category_id')?.value : obj.category_id = this.idCategory;
    this.filterBooksForm.get('author_id')?.value ? obj.author_id = this.filterBooksForm.get('author_id')?.value : null;
    this.filterBooksForm.get('number_of_copies')?.value ? obj.number_of_copies = this.filterBooksForm.get('number_of_copies')?.value : null;
    this.filterBooksForm.get('price')?.value ? obj.price = this.filterBooksForm.get('price')?.value : null;
    this.filterBooksForm.get('publish_house')?.value ? obj.publish_house = this.filterBooksForm.get('publish_house')?.value : null;
    this.filterBooksForm.get('discount')?.value ? obj.discount = this.filterBooksForm.get('discount')?.value : null;
    this.api.getData('book', obj).subscribe((res: any) =>{
      this.books = res.body;
    });

  }
  openModalConfirmAddToCart(book: number){
    const initialState = { book };
    this.modal = this.modalService.show(ConfirmAddCartComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
    });
  }
  openModalConfirmAddToFavorite(book_id: number) {
    const initialState = { book_id };
    this.modal = this.modalService.show(ConfirmAddFavouriteComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getBooksByCategoryID();
    });
  }
  openModalConfirmDeleteFromFavorite(book_id: number) {
    const initialState = { book_id };
    this.modal = this.modalService.show(ConfirmDeleteFavouriteComponent,
    {backdrop: true , ignoreBackdropClick: true, initialState });
    this.modalService.onHide.subscribe((result: any) => {
      this.getBooksByCategoryID();
    });
  }

}
