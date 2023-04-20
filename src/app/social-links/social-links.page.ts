import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.page.html',
  styleUrls: ['./social-links.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SocialLinksPage implements OnInit {
  socialarr: any = [];

  constructor(public router: Router,
    public api: ApiService) { }

  ngOnInit() {
    this.systemsettings()
  }

  systemsettings() {
    this.api.getRequest('system_settings').subscribe((res: any) => {
      console.log(res);

      res.data.map((value: any, index: any) => {

        if (value.type == "link_facebook" || value.type == "link_instagram" || value.type == "link_linkedin" || value.type == "link_twitter") {
          this.socialarr.push(value)
        }
      });
      console.log(this.socialarr);


    })
  }

  gotoHomePage() {
    this.router.navigate(['/home']);
  }

}
