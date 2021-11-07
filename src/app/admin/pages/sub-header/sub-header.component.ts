import { Component, OnInit } from '@angular/core';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  constructor(public auth:AuthinticationService) { }

  ngOnInit(): void {
  }

}
