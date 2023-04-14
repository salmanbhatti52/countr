import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(public router: Router,
    public user:UserService) { }

  ngOnInit() {
  }

  login(){
    this.user.loginVal = true;
    this.router.navigate(['/home']);
  }
  goForSignup(){
    this.router.navigate(['/signup']);
  }

}
