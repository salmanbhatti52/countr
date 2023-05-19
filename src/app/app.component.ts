import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AlertController, IonicModule, MenuController, Platform } from '@ionic/angular';
import { UserService } from './api/user.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ApiService } from './services/api.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { ExtraService } from './services/extra.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    // { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Partner Surveys', url: 'partners', icon: 'person' },
    { title: 'Customer Support', url: 'customer-support', icon: 'mail' },
    { title: 'Change Password', url: 'changepassword', icon: 'archive' },
    { title: 'Delete Account', url: 'deleteaccount', icon: 'warning' },
    { title: 'Logout', icon: 'trash' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  welcome_bg: any;
  social_type: any;
  prize_explanation: any;
  constructor(public router: Router,
    public user: UserService,
    public api: ApiService,
    public extra: ExtraService,
    public menuCtrl: MenuController,
    public alert: AlertController,
    public platform: Platform) {

  }

  ngOnInit() {
    console.log('loggedId====', localStorage.getItem('loggedId'));
    this.systemsettings()
    this.platform.ready().then(() => {
      setTimeout(() => {


        SplashScreen.hide();

        if (localStorage.getItem('loggedId') == null) {
          this.router.navigate(['welcome'])
        } else {
          this.router.navigate(['home'])
        }


      }, 3500);
    });
  }
  systemsettings() {
    this.api.getRequest('system_settings').subscribe((res: any) => {
      console.log(res);

      res.data.map((value: any, index: any) => {

        if (
          value.type == "welcome_bg"
        ) {
          let bg_image = value.description
          this.welcome_bg = 'https://www.portal.countr.ai/public/uploads/system_image/' + bg_image
          localStorage.setItem('bgimg', this.welcome_bg)
        }
        if (value.type == 'social_login') {
          this.social_type = value.description
          localStorage.setItem('social_type', this.social_type)
        }
        if (value.type == 'prize_explanation') {
          this.prize_explanation = value.description
          localStorage.setItem('prize_explanation', this.prize_explanation)
        }

      });

    })
  }

  async pages(p: any) {
    console.log(p);

    if (p.title == 'Logout') {
      const alert = await this.alert.create({
        header: 'Are you ready to log out?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.menuCtrl.close();
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              localStorage.removeItem('loggedId');
              this.router.navigate(['login'])
              // await GoogleAuth.signOut();
              // this.user.googleuserdetail = null
              this.extra.presentToast('You are successfully logged out!');

              this.menuCtrl.close();

            },
          },
        ],

      });
      await alert.present();
    }

  }
}
