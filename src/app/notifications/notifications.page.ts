import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {
  notilength: any;
  noti: any;
  notichecked = 'false';

  constructor(public location: Location,
    public user: UserService,
    public api: ApiService,
    public extra: ExtraService) { }


  ngOnInit() {
    this.getuser()
    this.getnotification()
  }

  getuser() {
    this.api.sendRequest('users_customers_profile_by_id', { 'users_customers_id': localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('get user----', res);
      if (res.data.notifications == "No") {
        this.notichecked = 'false'
      }
      else {
        this.notichecked = 'true'
      }
    })
  }
  getnotification() {
    this.api.sendRequest('notifications', { "users_customers_id": localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('response', res);
      if (res.status == 'success') {
        this.notilength = res.data.length
        this.noti = res.data
        // let dd = moment(res.data.date_added).format('YYYY-MM-DD')
        // const d = new Date(dd);

        // console.log(moment(d).fromNow());

        // res.data.forEach((ele: any) => {
        //   let data = {
        //     message: ele.message,
        //     time: moment(ele.date_added).fromNow()
        //   }
        //   this.noti.push(data)
        // });
      } else {
        this.extra.presentToast(res.message)
      }


    })
  }


  changed(ev: any) {
    // console.log(ev);
    localStorage.setItem('notification', ev.detail.checked)
    this.api.sendRequest('notification_permission', { 'users_customers_id': localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('reeer', res);

    })
  }

}
