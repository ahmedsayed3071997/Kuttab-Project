import { Component, OnInit } from '@angular/core';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public auth:AuthinticationService) { }

  ngOnInit(): void {
    
  }

}
