import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.page.html',
  styleUrls: ['./deleteaccount.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DeleteaccountPage implements OnInit {
  name: any;

  Checkboxes = [{ question: 'I concerned about my personal data', isItemChecked: false }, { question: 'I have another  Countr account', isItemChecked: false },
  { question: 'I want to remove app from my mobile', isItemChecked: false }, { question: 'I get too many emails from Countr', isItemChecked: false }, { question: 'Other', isItemChecked: false }];

  selectquestions: any[] = [];
  constructor(public extra: ExtraService) { }

  ngOnInit() {
  }
  verifyEvent(ev: any) {
    console.log(ev);
    if (ev.isItemChecked == true) {
      this.selectquestions.push(ev.question)
      console.log('selectquestions aray', this.selectquestions)
    }
    if (ev.isItemChecked == false) {

      const index = this.selectquestions.indexOf(ev.question);
      if (index > -1) {
        this.selectquestions.splice(index, 1); // 2nd parameter means remove one item only
        console.log('job aray', this.selectquestions)
      }

    }
  }

  delete() {
    if (this.selectquestions.length == 0) {
      this.extra.presentToast('Please Choose atleast one')
    } else {

      this.extra.presentToast("Your account will be deleted in 24 hour's")
    }


  }

}
