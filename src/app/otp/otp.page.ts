import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExtraService } from '../services/extra.service';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgOtpInputModule]
})
export class OtpPage implements OnInit {
  userEmail: any;
  otp: any;
  constructor(public router: Router,
    public extra: ExtraService,
    public location: Location,
    public menuCtrl: MenuController) { }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }

  goback() {
    this.location.back()
  }
  ngOnInit() {
    this.userEmail = localStorage.getItem('emailonforgot')
  }
  goNext() {
    if (localStorage.getItem('otp') == this.otp) {
      this.router.navigate(['resetpassword'])
    } else {
      this.extra.presentToast("OTP doesn't match")
    }

  }

  onOtpChange(event: any) {
    console.log(event, "eventevent");
    this.otp = event;
  }

}
