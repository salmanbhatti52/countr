import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginVal = false;
  googleuserdetail: any;
  constructor(public router: Router,
    public location: Location) { }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goBack() {
    this.location.back();
  }
}
