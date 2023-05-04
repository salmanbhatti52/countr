"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2316],{7423:(q,M,c)=>{c.d(M,{Uw:()=>g,fo:()=>_});var l=c(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var n=(()=>{return(r=n||(n={})).Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE",n;var r})();class G extends Error{constructor(e,t,i){super(e),this.message=e,this.code=t,this.data=i}}const H=r=>{var e,t,i,a,o;const u=r.CapacitorCustomPlatform||null,s=r.Capacitor||{},h=s.Plugins=s.Plugins||{},f=r.CapacitorPlatforms,S=(null===(e=null==f?void 0:f.currentPlatform)||void 0===e?void 0:e.getPlatform)||(()=>null!==u?u.name:(r=>{var e,t;return null!=r&&r.androidBridge?"android":null!==(t=null===(e=null==r?void 0:r.webkit)||void 0===e?void 0:e.messageHandlers)&&void 0!==t&&t.bridge?"ios":"web"})(r)),le=(null===(t=null==f?void 0:f.currentPlatform)||void 0===t?void 0:t.isNativePlatform)||(()=>"web"!==S()),de=(null===(i=null==f?void 0:f.currentPlatform)||void 0===i?void 0:i.isPluginAvailable)||(m=>{const p=V.get(m);return!!(null!=p&&p.platforms.has(S())||X(m))}),X=(null===(a=null==f?void 0:f.currentPlatform)||void 0===a?void 0:a.getPluginHeader)||(m=>{var p;return null===(p=s.PluginHeaders)||void 0===p?void 0:p.find(W=>W.name===m)}),V=new Map,pe=(null===(o=null==f?void 0:f.currentPlatform)||void 0===o?void 0:o.registerPlugin)||((m,p={})=>{const W=V.get(m);if(W)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),W.proxy;const k=S(),I=X(m);let Z;const he=function(){var v=(0,l.Z)(function*(){return!Z&&k in p?Z=Z="function"==typeof p[k]?yield p[k]():p[k]:null!==u&&!Z&&"web"in p&&(Z=Z="function"==typeof p.web?yield p.web():p.web),Z});return function(){return v.apply(this,arguments)}}(),Y=v=>{let b;const L=(...T)=>{const x=he().then(w=>{const A=((v,b)=>{var L,T;if(!I){if(v)return null===(T=v[b])||void 0===T?void 0:T.bind(v);throw new G(`"${m}" plugin is not implemented on ${k}`,n.Unimplemented)}{const x=null==I?void 0:I.methods.find(w=>b===w.name);if(x)return"promise"===x.rtype?w=>s.nativePromise(m,b.toString(),w):(w,A)=>s.nativeCallback(m,b.toString(),w,A);if(v)return null===(L=v[b])||void 0===L?void 0:L.bind(v)}})(w,v);if(A){const J=A(...T);return b=null==J?void 0:J.remove,J}throw new G(`"${m}.${v}()" is not implemented on ${k}`,n.Unimplemented)});return"addListener"===v&&(x.remove=(0,l.Z)(function*(){return b()})),x};return L.toString=()=>`${v.toString()}() { [capacitor code] }`,Object.defineProperty(L,"name",{value:v,writable:!1,configurable:!1}),L},ee=Y("addListener"),te=Y("removeListener"),Pe=(v,b)=>{const L=ee({eventName:v},b),T=function(){var w=(0,l.Z)(function*(){const A=yield L;te({eventName:v,callbackId:A},b)});return function(){return w.apply(this,arguments)}}(),x=new Promise(w=>L.then(()=>w({remove:T})));return x.remove=(0,l.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield T()}),x},N=new Proxy({},{get(v,b){switch(b){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return I?Pe:ee;case"removeListener":return te;default:return Y(b)}}});return h[m]=N,V.set(m,{name:m,proxy:N,platforms:new Set([...Object.keys(p),...I?[k]:[]])}),N});return s.convertFileSrc||(s.convertFileSrc=m=>m),s.getPlatform=S,s.handleError=m=>r.console.error(m),s.isNativePlatform=le,s.isPluginAvailable=de,s.pluginMethodNoop=(m,p,W)=>Promise.reject(`${W} does not have an implementation of "${p}".`),s.registerPlugin=pe,s.Exception=G,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s.platform=s.getPlatform(),s.isNative=s.isNativePlatform(),s},U=(r=>r.Capacitor=H(r))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),_=U.registerPlugin;class g{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){var i=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o);const u=function(){var h=(0,l.Z)(function*(){return i.removeListener(e,t)});return function(){return h.apply(this,arguments)}}(),s=Promise.resolve({remove:u});return Object.defineProperty(s,"remove",{value:(h=(0,l.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield u()}),function(){return h.apply(this,arguments)})}),s;var h}removeAllListeners(){var e=this;return(0,l.Z)(function*(){e.listeners={};for(const t in e.windowListeners)e.removeWindowListener(e.windowListeners[t]);e.windowListeners={}})()}notifyListeners(e,t){const i=this.listeners[e];i&&i.forEach(a=>a(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:i=>{this.notifyListeners(t,i)}}}unimplemented(e="not implemented"){return new U.Exception(e,n.Unimplemented)}unavailable(e="not available"){return new U.Exception(e,n.Unavailable)}removeListener(e,t){var i=this;return(0,l.Z)(function*(){const a=i.listeners[e];if(!a)return;const o=a.indexOf(t);i.listeners[e].splice(o,1),i.listeners[e].length||i.removeWindowListener(i.windowListeners[e])})()}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const E=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),R=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ne extends g{getCookies(){return(0,l.Z)(function*(){const e=document.cookie,t={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[a,o]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");a=R(a).trim(),o=R(o).trim(),t[a]=o}),t})()}setCookie(e){return(0,l.Z)(function*(){try{const t=E(e.key),i=E(e.value),a=`; expires=${(e.expires||"").replace("expires=","")}`,o=(e.path||"/").replace("path=",""),u=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${i||""}${a}; path=${o}; ${u};`}catch(t){return Promise.reject(t)}})()}deleteCookie(e){return(0,l.Z)(function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}})()}clearCookies(){return(0,l.Z)(function*(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})()}clearAllCookies(){var e=this;return(0,l.Z)(function*(){try{yield e.clearCookies()}catch(t){return Promise.reject(t)}})()}}_("CapacitorCookies",{web:()=>new ne});const re=function(){var r=(0,l.Z)(function*(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>{const o=a.result;t(o.indexOf(",")>=0?o.split(",")[1]:o)},a.onerror=o=>i(o),a.readAsDataURL(e)})});return function(t){return r.apply(this,arguments)}}();class ae extends g{request(e){return(0,l.Z)(function*(){const t=((r,e={})=>{const t=Object.assign({method:r.method||"GET",headers:r.headers},e),a=((r={})=>{const e=Object.keys(r);return Object.keys(r).map(a=>a.toLocaleLowerCase()).reduce((a,o,u)=>(a[o]=r[e[u]],a),{})})(r.headers)["content-type"]||"";if("string"==typeof r.data)t.body=r.data;else if(a.includes("application/x-www-form-urlencoded")){const o=new URLSearchParams;for(const[u,s]of Object.entries(r.data||{}))o.set(u,s);t.body=o.toString()}else if(a.includes("multipart/form-data")){const o=new FormData;if(r.data instanceof FormData)r.data.forEach((s,h)=>{o.append(h,s)});else for(const s of Object.keys(r.data))o.append(s,r.data[s]);t.body=o;const u=new Headers(t.headers);u.delete("content-type"),t.headers=u}else(a.includes("application/json")||"object"==typeof r.data)&&(t.body=JSON.stringify(r.data));return t})(e,e.webFetchExtra),i=((r,e=!0)=>r?Object.entries(r).reduce((i,a)=>{const[o,u]=a;let s,h;return Array.isArray(u)?(h="",u.forEach(f=>{s=e?encodeURIComponent(f):f,h+=`${o}=${s}&`}),h.slice(0,-1)):(s=e?encodeURIComponent(u):u,h=`${o}=${s}`),`${i}&${h}`},"").substr(1):null)(e.params,e.shouldEncodeUrlParams),a=i?`${e.url}?${i}`:e.url,o=yield fetch(a,t),u=o.headers.get("content-type")||"";let h,f,{responseType:s="text"}=o.ok?e:{};switch(u.includes("application/json")&&(s="json"),s){case"arraybuffer":case"blob":f=yield o.blob(),h=yield re(f);break;case"json":h=yield o.json();break;default:h=yield o.text()}const F={};return o.headers.forEach((S,z)=>{F[z]=S}),{data:h,headers:F,status:o.status,url:o.url}})()}get(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"GET"}))})()}post(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"POST"}))})()}put(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PUT"}))})()}patch(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})()}delete(e){var t=this;return(0,l.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})()}}_("CapacitorHttp",{web:()=>new ae})},997:(q,M,c)=>{c.d(M,{K:()=>y});var l=c(8256),D=c(1407),$=c(6895);let y=(()=>{class C{constructor(O,n){this.router=O,this.location=n,this.loginVal=!1}goToNotifications(){this.router.navigate(["/notifications"])}goBack(){this.location.back()}}return C.\u0275fac=function(O){return new(O||C)(l.LFG(D.F0),l.LFG($.Ye))},C.\u0275prov=l.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"}),C})()},2316:(q,M,c)=>{c.r(M),c.d(M,{LoginPage:()=>U});var l=c(5861),D=c(6895),$=c(433),y=c(7173);const j=(0,c(7423).fo)("GoogleAuth",{web:()=>c.e(7733).then(c.bind(c,7733)).then(_=>new _.GoogleAuthWeb)});var O=c(4464),n=c(8256),G=c(1407),B=c(997),H=c(5830),Q=c(9953);let U=(()=>{class _{constructor(d,g,P,E,R){this.router=d,this.menuCtrl=g,this.user=P,this.api=E,this.extra=R,this.email="",this.password=""}ngOnInit(){(0,O.n$)("capacitor")||j.initialize()}ionViewDidEnter(){this.menuCtrl.enable(!1)}ionViewWillLeave(){this.menuCtrl.enable(!0)}Loginwithgoogle(){var d=this;return(0,l.Z)(function*(){if(d.user.googleuserdetail=yield j.signIn(),d.user.googleuserdetail){console.log("user details::",d.user.googleuserdetail);let g={email:d.user.googleuserdetail.email,one_signal_id:"123456",google_access_token:d.user.googleuserdetail.authentication.accessToken,account_type:"SignupWithSocial",social_acc_type:"Google",password:"dummy",system_countries_id:"0",system_states_id:"0",status:"Active",verify_code:"dummy"};d.extra.loadershow(),d.api.sendRequest("signup_social",g).subscribe(P=>{console.log("signinresponse====",P),"success"==P.status?(d.extra.hideLoader(),localStorage.setItem("loggedId",P.data[0].users_customers_id),localStorage.setItem("userdata",JSON.stringify(P.data[0])),d.router.navigate(["/home"])):(d.extra.hideLoader(),d.extra.presentToast(P.message))},P=>{d.extra.hideLoader()})}})()}googleLogout(){var d=this;return(0,l.Z)(function*(){yield j.signOut(),d.user.googleuserdetail=null})()}login(){this.user.loginVal=!0;let d={email:this.email,password:this.password};""==this.email?this.extra.presentToast("Please enter your email"):""==this.password?this.extra.presentToast("Please enter password"):(this.extra.loadershow(),this.api.sendRequest("signin",d).subscribe(g=>{console.log("signinresponse====",g),"success"==g.status?(this.extra.hideLoader(),localStorage.setItem("loggedId",g.data.users_customers_id),localStorage.setItem("userdata",JSON.stringify(g.data)),this.router.navigate(["/home"])):(this.extra.hideLoader(),this.extra.presentToast(g.message))},g=>{this.extra.hideLoader()}))}goForSignup(){this.router.navigate(["/signup"])}forgot(){this.router.navigate(["/forgotpassword"])}}return _.\u0275fac=function(d){return new(d||_)(n.Y36(G.F0),n.Y36(y._q),n.Y36(B.K),n.Y36(H.s),n.Y36(Q.e))},_.\u0275cmp=n.Xpm({type:_,selectors:[["app-login"]],standalone:!0,features:[n.jDz],decls:31,vars:3,consts:[[3,"fullscreen"],[1,"container"],[1,"center"],["src","../../assets/images/time_management.png","alt",""],[1,"top_heading","sf_pro_display","clr_white"],[1,"input_lbl","clr_white","sf_pro_display"],["type","email","inputmode","email","placeholder","Email",1,"sf_pro_display","mgt_10",3,"ngModel","ngModelChange"],[1,"input_lbl","clr_white","sf_pro_display","mgt_25"],["type","password","inputmode","text","placeholder","*******",1,"sf_pro_display","mgt_10",3,"ngModel","ngModelChange"],[1,"mgt_20","input_lbl",3,"click"],[1,"clr_white","mgr_4","sf_pro_display"],[1,"clr_primary","underline_text","sf_pro_display"],["expand","block","size","large",1,"btn","sf_pro_display","btn_solid_primary",3,"click"],[3,"click"],["expand","block","fill","outline","size","large",1,"btn","sf_pro_display","btn_outline_primary"],["src","../../assets/images/icons/google_icon.svg","alt","",1,"mgr_10"],[1,"mgt_15","input_lbl","center"],[1,"clr_primary","underline_text","sf_pro_display",3,"click"]],template:function(d,g){1&d&&(n.TgZ(0,"ion-content",0)(1,"div",1)(2,"div",2),n._UZ(3,"img",3),n.TgZ(4,"div",4),n._uU(5,"Login"),n.qZA()(),n.TgZ(6,"div")(7,"div",5),n._uU(8,"Email"),n.qZA(),n.TgZ(9,"ion-input",6),n.NdJ("ngModelChange",function(E){return g.email=E}),n.qZA(),n.TgZ(10,"div",7),n._uU(11,"Password"),n.qZA(),n.TgZ(12,"ion-input",8),n.NdJ("ngModelChange",function(E){return g.password=E}),n.qZA(),n.TgZ(13,"div",9),n.NdJ("click",function(){return g.forgot()}),n.TgZ(14,"span",10),n._uU(15,"Forgot password?"),n.qZA(),n.TgZ(16,"span",11),n._uU(17,"Reset"),n.qZA()()(),n.TgZ(18,"div")(19,"div")(20,"ion-button",12),n.NdJ("click",function(){return g.login()}),n._uU(21,"Login"),n.qZA()(),n.TgZ(22,"div",13),n.NdJ("click",function(){return g.Loginwithgoogle()}),n.TgZ(23,"ion-button",14),n._UZ(24,"img",15),n._uU(25," Login With Google"),n.qZA()(),n.TgZ(26,"div",16)(27,"span",10),n._uU(28,"Don't have an account?"),n.qZA(),n.TgZ(29,"span",17),n.NdJ("click",function(){return g.goForSignup()}),n._uU(30,"Signup"),n.qZA()()()()()),2&d&&(n.Q6J("fullscreen",!0),n.xp6(9),n.Q6J("ngModel",g.email),n.xp6(3),n.Q6J("ngModel",g.password))},dependencies:[y.Pc,y.YG,y.W2,y.pK,y.j9,D.ez,$.u5,$.JJ,$.On],styles:["ion-content[_ngcontent-%COMP%]{background-color:#000;--background: url(backgruond_img.d2ba74b1ba0db96d.svg) no-repeat center center / cover}.container[_ngcontent-%COMP%]{padding:25px 30px 0;margin-bottom:25px;height:100%;display:flex;flex-direction:column;justify-content:space-between}"]}),_})()}}]);