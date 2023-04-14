import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditProfilePage implements OnInit {
  showPassword=false;
  getPwdType='password';
  constructor(
    public router:Router,
    public user:UserService) { }

  ngOnInit() {
  }

  updateProfile(){
    this.router.navigate(['/profile']);
  }

  toggleGetType(field:string){
    if(field == 'pwd'){
      if(this.getPwdType == 'password'){
        this.getPwdType = 'text';
        this.showPassword = true;
      }else{
        this.getPwdType = 'password';
        this.showPassword = false;
      }
    }
    
  }

}
