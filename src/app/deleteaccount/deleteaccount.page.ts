import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExtraService } from '../services/extra.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.page.html',
  styleUrls: ['./deleteaccount.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DeleteaccountPage implements OnInit {
  name: any;
  delreason: any = '';
  desc: any = '';
  email: any;
  Checkboxes = [{ question: 'I concerned about my personal data', isItemChecked: false }, { question: 'I have another  Countr account', isItemChecked: false },
  { question: 'I want to remove app from my mobile', isItemChecked: false }, { question: 'I get too many emails from Countr', isItemChecked: false }, { question: 'Other', isItemChecked: false }];

  selectquestions: any[] = [];
  userdetail: any;
  constructor(public extra: ExtraService,
    public api: ApiService) { }

  ngOnInit() {
    this.getProfile()
  }
  getProfile() {
    this.extra.loadershow()
    this.api.sendRequest('users_customers_profile_by_id', { "users_customers_id": localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('rssss----', res);
      this.userdetail = res.data
      if (res.status == 'success') {
        this.extra.hideLoader()
        this.email = this.userdetail.email
      } else {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }

    }, err => {
      this.extra.hideLoader()
    })
  }
  verifyEvent(ev: any) {
    console.log(ev);
    if (ev.isItemChecked == true) {
      this.selectquestions.push(ev.question)
      console.log('selectquestions aray', this.selectquestions)
    }
    if (ev.isItemChecked == false) {

      const index = this.selectquestions.indexOf(ev.question);
      if (index > -1) {
        this.selectquestions.splice(index, 1); // 2nd parameter means remove one item only
        console.log('job aray', this.selectquestions)
      }

    }
  }

  delete() {
    if (this.delreason == '') {
      this.extra.presentToast('Delete reason required')
    }
    else if (this.desc == '') {
      this.extra.presentToast('Comments required')
    }
    else {
      let data = {
        "user_email": this.email,
        "delete_reason": this.delreason,
        "comments": this.desc
      }
      this.api.sendRequest('delete_account', data).subscribe((res: any) => {

        if (res.status == 'success') {
          this.extra.presentToast(res.message)
        } else {
          this.extra.presentToast(res.message)
        }
      })
    }
  }

}
