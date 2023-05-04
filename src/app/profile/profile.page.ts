import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  userdetail: any;
  users: any;
  firstname: any;
  lastname: any;
  email: any;
  phone: any;
  location: any;
  password: any;

  constructor(public router: Router,
    public user: UserService,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {

  }
  ionViewWillEnter() {

    this.getProfile()

  }

  getProfile() {
    this.extra.loadershow()
    this.api.sendRequest('users_customers_profile_by_id', { "users_customers_id": localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('rssss----', res);
      if (res.status == 'success') {
        this.extra.hideLoader()
        this.userdetail = res.data
        this.firstname = this.userdetail.first_name
        this.lastname = this.userdetail.last_name
        this.email = this.userdetail.email
        this.phone = this.userdetail.phone
        this.location = this.userdetail.location
        this.password = this.userdetail.password
      } else {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }

    }, err => {
      this.extra.hideLoader()
    })
  }
  logout() {
    localStorage.removeItem('loggedId');
    this.router.navigate(['/login']);
  }
  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToUpcomingRewards() {
    this.router.navigate(['/upcoming-rewards']);
  }

  homeTab() {
    this.router.navigate(['/home']);
  }

  exploreTab() {
    this.router.navigate(['/explore']);
  }

  supportTab() {
    this.router.navigate(['/blog']);
  }

  profileTab() {
    this.router.navigate(['/profile']);
  }

}
