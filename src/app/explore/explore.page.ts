import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperModule]
})
export class ExplorePage implements OnInit {
  choice1 = false;
  choice2 = true;
  choice3 = false;
  slide1 = true;
  slide2 = false;
  slide3 = false;
  slide4 = false;
  slide5 = false;
  constructor(public router: Router,
    public user: UserService) { }

  ngOnInit() {
  }

  selectSlide(val: any) {
    if (val == 1) {
      this.slide1 = true;
      this.slide2 = false;
      this.slide3 = false;
      this.slide4 = false;
      this.slide5 = false;
    } else if (val == 2) {
      this.slide1 = false;
      this.slide2 = true;
      this.slide3 = false;
      this.slide4 = false;
      this.slide5 = false;
    } else if (val == 3) {
      this.slide1 = false;
      this.slide2 = false;
      this.slide3 = true;
      this.slide4 = false;
      this.slide5 = false;
    } else if (val == 4) {
      this.slide1 = false;
      this.slide2 = false;
      this.slide3 = false;
      this.slide4 = true;
      this.slide5 = false;
    } else {
      this.slide1 = false;
      this.slide2 = false;
      this.slide3 = false;
      this.slide4 = false;
      this.slide5 = true;
    }
  }

  updateChoice(val: any) {
    if (val == 1) {
      this.choice1 = true;
      this.choice2 = false;
      this.choice3 = false;
    } else if (val == 2) {
      this.choice1 = false;
      this.choice2 = true;
      this.choice3 = false;
    } else {
      this.choice1 = false;
      this.choice2 = false;
      this.choice3 = true;
    }
  }

  sendText() {

  }

  handleChange(event: any) {
    // this.result = []
    // console.log('Event: ',event);

    // const query = event.target.value.toLowerCase();
    // console.log('query: ',query);

    // if(query == ''){
    //   this.showContent = true;

    // }
    // if(query != ''){
    //   let data = {
    //     users_customers_id:this.checkUser.appUserId,
    //     keyword:query
    //   };
    //   this.api.showLoading();
    //   this.api.sendRequest('getCarsByFiltersByName',data).subscribe((res:any)=>{
    //     console.log("Response: ",res);
    //     this.api.hideLoading();
    //     if(res.status == 'success'){
    //       this.showContent = false;
    //       this.result = res.data;

    //     }else if(res.status == 'error'){
    //       if(res.message != 'Keyword Required'){
    //         this.api.presentToast(res.message);
    //       }

    //     }else{

    //     }

    //   },(err)=>{
    //     this.api.hideLoading();
    //     console.log("API Call Error: ",err);

    //   })
    // }

  }

  clearResult() {
    // this.result = []
    // this.showContent = true;
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
