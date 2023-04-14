import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.page.html',
  styleUrls: ['./customer-support.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomerSupportPage implements OnInit {

  constructor(public router:Router,
    public user:UserService) { }

  ngOnInit() {
  }

  goForTutorial(){
    this.router.navigate(['/tutorial']);
  }

  homeTab(){
    this.router.navigate(['/home']);
  }

  exploreTab(){
    this.router.navigate(['/explore']);
  }

  supportTab(){
    this.router.navigate(['/customer-support']);
  }
  
  profileTab(){
    this.router.navigate(['/profile']);
  }
}
