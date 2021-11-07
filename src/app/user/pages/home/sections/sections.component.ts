import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  categories: any = [];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.api.getData('categories/latest').subscribe((res: any)=>{
      this.categories = res.body;
    })
  }

}
