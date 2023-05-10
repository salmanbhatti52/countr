import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})


export class TutorialPage implements OnInit {
  pagecomig: any;
  text: any;
  // videolink: any;
  link: any;
  videoId: any;
  videolink: any;
  trustedVideoUrl!: SafeResourceUrl;
  videos: any = []
  constructor(public router: Router,
    public user: UserService,
    public api: ApiService,
    public sanitizer: DomSanitizer,
    public activatedroute: ActivatedRoute) {

  }

  ngOnInit() {
    this.pagecomig = this.activatedroute.snapshot.params['pagecoming']
    console.log(this.pagecomig);
    // this.link = 'https://www.youtube.com/embed/l0eM1_JVqHE'
    // this.videolink = this.sanitizer.bypassSecurityTrustResourceUrl(this.link)
    this.systemsettings()
  }

  systemsettings() {
    this.api.getRequest('system_settings').subscribe((res: any) => {
      console.log(res);

      res.data.map((value: any, index: any) => {
        if (
          value.type == "guidelines_video"

        ) {
          // this.link = 'https://www.youtube.com/embed/l0eM1_JVqHE'
          // this.videolink = this.sanitizer.bypassSecurityTrustResourceUrl(value.description)
          let link = value.description
          let split = link.split('https://www.youtube.com/watch?v=');
          let videolinkurl = split[1]
          this.videoId = 'https://www.youtube.com/embed/' + videolinkurl

          this.videolink = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoId);
          let data = {

            link: this.videolink,

          }
          this.videos.push(data);

        }
        if (
          value.type == "guidelines"
        ) {
          this.text = value.description
          console.log(this.text);
        }

      });

    })
  }




  setupProfile() {
    this.router.navigate(['/setup-profile']);
  }
}
