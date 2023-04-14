import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TutorialPage implements OnInit {

  constructor(public router:Router,
    public user:UserService) { }

  ngOnInit() {
  }

  setupProfile(){
    this.router.navigate(['/setup-profile']);
  }
}
