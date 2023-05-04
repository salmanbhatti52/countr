import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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
    { title: 'Profile', url: 'profile', icon: 'paper-plane' },
    { title: 'Customer Support', url: 'customer-support', icon: 'mail' },
    { title: 'Change Password', url: 'changepassword', icon: 'archive' },
    { title: 'Logout', icon: 'trash' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router: Router) {

  }

  ngOnInit() {
    console.log('loggedId====', localStorage.getItem('loggedId'));

    if (localStorage.getItem('loggedId') == null) {
      this.router.navigate(['welcome'])
    } else {
      this.router.navigate(['home'])
    }
  }

  pages(p: any) {
    if (p.title == 'Logout') {
      this.router.navigate(['login']);
      localStorage.removeItem('loggedId')
    }
  }
}
