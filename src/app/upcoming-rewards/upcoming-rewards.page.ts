import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-upcoming-rewards',
  templateUrl: './upcoming-rewards.page.html',
  styleUrls: ['./upcoming-rewards.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpcomingRewardsPage implements OnInit {
  checked!: boolean;
  constructor(public router:Router,
    public location:Location,
    public user:UserService) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goBack(){
    this.location.back();
  }
  
  sendChkBoxVal(ev:any){
    console.log(ev);
    this.checked = ev.detail.checked;
    console.log(this.checked);
    
  }
}
