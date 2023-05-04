import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotpasswordPage implements OnInit {
  email: any;
  constructor(public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController,
    public location: Location,
    public menuCtrl: MenuController) { }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }
  goback() {
    this.location.back()
  }


  reset() {
    if (this.email == '') {
      this.extra.presentToast('Email is Required')
    } else {
      this.api.sendRequest('forgot_password', { "email": this.email }).subscribe((res: any) => {
        console.log('res', res);
        if (res.status == 'success') {
          this.navCtrl.navigateRoot('otp');
          localStorage.setItem('emailonforgot', this.email);
          localStorage.setItem('otp', res.data.otp);
          this.extra.presentToast(res.data.message);
        } else {
          this.extra.presentToast(res.message);
        }
      })
    }
  }

}
