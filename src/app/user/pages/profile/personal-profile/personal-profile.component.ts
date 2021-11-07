import { Component, OnInit } from '@angular/core';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit {

  constructor(public auth:AuthinticationService) { }

  ngOnInit(): void {
  }

}
