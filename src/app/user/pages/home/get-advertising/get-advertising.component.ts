import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-get-advertising',
  templateUrl: './get-advertising.component.html',
  styleUrls: ['./get-advertising.component.scss']
})
export class GetAdvertisingComponent implements OnInit {
  advertising: any;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAdvertising();
  }
  getAdvertising() {
    this.api.getData('ads').subscribe((res: any) => {
      this.advertising = res.body;
    });
  }

}
