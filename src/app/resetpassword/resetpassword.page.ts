import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResetpasswordPage implements OnInit {
  pass: any;
  cpass: any;
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
  back() {
    this.location.back()
  }
  reset() {
    let data = {
      "email": localStorage.getItem('emailonforgot'),
      "otp": localStorage.getItem('otp'),
      "password": this.pass,
      "confirm_password": this.cpass
    }
    this.api.sendRequest('modify_password', data).subscribe((res: any) => {
      console.log('password rsponse---', res);
      if (res.status == 'success') {
        this.navCtrl.navigateRoot('login')
      } else {
        this.extra.presentToast(res.message)
      }

    })
  }

}
