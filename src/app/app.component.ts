import { Component } from '@angular/core';
import { RouteModuleService } from './core/services/route-module.service';
import { fader } from './router.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    fader
  ]
})
export class AppComponent {
  constructor(){
  }
}
