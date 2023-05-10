import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BlogPage implements OnInit {
  show = false;
  blogs: any;
  countertext: any;
  activeIndex: any;
  showfulltext = false;
  value = false;
  text = 'WOrld CUp 2023WOrld CUp 2023WOrld CUp 2023WOrld CUp 2023WOrld CUp 2023WOrld CUp 2023WOrld CUp 2023WOrld CUp 2023 2023WOrld CUp 2023 '
  constructor(public user: UserService,
    public router: Router,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.systemsettings()
    this.api.getRequest('blogs_list').subscribe((res: any) => {
      console.log('blog list', res);
      this.blogs = res.data
    })

    let getlength = this.text.length
    console.log(getlength);

  }

  systemsettings() {
    this.api.getRequest('system_settings').subscribe((res: any) => {
      console.log(res);

      res.data.map((value: any, index: any) => {
        if (
          value.type == "eco_countr"
        ) {
          this.countertext = value.description

        }

      });

    })
  }

  readmore(index: any) {
    console.log('active index', index);


    if (this.activeIndex = index) {
      this.showfulltext = true
      this.value = true
    }
    // if (this.show == true) {
    //   this.show = false
    // } else {
    //   this.show = true
    // }
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
