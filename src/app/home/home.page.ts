import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperModule]
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  choice1 = false;
  choice2 = true;
  choice3 = false;
  categories: any;
  constructor(public router: Router,
    public user: UserService,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.user.loginVal = true;
    this.getCategories()
  }

  getCategories() {
    this.api.getRequest('survey_categories').subscribe((res: any) => {
      console.log('categoreis=====', res);
      this.categories = res.data
    })
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // confirm() {
  //   this.modal.dismiss(this.name, 'confirm');
  // }

  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
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
    this.router.navigate(['/customer-support']);
  }

  profileTab() {
    this.router.navigate(['/profile']);
  }

}
