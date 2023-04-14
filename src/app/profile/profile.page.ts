import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  constructor(public router:Router,
    public user:UserService) { }

  ngOnInit() {
  }

  logout(){
    this.user.loginVal = false;
    this.router.navigate(['/login']);
  }
  goToEditProfile(){
    this.router.navigate(['/edit-profile']);
  }

  goToUpcomingRewards(){
    this.router.navigate(['/upcoming-rewards']);
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
