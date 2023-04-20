import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NavController, IonContent } from '@ionic/angular';
import { ExtraService } from '../services/extra.service';
import * as moment from 'moment';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatPage implements OnInit {
  message: any;
  loggedid: any;
  other_users_customers_id: any;
  otherusername: any;
  @ViewChild(IonContent) content!: IonContent;
  private autoSaveInterval: any;
  messages: any = [];
  constructor(public location: Location,
    public route: ActivatedRoute,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.loggedid = localStorage.getItem('loggedId')
    console.log('users_customers_id', localStorage.getItem('loggedId'));

    this.other_users_customers_id = this.route.snapshot.params['adminId'];
    console.log('other_users_customers_id', this.other_users_customers_id);
    this.otherusername = this.route.snapshot.params['adminname'];
    console.log('otherusername', this.otherusername);
  }

  goBack() {
    // clearInterval(this.autoSaveInterval);
    this.location.back()
  }
  ionViewWillLeave() {
    clearInterval(this.autoSaveInterval);
    console.log("clear");
  }

  ionViewWillEnter() {
    this.scrollDown();

    // // Get all  messages....
    this.getMessages();
    this.autoSaveInterval = setInterval(() => {
      this.updateMessages();
    }, 2000);
  }

  userTyping(event: any) {
    this.scrollDown();
  }

  updateMessages() {
    let data = {
      "requestType": "updateMessages",
      "users_customers_id": localStorage.getItem('loggedId'),
      "other_users_customers_id": this.other_users_customers_id
    }
    this.api.sendRequest('user_chat_live', data).subscribe((res: any) => {
      console.log("get updatemsgs response----", res);
      if (res.status == 'success') {
        // res.data.forEach((ele: any) => {
        //   console.log(ele);
        //   let data = {
        //     userloggedId: ele.users_data.users_customers_id,
        //     message: ele.message,
        //     time: ele.time
        //   }
        //   this.messages.push(data)
        //   this.scrollDown();
        // });
      }

    });
  }

  getMessages() {
    // this.extra.loadershow()
    let data = {
      "requestType": "getMessages",
      "users_customers_id": localStorage.getItem('loggedId'),
      "other_users_customers_id": this.other_users_customers_id
    }
    this.api.sendRequest('user_chat_live', data).subscribe((res: any) => {
      console.log("get msgs response----", res);
      this.extra.hideLoader()
      if (res.status == 'success') {
        res.data.forEach((ele: any) => {

          let data = {
            userloggedId: ele.users_data.users_customers_id,
            message: ele.message,
            time: ele.time
          }
          this.messages.push(data)
        });
      } else {
        this.extra.presentToast(res.message)
        this.extra.hideLoader()
      }

    });
  }
  sendMessage() {
    let time = moment().format('LT');
    console.log(time);
    let fiedlstosend = {
      "requestType": "sendMessage",
      "sender_type": "Users",
      "users_customers_id": localStorage.getItem('loggedId'),
      "other_users_customers_id": this.other_users_customers_id,
      "content": this.message,
      "messageType": "1"
    }
    this.api.sendRequest('user_chat_live', fiedlstosend).subscribe((res: any) => {
      console.log("send-msg-response", res);
      let datatosend = {
        userloggedId: localStorage.getItem('loggedId'),
        message: this.message,
        time: time,
      }
      this.messages.push(datatosend);
      this.message = ''
    });

  }

  scrollDown() {
    this.content.scrollToBottom(50);

  }

}
