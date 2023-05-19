import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PartnersPage implements OnInit {
  partners: any;

  constructor(public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.getpartners()
  }

  getpartners() {

    this.api.getRequest('partners_list').subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {

        this.partners = res.data
      }

    })
  }

  goto(item: any) {
    console.log(item);
    this.navCtrl.navigateForward(['partnersurveys', {
      users_partners_id: item.users_partners_id
    }])
  }

}
