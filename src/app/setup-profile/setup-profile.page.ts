import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SetupProfilePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  constructor(public router:Router) { }

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // confirm() {
  //   this.modal.dismiss(this.name, 'confirm');
  // }

  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }
  
  saveProfile(){
    this.router.navigate(['/social-links']);
  }
}
