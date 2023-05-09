import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WelcomePage implements OnInit {
  welcome_questions: any;
  welcome_users: any;
  welcome_bg: any;
  welcome_note: any;
  system_image: any;
  welcome_heading: any;

  constructor(public router: Router,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.systemsettings()
  }

  systemsettings() {
    this.api.getRequest('system_settings').subscribe((res: any) => {
      console.log(res);

      res.data.map((value: any, index: any) => {
        if (
          value.type == "system_image"
        ) {
          this.system_image = value.description

        }
        if (
          value.type == "welcome_questions"
        ) {
          this.welcome_questions = value.description

        }
        if (
          value.type == "welcome_users"
        ) {
          this.welcome_users = value.description

        }
        if (
          value.type == "welcome_bg"
        ) {
          let bg_image = value.description
          this.welcome_bg = 'https://www.portal.countr.ai/public/uploads/system_image/' + bg_image
        }
        if (
          value.type == "welcome_note"
        ) {
          this.welcome_note = value.description

        }
        if (
          value.type == "welcome_heading"
        ) {
          this.welcome_heading = value.description

        }

      });

    })
  }

  goForLogin() {
    this.router.navigate(['/login']);
  }

}
