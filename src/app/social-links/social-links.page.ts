import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.page.html',
  styleUrls: ['./social-links.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SocialLinksPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  gotoHomePage(){
    this.router.navigate(['/home']);
  }

}
