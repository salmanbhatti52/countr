import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

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
  constructor(public router: Router,
    public user: UserService,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
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
      this.api.sendRequest('signin', datatosend).subscribe((res: any) => {
        console.log('signinresponse====', res);
        if (res.status == 'success') {
          localStorage.setItem('loggedId', res.data.users_customers_id);
          localStorage.setItem('userdata', JSON.stringify(res.data));
          this.router.navigate(['/home']);
        } else {
          this.extra.presentToast(res.message)
        }

      })
    }

  }


  goForSignup() {
    this.router.navigate(['/signup']);
  }

}
