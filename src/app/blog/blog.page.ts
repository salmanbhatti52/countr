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
  factiveIndex: any;
  showfulltext = false;
  value = false;
  blogs_list_featured: any;

  constructor(public user: UserService,
    public router: Router,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.systemsettings()
    this.featuredblog()
    this.api.getRequest('blogs_list').subscribe((res: any) => {
      console.log('blog list', res);
      this.blogs = res.data
    })



  }
  featuredblog() {
    this.api.getRequest('blogs_list_featured').subscribe((res: any) => {
      console.log('blog list', res);
      this.blogs_list_featured = res.data
    })
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
  freadmore(index: any) {
    console.log('active index', index);


    if (this.factiveIndex = index) {
      this.showfulltext = true
      this.value = true
    }

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
