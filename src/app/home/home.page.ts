import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperModule, Ng2SearchPipeModule]
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  choice1 = false;
  choice2 = true;
  choice3 = false;
  categories: any;
  selectedSurveyId: any;
  ans = [{ ans1: 'chinese' }, { ans1: 'Itlian' }, { ans1: 'tokoyo' }]
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
  ansintext: any = '';
  categoryname: any;
  categoryitem = false;
  constructor(public router: Router,
    public user: UserService,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.user.loginVal = true;
    this.getCategories()
    this.getsurveylists()
  }
  ionViewWillLeave() {
    this.categoryitem = false;
  }

  getCategories() {
    this.api.getRequest('survey_categories').subscribe((res: any) => {
      console.log('categoreis=====', res);
      if (res.status == 'success') {
        this.categories = res.data
      }
      else {
        this.extra.presentToast(res.message)
      }
    })
  }
  getsurveylists() {
    let data = {
      "users_customers_id": localStorage.getItem('loggedId')
    }
    this.api.sendRequest('survey_list_top', data).subscribe((res: any) => {
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
  allSurevy() {
    let data = {
      "users_customers_id": localStorage.getItem('loggedId')
    }
    this.api.sendRequest('survey_list_top', data).subscribe((res: any) => {
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
  surveyById(item: any) {
    this.categoryitem = true
    console.log('obj taken====', item);
    this.categoryname = item.name
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

  saveChoice(ans: any) {

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
        this.getsurveylists()
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
      this.getsurveylists()
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


  getanswersvalues(val: any, index: any) {
    console.log('item obj====', val);


  }
  goto() {
    if (this.currentIndex < this.questionlist.length) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }



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

  updateChoice(val: any) {
    if (val == 1) {
      this.choice1 = true;
      this.choice2 = false;
      this.choice3 = false;
    } else if (val == 2) {
      this.choice1 = false;
      this.choice2 = true;
      this.choice3 = false;
    } else {
      this.choice1 = false;
      this.choice2 = false;
      this.choice3 = true;
    }
  }

  sendText() {

  }


  handleChange(event: any) {
    // this.result = []
    // console.log('Event: ',event);

    // const query = event.target.value.toLowerCase();
    // console.log('query: ',query);

    // if(query == ''){
    //   this.showContent = true;

    // }
    // if(query != ''){
    //   let data = {
    //     users_customers_id:this.checkUser.appUserId,
    //     keyword:query
    //   };
    //   this.api.showLoading();
    //   this.api.sendRequest('getCarsByFiltersByName',data).subscribe((res:any)=>{
    //     console.log("Response: ",res);
    //     this.api.hideLoading();
    //     if(res.status == 'success'){
    //       this.showContent = false;
    //       this.result = res.data;

    //     }else if(res.status == 'error'){
    //       if(res.message != 'Keyword Required'){
    //         this.api.presentToast(res.message);
    //       }

    //     }else{

    //     }

    //   },(err)=>{
    //     this.api.hideLoading();
    //     console.log("API Call Error: ",err);

    //   })
    // }

  }

  clearResult() {
    // this.result = []
    // this.showContent = true;
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
