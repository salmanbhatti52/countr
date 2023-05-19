import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { UserService } from '../api/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partnersurveys',
  templateUrl: './partnersurveys.page.html',
  styleUrls: ['./partnersurveys.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PartnersurveysPage implements OnInit {
  partnersurveys: any;
  users_partners_id: any;
  answers: any;
  questionlist: any;

  singleValue: any = '';
  currentIndex = 0;

  questionslength = 0;

  questionIndex = 0;
  selectedSurveyIndex: any;
  btnValue = 'Next'
  userSelectedSurvey: any;
  ansval: any;
  survey_list_qs_answers_id: any;
  multiansarr: any = [];
  multival: any = '';

  ansintext: any = '';

  selectedSurveyId: any;
  constructor(public api: ApiService,
    public extra: ExtraService,
    public user: UserService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.users_partners_id = this.activatedRoute.snapshot.params['users_partners_id']
    this.getpartnerssurvey()
  }
  getpartnerssurvey() {
    let data = {
      "users_customers_id": localStorage.getItem('loggedId'),
      "users_partners_id": this.users_partners_id
    }
    this.api.sendRequest('partners_list_surveys', data).subscribe((res: any) => {
      console.log(res);
      this.extra.hideLoader()
      this.partnersurveys = res.data
    })
  }

  selectsurvey(val: any, index: any) {
    if (val.survey_attempt_status == "Completed") {
      this.extra.presentToast('You have already submitted your answer');
    } else {
      this.questionlist = [];
      this.singleValue = '';
      this.multival = ''
      this.questionIndex = 0;


      this.selectedSurveyIndex = index;

      console.log("user_selectedSurveyIndex: ", this.selectedSurveyIndex);
      console.log("user_selected_survey: ", val);
      this.userSelectedSurvey = val;
      this.selectedSurveyId = val.survey_list_id;
      this.api.sendRequest('survey_list_questions', { "survey_list_id": val.survey_list_id }).subscribe((res: any) => {
        console.log('survey_list_questions=====', res);

        this.questionlist = res.data
        this.questionslength = this.questionlist.length
        this.answers = this.questionlist[this.currentIndex].answers
        if (this.questionlist.length == 1) {
          this.btnValue = 'Done'
        } else {
          this.btnValue = 'Next'
        }




      })

    }
  }



  UpdateQuestionIndex() {
    console.log(this.multiansarr);
    if (this.multiansarr.length != 0) {
      this.questionIndex++;
      if (this.questionlist.length - 1 == this.questionIndex) {
        this.btnValue = 'Done'

      }
      let data = JSON.stringify({
        survey_list_id: this.userSelectedSurvey.survey_list_id,
        users_customers_id: localStorage.getItem('loggedId'),
        survey_list_qs_answers: this.multiansarr

      })
      this.extra.loadershow()
      this.api.sendRequest('survey_list_reponses', data).subscribe((res: any) => {
        console.log('survey_list_reponses', res);
        this.multiansarr = []
        this.getpartnerssurvey()
      })

    } else {
      this.extra.presentToast('Please select an option')
    }





  }
  singletextAns(val: any) {
    console.log('single ans val', val);
    this.questionIndex++;
    let data = {
      survey_list_qs_id: val.survey_list_qs_id,
      survey_list_qs_answers_id: 0,
      answer: this.ansintext
    }
    this.multiansarr.push(data)

    let senddata = JSON.stringify({
      survey_list_id: this.userSelectedSurvey.survey_list_id,
      users_customers_id: localStorage.getItem('loggedId'),
      survey_list_qs_answers: this.multiansarr

    })
    this.extra.loadershow()
    this.api.sendRequest('survey_list_reponses', senddata).subscribe((res: any) => {
      console.log('survey_list_reponses', res);
      this.multiansarr = []
      this.getpartnerssurvey()
    })
  }
  mcqAnswer(ev: any) {
    // this.multiansarr = [];
    console.log(ev);
    this.singleValue = ev.detail.value
    // this.ansval = this.selectedValue.name
    // this.survey_list_qs_answers_id = this.selectedValue.survey_list_qs_answers_id
    let data = {
      survey_list_qs_id: this.singleValue.survey_list_qs_id,
      survey_list_qs_answers_id: this.singleValue.survey_list_qs_answers_id,
      answer: this.singleValue.name
    }
    this.multiansarr.push(data)
  }
  checkboxClick(event: any) {
    // this.multiansarr = [];
    console.log('event', event);
    this.multival = event.detail.value
    let data = {
      survey_list_qs_id: this.multival.survey_list_qs_id,
      survey_list_qs_answers_id: this.multival.survey_list_qs_answers_id,
      answer: this.multival.name
    }
    var rowId = data;
    var checked = event.detail.checked;
    if (checked == true) {
      this.multiansarr.push(rowId)
      console.log('multiansarr', this.multiansarr);
    } else {
      var index = this.multiansarr.indexOf(rowId);
      this.multiansarr.splice(index, 1);
      console.log('multiansarr', this.multiansarr);
    }



  }
}
