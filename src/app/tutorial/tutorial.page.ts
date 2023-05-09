import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';


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
  videolink: any;
  link: any;

  constructor(public router: Router,
    public user: UserService,
    public api: ApiService,
    public sanitizer: DomSanitizer,
    public activatedroute: ActivatedRoute) {
    this.systemsettings()
  }

  ngOnInit() {
    this.pagecomig = this.activatedroute.snapshot.params['pagecoming']
    console.log(this.pagecomig);
    // this.link = 'https://www.youtube.com/embed/l0eM1_JVqHE'
    // this.videolink = this.sanitizer.bypassSecurityTrustResourceUrl(this.link)

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
          let split = link.split('https://youtu.be/')
          console.log(split);

          let videolinkurl = split[1]
          this.photoURL(videolinkurl)
          console.log('original link', value.description);


        }
        if (
          value.type == "guidelines"
        ) {
          this.text = value.description
          console.log(this.text);
        }

      });
      console.log(this.videolink);
    })
  }


  photoURL(item: any) {


    let url = 'https://www.youtube.com/embed/' + item;
    console.log('iframe url', url);
    this.videolink = this.sanitizer.bypassSecurityTrustResourceUrl(url);


  }

  setupProfile() {
    this.router.navigate(['/setup-profile']);
  }
}
