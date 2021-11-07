import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { fader } from 'src/app/router.animation';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations:[
    fader
  ]
})
export class MainPageComponent implements OnInit {

  constructor(public router:Router,public auth:AuthinticationService) { }

  ngOnInit(): void {
    console.log(this.router.url);
    
  }

}
