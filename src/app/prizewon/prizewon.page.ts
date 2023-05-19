import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-prizewon',
  templateUrl: './prizewon.page.html',
  styleUrls: ['./prizewon.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrizewonPage implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
