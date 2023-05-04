import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.page.html',
  styleUrls: ['./customer-support.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomerSupportPage implements OnInit {
  adminId: any;
  adminname: any;
  constructor(public router: Router,
    public user: UserService,
    public api: ApiService) { }

  ngOnInit() {
    this.getadminlist()
  }

  getadminlist() {
    this.api.getRequest('get_admin_list').subscribe((res: any) => {
      console.log(res);
      this.adminId = res.data[0].users_system_id
      this.adminname = res.data[0].first_name

    })
  }

  goForChat() {
    let data = {
      "requestType": "startChat",
      "users_customers_id": localStorage.getItem('loggedId'),
      "other_users_customers_id": this.adminId
    }
    this.api.sendRequest('user_chat_live', data).subscribe((res: any) => {
      console.log("start chat----", res);
      if (res.status == 'success') {
        this.router.navigate(['/chat', {
          adminId: this.adminId,
          adminname: this.adminname
        }]);
      }

    });

  }

  goForNotifications() {
    this.router.navigate(['/notifications']);
  }
  goForTutorial() {
    this.router.navigate(['/tutorial']);
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
