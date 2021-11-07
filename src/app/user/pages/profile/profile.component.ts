import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthinticationService } from 'src/app/auth/pages/services/authintication.service';
import { ApiService } from 'src/app/core/http/api-service.service';
import { fader } from 'src/app/router.animation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations:[
    fader
  ]
})
export class ProfileComponent implements OnInit {
  constructor(public router:Router,public auth:AuthinticationService,private api:ApiService) { }

  ngOnInit(): void {
  }


  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length &&
      (event.target.files[0].type== 'image/jpeg' || event.target.files[0].type== 'image/jpg' )) {
      const [file] = event.target.files;
      const formData = new FormData();
      formData.append("picture",file,file.name);
      this.api.postData("user/"+this.auth.user.id,formData,true,true,'',{'content-type' : null}).subscribe((data:any) =>{
       this.auth.role.next(data.body);
      })
    }
  }

}
