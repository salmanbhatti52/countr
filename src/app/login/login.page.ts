import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  email: any = '';
  password: any = '';
  welcome_bg: any;
  social_type: any;
  constructor(public router: Router,
    public menuCtrl: MenuController,
    public user: UserService,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();

    }
    this.welcome_bg = localStorage.getItem('bgimg')
    this.social_type = localStorage.getItem('social_type');
    console.log(this.social_type);

  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }

  async Loginwithgoogle() {
    this.user.googleuserdetail = await GoogleAuth.signIn();
    if (this.user.googleuserdetail) {
      console.log('user details::', this.user.googleuserdetail);
      let data = {
        "email": this.user.googleuserdetail.email,
        "one_signal_id": "123456",
        "google_access_token": this.user.googleuserdetail.authentication.accessToken,
        "account_type": "SignupWithSocial",
        "social_acc_type": "Google",
        "password": "dummy",
        "system_countries_id": "0",
        "system_states_id": "0",
        "status": "Active",
        "verify_code": "dummy"
      }
      this.extra.loadershow()
      this.api.sendRequest('signup_social', data).subscribe((res: any) => {
        console.log('signinresponse====', res);
        if (res.status == 'success') {
          this.extra.hideLoader()
          localStorage.setItem('loggedId', res.data[0].users_customers_id);
          localStorage.setItem('userdata', JSON.stringify(res.data[0]));
          this.router.navigate(['/home']);
        } else {
          this.extra.hideLoader()
          this.extra.presentToast(res.message)
        }

      }, err => {
        this.extra.hideLoader()
      })
    }
  }
  async googleLogout() {
    await GoogleAuth.signOut();
    this.user.googleuserdetail = null
  }

  login() {
    this.user.loginVal = true;

    let datatosend = {
      "email": this.email,
      "password": this.password,
    }
    if (this.email == '') {
      this.extra.presentToast('Please enter your email');
    } else if (this.password == '') {
      this.extra.presentToast('Please enter password');
    }
    else {
      this.extra.loadershow()
      this.api.sendRequest('signin', datatosend).subscribe((res: any) => {
        console.log('signinresponse====', res);
        if (res.status == 'success') {
          this.extra.hideLoader()
          localStorage.setItem('loggedId', res.data.users_customers_id);
          localStorage.setItem('userdata', JSON.stringify(res.data));
          this.router.navigate(['/home']);
        } else {
          this.extra.hideLoader()
          this.extra.presentToast(res.message)
        }

      }, err => {
        this.extra.hideLoader()
      })
    }

  }


  goForSignup() {
    this.router.navigate(['/signup']);
  }
  forgot() {
    this.router.navigate(['/forgotpassword']);
  }

}
