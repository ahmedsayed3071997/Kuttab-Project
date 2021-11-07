import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  searchBook = new FormControl();

  books: any = [];
  selectionBook: any;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
  }
  getBooks(){
    console.log(this.searchBook.value,'kkkkkkkkkkkkkkkkkkkkk')
    this.api.getData('book', {name : this.searchBook.value}).subscribe((res: any) =>{
      this.books = res.body;
    });

  }
  getBook(bookId: number){
    console.log(bookId)
    this.router.navigate(['/user/book/' , bookId])
  }

}
