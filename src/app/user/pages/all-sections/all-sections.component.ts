import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-all-sections',
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.scss']
})
export class AllSectionsComponent implements OnInit {

  allCategoryData:any = [];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }


  getAllCategory(){
    this.api.getData<any>("category").subscribe(data =>{
      this.allCategoryData = data.body;
    })
  }


}
