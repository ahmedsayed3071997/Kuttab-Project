import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api-service.service';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss']
})
export class AdvertisingComponent implements OnInit {
  advertising: any;
  addAdvertisingForm!: FormGroup ;
  image: any =null;
  file: any = null;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAdvertising();
  }
  get addAdvertisingFormRef(){ return this.addAdvertisingForm.controls }
  getAdvertising(){
    this.api.getData('ads').subscribe((res: any) =>{
      this.advertising = res.body;
    })

  }
  addAdvertising() {
    if(this.file){
      const formData = new FormData();
      formData.append("picture",this.file,this.file.name);
      formData.append("location",'home');
      this.api.postData('ads', formData,true,true,'',{'content-type' : null} ).subscribe((res: any) => {
        this.file = null;
        this.image = null;
        this.getAdvertising();
      })
    } else {

    }


  }
  deleteAdvertising(id: number){
    this.api.deleteData('ads/' + id, {}).subscribe((res: any) =>{
      this.getAdvertising();
    })
  }
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length &&
      (event.target.files[0].type== 'image/jpeg' || event.target.files[0].type== 'image/jpg' )) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.image = reader.result as string;
      };
    }
    else{
      this.image = '';
      this.file = null;
    }
  }
}
