import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperModule, Ng2SearchPipeModule]
})
export class ExplorePage implements OnInit {
  choice1 = false;
  choice2 = true;
  choice3 = false;
  slide1 = false;
  slide2 = false;
  slide3 = false;
  slide4 = false;
  slide5 = false;

  selectedSurveyId: any;
  surveylists: any;
  answers: any;
  questionlist: any;
  selectedOption: any;
  isdown = false;
  singleValue: any = '';
  currentIndex = 0;
  questionname: any;
  questionslength = 0;
  questionsLength = 0;
  questionIndex = 0;
  selectedSurveyIndex: any;
  btnValue = 'Next'
  userSelectedSurvey: any;
  ansval: any;
  survey_list_qs_answers_id: any;
  multiansarr: any = [];
  multival: any = '';
  term: any;
  categories: any;
  firstactive = true;
  ansintext: any = ''
  activeIndex: any;
  constructor(public router: Router,
    public user: UserService,
    public extra: ExtraService,
    public api: ApiService) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getCategories()
    this.getsurveylists()
  }
  getCategories() {
    this.api.getRequest('survey_categories').subscribe((res: any) => {
      this.categories = res.data


    })
  }
  getsurveylists() {
    this.api.sendRequest('survey_list', { "users_customers_id": localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('survey_list=====', res);
      this.surveylists = res.data
      if (res.status == 'success') {
        this.extra.hideLoader()

      } else {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
    })
  }
  AllSurvey() {
    this.firstactive = true
    this.activeIndex = -1
    this.api.sendRequest('survey_list', { "users_customers_id": localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('survey_list=====', res);
      this.surveylists = res.data
      if (res.status == 'success') {
        this.extra.hideLoader()

      } else {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
    })
  }
  surveyById(item: any, index: any) {
    console.log('obj taken====', item);
    this.firstactive = false;
    this.activeIndex = index;
    let data = {
      "users_customers_id": localStorage.getItem('loggedId'),
      "survey_categories_id": item.survey_categories_id
    }
    this.api.sendRequest('survey_list_by_category_id', data).subscribe((res: any) => {
      console.log('survey_list_top=====', res);
      this.surveylists = res.data
      if (res.status == 'success') {
        this.extra.hideLoader()

      } else {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
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
        this.getsurveylists()
        this.multiansarr = []
      })

    } else {
      this.extra.presentToast('Please select an option')
    }





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
  singletextAns(val: any) {
    let data = {
      survey_list_qs_id: val.survey_list_qs_id,
      survey_list_qs_answers_id: 0,
      answer: this.ansintext
    }
    this.multiansarr.push(data)
    this.questionIndex++;
    let senddata = JSON.stringify({
      survey_list_id: this.userSelectedSurvey.survey_list_id,
      users_customers_id: localStorage.getItem('loggedId'),
      survey_list_qs_answers: this.multiansarr

    })
    this.extra.loadershow()
    this.api.sendRequest('survey_list_reponses', senddata).subscribe((res: any) => {
      console.log('survey_list_reponses', res);
      this.multiansarr = [];
      this.getsurveylists()
    })
  }





  sendText() {

  }

  handleChange(event: any) {


  }

  clearResult() {

  }

  homeTab() {
    this.router.navigate(['/home']);
  }

  exploreTab() {
    this.router.navigate(['/explore']);
  }

  supportTab() {
    this.router.navigate(['/blog']);
  }

  profileTab() {
    this.router.navigate(['/profile']);
  }
}
