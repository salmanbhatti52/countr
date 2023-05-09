"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9126],{9126:(w,_,l)=>{l.r(_),l.d(_,{OtpPage:()=>I});var u=l(6895),p=l(433),g=l(7173),e=l(8256);function d(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"input",3,4),e.NdJ("paste",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.handlePaste(o))})("keyup",function(o){const m=e.CHM(t).index,f=e.oxw(2);return e.KtG(f.onKeyUp(o,m))})("input",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.onInput(o))})("keydown",function(o){const m=e.CHM(t).index,f=e.oxw(2);return e.KtG(f.onKeyDown(o,m))}),e.qZA()}if(2&i){const t=s.$implicit,n=s.index,o=e.oxw(2);e.Gre("otp-input ",o.config.inputClass,""),e.hYB("id","otp_",n,"_",o.componentKey,""),e.Q6J("pattern",o.config.allowNumbersOnly?"\\d*":"")("type",o.inputType)("placeholder",(null==o.config?null:o.config.placeholder)||"")("ngStyle",o.config.inputStyles)("formControl",o.otpForm.controls[t])}}function y(i,s){if(1&i&&(e.TgZ(0,"div",1),e.YNc(1,d,2,10,"input",2),e.ALo(2,"keys"),e.qZA()),2&i){const t=e.oxw();e.Gre("ng-otp-input-wrapper wrapper ",t.config.containerClass,""),e.MGl("id","c_",t.componentKey,""),e.Q6J("ngStyle",t.config.containerStyles),e.xp6(1),e.Q6J("ngForOf",e.lcZ(2,6,null==t.otpForm?null:t.otpForm.controls))}}class a{static ifBackspaceOrDelete(s){return this.ifKey(s,"Backspace;Delete;Del")}static ifRightArrow(s){return this.ifKey(s,"ArrowRight;Right")}static ifLeftArrow(s){return this.ifKey(s,"ArrowLeft;Left")}static ifSpacebar(s){return this.ifKey(s,"Spacebar; ")}static ifKey(s,t){return t.split(";").some(o=>o===s.key)}}let c=(()=>{class i{transform(t){return Object.keys(t)}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275pipe=e.Yjl({name:"keys",type:i,pure:!0}),i})(),h=(()=>{class i{constructor(t){this.keysPipe=t,this.config={length:4},this.onInputChange=new e.vpe,this.inputControls=new Array(this.config.length),this.componentKey=Math.random().toString(36).substring(2)+(new Date).getTime().toString(36)}get inputType(){var t,n;return null!==(t=this.config)&&void 0!==t&&t.isPasswordInput?"password":null!==(n=this.config)&&void 0!==n&&n.allowNumbersOnly?"tel":"text"}ngOnInit(){this.otpForm=new p.cw({});for(let t=0;t<this.config.length;t++)this.otpForm.addControl(this.getControlName(t),new p.NI);this.otpForm.valueChanges.subscribe(t=>{this.keysPipe.transform(this.otpForm.controls).forEach(n=>{var o=this.otpForm.controls[n].value;o&&o.length>1&&(o.length>=this.config.length?this.setValue(o):this.rebuildValue())})})}ngAfterViewInit(){if(!this.config.disableAutoFocus){const t=document.getElementById(`c_${this.componentKey}`);if(t){const n=t.getElementsByClassName("otp-input")[0];n&&n.focus&&n.focus()}}}getControlName(t){return`ctrl_${t}`}onKeyDown(t,n){if(a.ifSpacebar(t))return t.preventDefault(),!1}onInput(t){if(this.config.allowNumbersOnly&&!this.validateNumber(this.currentVal?`${this.currentVal}${t.target.value}`:t.target.value))return t.target.value="",t.stopPropagation(),void t.preventDefault()}onKeyUp(t,n){const o=this.appendKey(`otp_${n+1}`),r=this.appendKey("otp_"+(n-1));return a.ifRightArrow(t)?(t.preventDefault(),void this.setSelected(o)):a.ifLeftArrow(t)?(t.preventDefault(),void this.setSelected(r)):a.ifBackspaceOrDelete(t)&&!t.target.value?(this.setSelected(r),void this.rebuildValue()):void(t.target.value&&(this.ifValidKeyCode(t)&&this.setSelected(o),this.rebuildValue()))}validateNumber(t){return t&&/^\d*\.?\d*$/.test(t)}appendKey(t){return`${t}_${this.componentKey}`}setSelected(t){this.focusTo(t);const n=document.getElementById(t);n&&n.setSelectionRange&&setTimeout(()=>{n.setSelectionRange(0,1)},0)}ifValidKeyCode(t){const n=t.key;return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||/[a-zA-Z0-9-_]/.test(n)||this.config.allowKeyCodes&&this.config.allowKeyCodes.includes(t.keyCode)}focusTo(t){const n=document.getElementById(t);n&&n.focus()}setValue(t){if(!this.config.allowNumbersOnly||!isNaN(t)){if(this.otpForm.reset(),!t)return void this.rebuildValue();if(t=t.toString().replace(/\s/g,""),Array.from(t).forEach((o,r)=>{this.otpForm.get(this.getControlName(r))&&this.otpForm.get(this.getControlName(r)).setValue(o)}),!this.config.disableAutoFocus){const o=document.getElementById(`c_${this.componentKey}`);var n=t.length<this.config.length?t.length:this.config.length-1;let r=o.getElementsByClassName("otp-input")[n];r&&r.focus&&r.focus()}this.rebuildValue()}}rebuildValue(){var t;let n="";this.keysPipe.transform(this.otpForm.controls).forEach(o=>{if(this.otpForm.controls[o].value){let r=this.otpForm.controls[o].value,m=r.length>1,f=!this.config.allowNumbersOnly&&this.config.letterCase&&("upper"==this.config.letterCase.toLocaleLowerCase()||"lower"==this.config.letterCase.toLocaleLowerCase());r=r[0];let C=f?"upper"==this.config.letterCase.toLocaleLowerCase()?r.toUpperCase():r.toLowerCase():r;f&&C==r?f=!1:r=C,n+=r,(m||f)&&this.otpForm.controls[o].setValue(r)}}),!(null===(t=this.formCtrl)||void 0===t)&&t.setValue&&this.formCtrl.setValue(n),this.onInputChange.emit(n),this.currentVal=n}handlePaste(t){let n=t.clipboardData||window.clipboardData;if(n)var o=n.getData("Text");t.stopPropagation(),t.preventDefault(),o&&(!this.config.allowNumbersOnly||this.validateNumber(o))&&this.setValue(o)}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(c))},i.\u0275cmp=e.Xpm({type:i,selectors:[["ng-otp-input"]],inputs:{config:"config",formCtrl:"formCtrl"},outputs:{onInputChange:"onInputChange"},decls:1,vars:1,consts:[[3,"class","id","ngStyle",4,"ngIf"],[3,"id","ngStyle"],["autocomplete","one-time-code",3,"pattern","type","placeholder","ngStyle","class","formControl","id","paste","keyup","input","keydown",4,"ngFor","ngForOf"],["autocomplete","one-time-code",3,"pattern","type","placeholder","ngStyle","formControl","id","paste","keyup","input","keydown"],["inp",""]],template:function(t,n){1&t&&e.YNc(0,y,3,8,"div",0),2&t&&e.Q6J("ngIf",null==n.otpForm?null:n.otpForm.controls)},dependencies:[u.O5,u.PC,u.sg,p.Fj,p.c5,p.JJ,p.oH,c],styles:[".otp-input[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]:not(:last-child){margin-right:8px}@media screen and (max-width: 767px){.otp-input[_ngcontent-%COMP%]{width:40px;font-size:24px;height:40px}}@media screen and (max-width: 420px){.otp-input[_ngcontent-%COMP%]{width:30px;font-size:18px;height:30px}}"]}),i})(),v=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({providers:[c],imports:[[u.ez,p.u5,p.UX]]}),i})();var x=l(1407),b=l(9953);const O=function(){return{length:4,allowNumbersOnly:!0}};let I=(()=>{class i{constructor(t,n,o,r){this.router=t,this.extra=n,this.location=o,this.menuCtrl=r}ionViewDidEnter(){this.menuCtrl.enable(!1)}ionViewWillLeave(){this.menuCtrl.enable(!0)}goback(){this.location.back()}ngOnInit(){this.userEmail=localStorage.getItem("emailonforgot")}goNext(){localStorage.getItem("otp")==this.otp?this.router.navigate(["resetpassword"]):this.extra.presentToast("OTP doesn't match")}onOtpChange(t){console.log(t,"eventevent"),this.otp=t}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(x.F0),e.Y36(b.e),e.Y36(u.Ye),e.Y36(g._q))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-otp"]],standalone:!0,features:[e.jDz],decls:13,vars:4,consts:[[3,"fullscreen"],["src","../../assets/images/back.png",2,"width","32px","margin","20px 0px 0px 10px",3,"click"],[1,"wrapper"],[2,"margin-top","10px","width","100%","text-align","center"],["src","../../assets/images/time_management.png","alt",""],[1,"top_heading","sf_pro_display","clr_white"],[1,"top_heading","sf_pro_display","clr_white",2,"font-size","20px !important"],[2,"display","flex","justify-content","center","margin-top","10%"],[3,"config","onInputChange"],["expand","block","size","large",1,"btn","sf_pro_display","btn_solid_primary","c-btn",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"ion-content",0)(1,"img",1),e.NdJ("click",function(){return n.goback()}),e.qZA(),e.TgZ(2,"div",2)(3,"div",3),e._UZ(4,"img",4),e.qZA(),e.TgZ(5,"div",5),e._uU(6,"Forgot Password?"),e.qZA(),e.TgZ(7,"div",6),e._uU(8),e.qZA(),e.TgZ(9,"ion-row",7)(10,"ng-otp-input",8),e.NdJ("onInputChange",function(r){return n.onOtpChange(r)}),e.qZA()(),e.TgZ(11,"ion-button",9),e.NdJ("click",function(){return n.goNext()}),e._uU(12,"Reset"),e.qZA()()()),2&t&&(e.Q6J("fullscreen",!0),e.xp6(8),e.hij("Please enter 4 digit code you received on ",n.userEmail,""),e.xp6(2),e.Q6J("config",e.DdM(3,O)))},dependencies:[g.Pc,g.YG,g.W2,g.Nd,u.ez,p.u5,v,h],styles:["ion-content[_ngcontent-%COMP%]{background-color:#000;--background: url(backgruond_img.d2ba74b1ba0db96d.svg) no-repeat center center / cover}.wrapper[_ngcontent-%COMP%]{width:90%;margin:0% auto}.c-btn[_ngcontent-%COMP%]{width:90%;position:fixed;bottom:35px}"]}),i})()},9953:(w,_,l)=>{l.d(_,{e:()=>e});var u=l(5861),p=l(8256),g=l(7173);let e=(()=>{class d{constructor(a,c){this.toastCtrl=a,this.loadingCtrl=c}presentToast(a){var c=this;return(0,u.Z)(function*(){return c.toast=!0,yield c.toastCtrl.create({message:a,duration:2e3,position:"bottom"}).then(h=>{h.present().then(()=>{console.log("presented"),c.toast||h.dismiss().then(()=>console.log("abort presenting"))})})})()}loadershow(a){var c=this;return(0,u.Z)(function*(){c.loadingCtrl.create({cssClass:"loadingdiv",message:""}).then(h=>{h.present()})})()}hideLoader(){this.loadingCtrl.dismiss().then(a=>{console.log("Loading dismissed!",a)}).catch(a=>{console.log("error",a)})}}return d.\u0275fac=function(a){return new(a||d)(p.LFG(g.yF),p.LFG(g.HT))},d.\u0275prov=p.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()}}]);