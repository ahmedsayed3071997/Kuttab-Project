import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  orders: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.api.getData('order').subscribe((res: any) =>{
      this.orders = res.body;
    })
  }

}
