import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChangepasswordPage implements OnInit {
  getPwdType1 = 'password';
  getPwdType2 = 'password';
  getPwdType3 = 'password';
  password: any;
  newpassword: any;
  confirmpassword: any;
  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;
  email: any;
  userdetail: any;
  constructor(public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProfile()
  }

  getProfile() {
    this.api.sendRequest('users_customers_profile_by_id', { "users_customers_id": localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('rssss----', res);
      if (res.status == 'success') {
        this.userdetail = res.data
        this.email = this.userdetail.email
      } else {
        this.extra.presentToast(res.message)
      }
    })
  }
  toggleGetType1(field: string) {
    if (field == 'pwd') {
      if (this.getPwdType1 == 'password') {
        this.getPwdType1 = 'text';
        this.showPassword1 = true;
      } else {
        this.getPwdType1 = 'password';
        this.showPassword1 = false;
      }
    }

  }
  toggleGetType2(field: string) {
    if (field == 'pwd') {
      if (this.getPwdType2 == 'password') {
        this.getPwdType2 = 'text';
        this.showPassword2 = true;
      } else {
        this.getPwdType2 = 'password';
        this.showPassword2 = false;
      }
    }

  }
  toggleGetType3(field: string) {
    if (field == 'pwd') {
      if (this.getPwdType3 == 'password') {
        this.getPwdType3 = 'text';
        this.showPassword3 = true;
      } else {
        this.getPwdType3 = 'password';
        this.showPassword3 = false;
      }
    }

  }

  updatePassword() {
    let data = {
      "email": this.email,
      "old_password": this.password,
      "password": this.newpassword,
      "confirm_password": this.confirmpassword
    }
    this.api.sendRequest('change_password', data).subscribe((res: any) => {
      console.log('chansage====', res);
      if (res.status == 'success') {
        this.extra.presentToast('Password change successfully!');
        this.navCtrl.navigateRoot('home');
      }
    })
  }

}
