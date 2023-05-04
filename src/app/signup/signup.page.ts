import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import { log } from 'console';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  getPwdType = 'password';
  getConPwdType = 'password';
  // countries: any = [];
  countries: any
  // states: any = [];
  states: any;
  selectedCountry: any = '';
  selectstate: any = '';
  count = 1;

  email: any = '';
  password: any = '';
  Confirmpassword: any = '';
  system_countries_id: any;

  system_states_id: any;
  constructor(public router: Router,
    public menuCtrl: MenuController,
    public api: ApiService,
    public extra: ExtraService) {

  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    // this.countries = Country.getAllCountries();
    // console.log(this.countries);
    this.getcountries()

  }
  ngOnInit() {

  }
  getcountries() {
    this.extra.loadershow()
    this.api.getRequest('system_countries').subscribe((res: any) => {
      console.log('countr====', res);
      this.extra.hideLoader()
      this.countries = res.data
    })
  }

  decreaseCount() {
    if (this.count > 0) {
      this.count--;
    }
  }

  increaseCount() {
    this.count++;
  }


  chooseCountry(ev: any) {
    this.selectedCountry = ev.detail.value;
    console.log("selectedCountry", this.selectedCountry);
    this.system_countries_id = this.selectedCountry.system_countries_id


    this.getStates(this.system_countries_id);
  }

  getStates(val: any) {
    // this.states = State.getStatesOfCountry(this.selectedCountry.isoCode);
    // console.log("States: ", this.states);
    let data = {
      "system_countries_id": this.system_countries_id
    }
    this.api.sendRequest('system_states', data).subscribe((res: any) => {
      console.log('states====', res);
      this.states = res.data
    })

  }

  selectedState(ev: any) {
    this.selectstate = ev.detail.value;
    console.log("selectedState", this.selectstate);
    this.system_states_id = this.selectstate.system_states_id
  }


  toggleGetType(field: string) {
    if (field == 'pwd') {
      if (this.getPwdType == 'password') {
        this.getPwdType = 'text';
        this.showPassword = true;
      } else {
        this.getPwdType = 'password';
        this.showPassword = false;
      }
    } else {
      if (this.getConPwdType == 'password') {
        this.getConPwdType = 'text';
        this.showConfirmPassword = true;
      } else {
        this.getConPwdType = 'password';
        this.showConfirmPassword = false;
      }
    }

  }

  goForLogin() {
    this.router.navigate(['/login']);
  }

  startIntro() {
    let datatosend = {
      "one_signal_id": "123456",
      "email": this.email,
      "phone": "",
      "password": this.password,
      "confirm_password": this.Confirmpassword,
      "system_countries_id": this.system_countries_id,
      "system_states_id": this.system_states_id,
      "account_type": "SignupWithApp"
    }
    if (this.email == '') {
      this.extra.presentToast('Please enter your email');
    } else if (this.password == '') {
      this.extra.presentToast('Please enter password');
    }
    else if (this.Confirmpassword == '') {
      this.extra.presentToast('Please enter confirmpassord');
    }
    else if (this.password != this.Confirmpassword) {
      this.extra.presentToast("Password and ConfirmPassord doesn't match");
    }
    else if (this.selectedCountry == '') {
      this.extra.presentToast('Please select your country');
    }
    else if (this.selectstate == '') {
      this.extra.presentToast('Please select your state');
    } else {
      this.api.sendRequest('signup', datatosend).subscribe((res: any) => {
        console.log('signupresponse====', res);
        if (res.status == 'success') {
          localStorage.setItem('loggedId', res.data.users_customers_id);
          localStorage.setItem('userdata', JSON.stringify(res.data));
          this.router.navigate(['/tutorial']);
        } else {
          this.extra.presentToast(res.message)
        }

      })
    }

  }

}
