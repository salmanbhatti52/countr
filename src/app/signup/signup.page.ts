import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Country, State, City }  from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {
  showPassword=false;
  showConfirmPassword=false;
  getPwdType='password';
  getConPwdType='password';
  countries:any = [];
  states:any = [];
  selectedCountry: any;
  count = 1;
  constructor(public router:Router) {
    
   }

  ionViewWillEnter(){
    this.countries =  Country.getAllCountries();
    console.log(this.countries);
    
  } 
  ngOnInit() {
    
  }

  decreaseCount(){
    if(this.count > 0){
      this.count--;
    }
  }

  increaseCount(){
    this.count++;
  }

  chooseCountry(ev:any) {
    this.selectedCountry = ev.detail.value;
    console.log("selectedCountry",this.selectedCountry);
    this.getStates(this.selectedCountry);
  }

  getStates(val:any){
    this.states = State.getStatesOfCountry(this.selectedCountry.isoCode);
    console.log("States: ",this.states);
    
  }

  selectedState(ev:any){
    this.selectedState = ev.detail.value;
    console.log("selectedState",this.selectedState);
    
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
    }else{
      if(this.getConPwdType == 'password'){
        this.getConPwdType = 'text';
        this.showConfirmPassword = true;
      }else{
        this.getConPwdType = 'password';
        this.showConfirmPassword = false;
      }
    }
    
  }

  goForLogin(){
    this.router.navigate(['/login']);
  }

  startIntro(){
    this.router.navigate(['/tutorial']);
  }

}
