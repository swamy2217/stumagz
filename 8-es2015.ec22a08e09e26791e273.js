(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{rsu3:function(t,n,e){"use strict";e.r(n),e.d(n,"ChallengeModule",(function(){return qt}));var i=e("ofXK"),o=e("fXoL"),s=e("B/XX"),c=e("3Pt+"),r=e("SxV6"),a=e("0IaG");let b=(()=>{class t{constructor(t,n){this.dialogRef=t,this.data=n,n&&(this.textData=n||this.textData)}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)(o.Nb(a.e),o.Nb(a.a))},t.\u0275cmp=o.Hb({type:t,selectors:[["app-dialog"]],decls:3,vars:1,consts:[[1,"text"]],template:function(t,n){1&t&&(o.Tb(0,"mat-dialog-content",0),o.Tb(1,"p"),o.Ac(2),o.Sb(),o.Sb()),2&t&&(o.Bb(2),o.Cc(" ",n.data," "))},directives:[a.c],styles:[".mat-dialog-actions[_ngcontent-%COMP%]{  justify-content: flex-end; }"]}),t})();var u=e("tyNb"),l=e("N+K7"),d=e("xJkR"),p=e("NFeN"),f=e("bTqV");function m(t,n){if(1&t&&(o.Rb(0),o.Ob(1,"span",2),o.Qb()),2&t){const t=o.ec();o.Bb(1),o.kc("innerHTML",t.i.text,o.sc)}}function g(t,n){1&t&&o.Pb(0)}const h=function(t){return{$implicit:t}};var T=function(t){return t[t.ing=0]="ing",t[t.pause=1]="pause",t[t.stop=2]="stop",t[t.done=3]="done",t}({});let v=(()=>{class t{constructor(t){this.ngZone=t,this.fns=[],this.commands=[],this.ing=!1}start(){!0!==this.ing&&(this.ing=!0,this.nextTime=+new Date,this.ngZone.runOutsideAngular(()=>{this.process()}))}process(){for(;this.commands.length;)this.commands.shift()();let t=+new Date-this.nextTime;const n=1+Math.floor(t/100);t=100-t%100,this.nextTime+=100*n;for(let e=0,i=this.fns.length;e<i;e+=2){let t=this.fns[e+1];if(0===t)this.fns[e](n);else{t+=2*n-1;const i=Math.floor(t/20);i>0&&this.fns[e](i),this.fns[e+1]=t%20+1}}this.ing&&setTimeout(()=>this.process(),t)}add(t,n){return this.commands.push(()=>{this.fns.push(t),this.fns.push(1e3===n?1:0),this.ing=!0}),this}remove(t){return this.commands.push(()=>{const n=this.fns.indexOf(t);-1!==n&&this.fns.splice(n,2),this.ing=this.fns.length>0}),this}}return t.\u0275fac=function(n){return new(n||t)(o.Xb(o.z))},t.\u0275prov=o.Jb({token:t,factory:t.\u0275fac}),t})(),x=(()=>{class t{constructor(t){this.locale=t,this.demand=!1,this.leftTime=0,this.format="HH:mm:ss",this.timezone="+0000",this.formatDate=({date:t,formatStr:n,timezone:e})=>Object(i.u)(new Date(t),n,this.locale,e||this.timezone||"+0000")}}return t.\u0275fac=function(n){return new(n||t)(o.Xb(o.u))},t.\u0275prov=Object(o.Jb)({factory:function(){return new t(Object(o.Xb)(o.u))},token:t,providedIn:"root"}),t})(),O=(()=>{class t{constructor(t,n,e,i,s){this.locale=t,this.timer=n,this.defCog=e,this.cdr=i,this.ngZone=s,this.frequency=1e3,this._notify={},this.status=T.ing,this.isDestroy=!1,this.i={},this.left=0,this.event=new o.n}begin(){this.status=T.ing,this.callEvent("start")}restart(){this.status!==T.stop&&this.destroy(),this.init(),this.callEvent("restart")}stop(){this.status!==T.stop&&(this.status=T.stop,this.destroy(),this.callEvent("stop"))}pause(){this.status!==T.stop&&this.status!==T.pause&&(this.status=T.pause,this.callEvent("pause"))}resume(){this.status!==T.stop&&this.status===T.pause&&(this.status=T.ing,this.callEvent("resume"))}callEvent(t){this.event.emit({action:t,left:this.left,status:this.status,text:this.i.text})}init(){const{locale:t,defCog:n}=this,e=this.config=Object.assign(Object.assign(Object.assign({},new x(t)),n),this.config),i=this.frequency=~e.format.indexOf("S")?100:1e3;this.status=e.demand?T.pause:T.ing,this.getLeft();const o=this.reflow;this.reflow=(t=0,n=!1)=>o.apply(this,[t,n]),Array.isArray(e.notify)&&e.notify.forEach(t=>{if(t<1)throw new Error("The notify config must be a positive integer.");t*=1e3,this._notify[t-=t%i]=!0}),this.timer.add(this.reflow,i).start(),this.reflow(0,!0)}destroy(){return this.timer.remove(this.reflow),this}reflow(t=0,n=!1){if(this.isDestroy)return;const{status:e,config:i,_notify:o}=this;if(!n&&e!==T.ing)return;const s=this.left=this.left-this.frequency*t;this.i={value:s,text:i.formatDate({date:s,formatStr:i.format,timezone:i.timezone})},"function"==typeof i.prettyText&&(this.i.text=i.prettyText(this.i.text)),this.cdr.detectChanges(),(0===i.notify||o[s])&&this.ngZone.run(()=>{this.callEvent("notify")}),s<1&&this.ngZone.run(()=>{this.status=T.done,this.callEvent("done"),this.destroy()})}getLeft(){const{config:t,frequency:n}=this;let e=1e3*t.leftTime;const i=t.stopTime;!e&&i&&(e=i-(new Date).getTime()),this.left=e-e%n}ngOnInit(){this.init(),this.config.demand||this.begin()}ngOnDestroy(){this.isDestroy=!0,this.destroy()}ngOnChanges(t){t.config.firstChange||this.restart()}}return t.\u0275fac=function(n){return new(n||t)(o.Nb(o.u),o.Nb(v),o.Nb(x),o.Nb(o.h),o.Nb(o.z))},t.\u0275cmp=o.Hb({type:t,selectors:[["countdown"]],hostVars:2,hostBindings:function(t,n){2&t&&o.Eb("count-down",!0)},inputs:{config:"config",render:"render"},outputs:{event:"event"},features:[o.zb],decls:2,vars:5,consts:[[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"innerHTML"]],template:function(t,n){1&t&&(o.yc(0,m,2,1,"ng-container",0),o.yc(1,g,1,0,"ng-container",1)),2&t&&(o.kc("ngIf",!n.render),o.Bb(1),o.kc("ngTemplateOutlet",n.render)("ngTemplateOutletContext",o.mc(3,h,n.i)))},directives:[i.k,i.p],encapsulation:2,changeDetection:0}),t})(),S=(()=>{class t{}return t.\u0275mod=o.Lb({type:t}),t.\u0275inj=o.Kb({factory:function(n){return new(n||t)},providers:[v],imports:[[i.b]]}),t})();var k=e("Xa2L"),w=e("Wp6s"),I=e("QibW"),q=e("MutI"),y=e("FKr1");const C=["cd"],_=function(){return{height:"180px"}};function B(t,n){1&t&&(o.Rb(0),o.Ob(1,"div",2),o.Tb(2,"div",3),o.Ob(3,"ngx-skeleton-loader",4),o.Sb(),o.Qb()),2&t&&(o.Bb(3),o.kc("theme",o.lc(1,_)))}function z(t,n){if(1&t&&(o.Rb(0),o.Tb(1,"button",27),o.Ob(2,"countdown",28),o.Sb(),o.Qb()),2&t){const t=o.ec(3);o.Bb(2),o.kc("config",t.countDownconfig)}}function M(t,n){1&t&&(o.Tb(0,"span"),o.Ac(1,"START"),o.Sb())}function P(t,n){1&t&&o.Ob(0,"mat-spinner",31),2&t&&o.kc("diameter",25)}function D(t,n){if(1&t){const t=o.Ub();o.Tb(0,"button",29),o.bc("click",(function(){return o.rc(t),o.ec(3).startQuiz()})),o.yc(1,M,2,0,"span",1),o.yc(2,P,1,1,"mat-spinner",30),o.Sb()}if(2&t){const t=o.ec(3);o.kc("disabled",t.spinner),o.Bb(1),o.kc("ngIf",!t.spinner),o.Bb(1),o.kc("ngIf",t.spinner)}}function A(t,n){if(1&t&&(o.Rb(0),o.yc(1,z,3,1,"ng-container",25),o.yc(2,D,3,3,"ng-template",null,26,o.zc),o.Qb()),2&t){const t=o.qc(3),n=o.ec(2);o.Bb(1),o.kc("ngIf",n.showTimer)("ngIfElse",t)}}function L(t,n){if(1&t){const t=o.Ub();o.Tb(0,"button",32),o.bc("click",(function(){return o.rc(t),o.ec(2).quizReview()})),o.Ac(1," Review "),o.Sb()}}function Q(t,n){if(1&t){const t=o.Ub();o.Tb(0,"button",32),o.bc("click",(function(){return o.rc(t),o.ec(2).showLeaderBoard()})),o.Ac(1," LeaderBoard "),o.Sb()}}function E(t,n){if(1&t&&(o.Tb(0,"span"),o.Ac(1),o.Sb()),2&t){const t=o.ec(2);o.Bb(1),o.Cc("(",null==t.quizInfo?null:t.quizInfo.skillCode,")")}}function $(t,n){if(1&t&&(o.Tb(0,"span"),o.Ac(1),o.Sb()),2&t){const t=o.ec(2);o.Bb(1),o.Cc("(",null==t.quizInfo?null:t.quizInfo.brandCode,")")}}function N(t,n){if(1&t&&(o.Tb(0,"div"),o.Tb(1,"span",21),o.Ac(2,"videoUrl:"),o.Sb(),o.Tb(3,"p"),o.Tb(4,"a",33),o.Ac(5),o.Sb(),o.Sb(),o.Sb()),2&t){const t=o.ec(2);o.Bb(4),o.kc("href",t.quizInfo.videoUrl,o.tc),o.Bb(1),o.Bc(t.quizInfo.videoUrl)}}const U=function(){return["/home"]};function H(t,n){if(1&t&&(o.Rb(0),o.Tb(1,"div",5),o.Tb(2,"div",6),o.Tb(3,"mat-icon",7),o.Ac(4,"close "),o.Sb(),o.Ob(5,"div",8),o.Sb(),o.Tb(6,"div",9),o.yc(7,A,4,2,"ng-container",1),o.yc(8,L,2,0,"button",10),o.yc(9,Q,2,0,"button",10),o.Sb(),o.Sb(),o.Tb(10,"div",11),o.Ac(11),o.Sb(),o.Tb(12,"div",2),o.Ob(13,"img",12),o.Sb(),o.Tb(14,"div",13),o.Tb(15,"h2",14),o.Ac(16),o.Sb(),o.Tb(17,"div",15),o.Ac(18),o.yc(19,E,2,1,"span",1),o.yc(20,$,2,1,"span",1),o.Sb(),o.Tb(21,"div",15),o.Ac(22),o.fc(23,"date"),o.Sb(),o.Tb(24,"div",16),o.Tb(25,"div",17),o.Tb(26,"mat-icon",18),o.Ac(27,"watch_later"),o.Sb(),o.Ac(28),o.Sb(),o.Tb(29,"div",19),o.Tb(30,"mat-icon",18),o.Ac(31,"tune"),o.Sb(),o.Ac(32),o.Sb(),o.Sb(),o.Tb(33,"div",20),o.Tb(34,"span",21),o.Ac(35," Description: "),o.Sb(),o.Tb(36,"div",22),o.Ob(37,"div",23),o.Sb(),o.Sb(),o.Tb(38,"div",24),o.Tb(39,"span",21),o.Ac(40,"Instruction:"),o.Sb(),o.Ob(41,"div",23),o.Sb(),o.yc(42,N,6,2,"div",1),o.Sb(),o.Qb()),2&t){const t=o.ec();o.Bb(3),o.kc("routerLink",o.lc(20,U)),o.Bb(2),o.kc("innerHTML",t.quizInfo.name,o.sc),o.Bb(2),o.kc("ngIf",null==t.quizInfo||null==t.quizInfo.allowedOperations?null:t.quizInfo.allowedOperations.attempt),o.Bb(1),o.kc("ngIf",null==t.quizInfo||null==t.quizInfo.allowedOperations?null:t.quizInfo.allowedOperations.review),o.Bb(1),o.kc("ngIf",null==t.quizInfo||null==t.quizInfo.allowedOperations?null:t.quizInfo.allowedOperations.leaderBoard),o.Bb(2),o.Bc(t.quizInfo.name),o.Bb(2),o.kc("src",t.quizInfo.coverImageUrl,o.tc),o.Bb(3),o.Bc(t.quizInfo.name),o.Bb(2),o.Cc("",t.quizInfo.type," "),o.Bb(1),o.kc("ngIf","SKILL"===(null==t.quizInfo?null:t.quizInfo.type)&&(null==t.quizInfo?null:t.quizInfo.skillCode)),o.Bb(1),o.kc("ngIf","BRAND"===(null==t.quizInfo?null:t.quizInfo.type)&&(null==t.quizInfo?null:t.quizInfo.brandCode)),o.Bb(2),o.Cc(" ",o.hc(23,17,t.quizInfo.startTime,"medium")," "),o.Bb(6),o.Cc(" ",t.quizInfo.durationInMinutes," mins "),o.Bb(4),o.Cc(" ",t.quizInfo.numberOfQuestions," Questions "),o.Bb(5),o.kc("innerHTML",t.quizInfo.description,o.sc),o.Bb(4),o.kc("innerHTML",t.quizInfo.instructions,o.sc),o.Bb(1),o.kc("ngIf",t.quizInfo.videoUrl)}}function R(t,n){if(1&t&&o.Ob(0,"img",46),2&t){const t=o.ec().$implicit;o.kc("src",t.question.imageUrl,o.tc)}}function j(t,n){if(1&t&&o.Ob(0,"div",23),2&t){const t=o.ec().$implicit;o.kc("innerHTML",t.question.text,o.sc)}}function F(t,n){if(1&t&&o.Ob(0,"img",52),2&t){const t=o.ec().$implicit;o.kc("src",t.imageUrl,o.tc)}}function X(t,n){if(1&t){const t=o.Ub();o.Tb(0,"div",49),o.Tb(1,"mat-radio-button",50),o.bc("change",(function(){o.rc(t);const e=n.index,i=n.$implicit,s=o.ec(2),c=s.index,r=s.$implicit;return o.ec(2).setSelected(c,e,i.sno,r.question)})),o.Tb(2,"li"),o.yc(3,F,1,1,"img",51),o.Tb(4,"div",9),o.Ac(5),o.Sb(),o.Sb(),o.Sb(),o.Sb()}if(2&t){const t=n.$implicit;o.Bb(1),o.Eb("is-selected",t.selected),o.Bb(2),o.kc("ngIf",null==t?null:t.imageUrl),o.Bb(2),o.Bc(t.text)}}function V(t,n){if(1&t&&(o.Tb(0,"ol",47),o.yc(1,X,6,4,"div",48),o.Sb()),2&t){const t=o.ec().$implicit;o.Bb(1),o.kc("ngForOf",null==t||null==t.question?null:t.question.options)}}function K(t,n){if(1&t){const t=o.Ub();o.Tb(0,"div",49),o.Tb(1,"mat-radio-button",50),o.bc("change",(function(){o.rc(t);const e=n.index,i=n.$implicit,s=o.ec(2),c=s.index,r=s.$implicit;return o.ec(2).setSelected(c,e,i.sno,r.question)})),o.Tb(2,"li"),o.Ac(3),o.Sb(),o.Sb(),o.Sb()}if(2&t){const t=n.$implicit;o.Bb(1),o.Eb("is-selected",t.selected),o.Bb(2),o.Bc(t.text)}}function W(t,n){if(1&t&&(o.Tb(0,"ol",47),o.yc(1,K,4,3,"div",48),o.Sb()),2&t){const t=o.ec().$implicit;o.Bb(1),o.kc("ngForOf",null==t||null==t.question?null:t.question.options)}}function J(t,n){if(1&t&&(o.Tb(0,"cdk-step"),o.Tb(1,"mat-card"),o.Tb(2,"mat-card-header",38),o.Ob(3,"div",39),o.Tb(4,"mat-card-subtitle"),o.Ac(5),o.Sb(),o.Tb(6,"mat-card-title",40),o.yc(7,R,1,1,"img",41),o.yc(8,j,1,1,"div",42),o.Sb(),o.Sb(),o.Tb(9,"mat-card-content",43),o.yc(10,V,2,1,"ol",44),o.yc(11,W,2,1,"ng-template",null,45,o.zc),o.Sb(),o.Sb(),o.Sb()),2&t){const t=n.$implicit,e=n.index,i=o.qc(12),s=o.ec(2);o.Bb(5),o.Dc("Question No ",e+1," of ",s.QuizData.attemptQuestions.length,""),o.Bb(2),o.kc("ngIf",null==t||null==t.question?null:t.question.imageUrl),o.Bb(1),o.kc("ngIf",null==t||null==t.question?null:t.question.text),o.Bb(2),o.kc("ngIf","mcq"===(null==t||null==t.question?null:t.question.type)||"MCQ"===(null==t||null==t.question?null:t.question.type))("ngIfElse",i)}}function Z(t,n){if(1&t){const t=o.Ub();o.Rb(0),o.Tb(1,"div",5),o.Tb(2,"div",6),o.Tb(3,"mat-icon",7),o.Ac(4,"close "),o.Sb(),o.Ob(5,"div",34),o.Sb(),o.Ob(6,"div"),o.Sb(),o.Tb(7,"app-quiz-stepper",35),o.bc("isPublished",(function(n){return o.rc(t),o.ec().pubishForm(n)})),o.Tb(8,"form",36),o.yc(9,J,13,6,"cdk-step",37),o.Sb(),o.Sb(),o.Qb()}if(2&t){const t=o.ec();o.Bb(3),o.kc("routerLink",o.lc(6,U)),o.Bb(2),o.kc("innerHTML",t.quizInfo.name,o.sc),o.Bb(2),o.kc("isSubmitted",t.isPublishButtonClicked)("stepsCount",t.stepsCount)("type","Next"),o.Bb(2),o.kc("ngForOf",t.QuizData.attemptQuestions)}}function Y(t,n){if(1&t){const t=o.Ub();o.Rb(0),o.Tb(1,"button",61),o.Ac(2," Share "),o.Sb(),o.Tb(3,"button",62),o.bc("click",(function(){return o.rc(t),o.ec(2).reviewQuestions()})),o.Ac(4," Review Questions "),o.Sb(),o.Qb()}}function G(t,n){if(1&t){const t=o.Ub();o.Tb(0,"button",63),o.bc("click",(function(){return o.rc(t),o.ec(2).moveTo(1)})),o.Ac(1," Back "),o.Sb()}}function tt(t,n){1&t&&o.Ob(0,"img",64)}function nt(t,n){if(1&t&&o.Ob(0,"img",65),2&t){const t=o.ec(2);o.kc("src",t.quizInfo.coverImageUrl,o.tc)}}function et(t,n){if(1&t&&(o.Tb(0,"h1",14),o.Ac(1),o.Sb()),2&t){const t=o.ec(2);o.Bb(1),o.Cc("",t.reviewData.rewardDescription," ")}}function it(t,n){if(1&t&&(o.Tb(0,"div"),o.Ac(1),o.fc(2,"date"),o.Sb()),2&t){const t=o.ec(2);o.Bb(1),o.Cc("Your quiz submitted on ",o.hc(2,1,t.reviewData.submittedTime,"medium"),"")}}function ot(t,n){if(1&t&&(o.Tb(0,"mat-list-item"),o.Ob(1,"img",66),o.Tb(2,"div",67),o.Ac(3),o.fc(4,"titlecase"),o.Sb(),o.Tb(5,"div",67),o.Tb(6,"span",68),o.Ac(7),o.Sb(),o.Sb(),o.Sb()),2&t){const t=n.$implicit,e=o.ec(2);o.Bb(3),o.Bc(o.gc(4,4,t.fullName)),o.Bb(4),o.Ec(" ",t.score,"/",t.numberOfQuestions," in ",e.timeConvertedMS2Sec(t.timeTakenInMilliSeconds)," secs ")}}function st(t,n){if(1&t&&(o.Rb(0),o.Tb(1,"div",5),o.Tb(2,"div",6),o.Tb(3,"mat-icon",7),o.Ac(4,"close "),o.Sb(),o.Tb(5,"div",53),o.Ac(6),o.Sb(),o.Sb(),o.Tb(7,"div",9),o.yc(8,Y,5,0,"ng-container",25),o.yc(9,G,2,0,"ng-template",null,54,o.zc),o.Sb(),o.Sb(),o.Tb(11,"div",2),o.yc(12,tt,1,0,"img",55),o.yc(13,nt,1,1,"img",56),o.Sb(),o.Tb(14,"div",57),o.yc(15,et,2,1,"h1",58),o.Tb(16,"div",16),o.Tb(17,"div",17),o.Tb(18,"mat-icon",18),o.Ac(19,"watch_later"),o.Sb(),o.Ac(20),o.Sb(),o.Tb(21,"div",19),o.Tb(22,"mat-icon",18),o.Ac(23,"tune"),o.Sb(),o.Ac(24),o.Sb(),o.Sb(),o.yc(25,it,3,4,"div",1),o.Tb(26,"h3",59),o.Ac(27,"Leader board"),o.Sb(),o.Tb(28,"mat-list",60),o.yc(29,ot,8,6,"mat-list-item",37),o.Sb(),o.Sb(),o.Qb()),2&t){const t=o.qc(10),n=o.ec();o.Bb(3),o.kc("routerLink",o.lc(11,U)),o.Bb(3),o.Bc(n.quizInfo.name),o.Bb(2),o.kc("ngIf",n.reviewData)("ngIfElse",t),o.Bb(4),o.kc("ngIf",!(null!=n.quizInfo&&n.quizInfo.coverImageUrl)),o.Bb(1),o.kc("ngIf",null==n.quizInfo?null:n.quizInfo.coverImageUrl),o.Bb(2),o.kc("ngIf",n.reviewData&&n.reviewData.rewardDescription),o.Bb(5),o.Cc(" ",n.quizInfo.durationInMinutes," mins "),o.Bb(4),o.Cc(" ",n.quizInfo.numberOfQuestions," Questions "),o.Bb(1),o.kc("ngIf",n.reviewData&&"SUBMITTED"===n.reviewData.status),o.Bb(4),o.kc("ngForOf",n.leaderboardData)}}function ct(t,n){1&t&&(o.Tb(0,"div",72),o.Ac(1,"(Not chosen anything)"),o.Sb())}function rt(t,n){if(1&t&&(o.Tb(0,"mat-radio-button",76),o.Tb(1,"li"),o.Ac(2),o.Sb(),o.Sb()),2&t){const t=o.ec().$implicit,n=o.ec(2).$implicit;o.Eb("is-correct",t.sno===n.chosenOption&&t.sno===n.correctOption)("is-incorrect",t.sno===n.chosenOption&&t.sno!==n.correctOption),o.Bb(2),o.Bc(t.text)}}function at(t,n){1&t&&(o.Tb(0,"div"),o.Tb(1,"span",77),o.Ac(2,"\xa0\xa0\xa0\xa0\xa0You're right! "),o.Sb(),o.Sb())}function bt(t,n){if(1&t&&(o.Tb(0,"div"),o.Tb(1,"span",78),o.Ac(2),o.Sb(),o.Sb()),2&t){const t=o.ec(3).$implicit;o.Bb(2),o.Cc("\xa0\xa0\xa0\xa0\xa0That's wrong. The correct answer is Option ",t.correctOption," ")}}function ut(t,n){if(1&t&&(o.Tb(0,"mat-radio-button",76),o.Tb(1,"li"),o.Ac(2),o.Sb(),o.Sb()),2&t){const t=o.ec().$implicit,n=o.ec(2).$implicit;o.Eb("is-correct",t.sno===n.correctOption),o.Bb(2),o.Bc(t.text)}}function lt(t,n){if(1&t&&(o.Tb(0,"div",49),o.yc(1,rt,3,5,"mat-radio-button",73),o.Tb(2,"section",74),o.yc(3,at,3,0,"div",1),o.yc(4,bt,3,1,"div",1),o.Sb(),o.yc(5,ut,3,3,"ng-template",null,75,o.zc),o.Sb()),2&t){const t=n.$implicit,e=o.qc(6),i=o.ec(2).$implicit;o.Bb(1),o.kc("ngIf",i.chosenOption)("ngIfElse",e),o.Bb(2),o.kc("ngIf",t.sno===i.chosenOption&&t.sno===i.correctOption),o.Bb(1),o.kc("ngIf",t.sno===i.chosenOption&&t.sno!==i.correctOption)}}function dt(t,n){if(1&t&&(o.Tb(0,"ol",47),o.yc(1,lt,7,4,"div",48),o.Sb()),2&t){const t=o.ec().$implicit;o.Bb(1),o.kc("ngForOf",null==t||null==t.question?null:t.question.options)}}function pt(t,n){if(1&t&&(o.Tb(0,"cdk-step"),o.Tb(1,"mat-card"),o.Tb(2,"mat-card-header"),o.Ob(3,"div",39),o.Tb(4,"mat-card-subtitle"),o.Ac(5),o.Sb(),o.Tb(6,"mat-card-title"),o.Ac(7),o.yc(8,ct,2,0,"div",70),o.Sb(),o.Sb(),o.Tb(9,"mat-card-content",49),o.yc(10,dt,2,1,"ol",71),o.Sb(),o.Sb(),o.Sb()),2&t){const t=n.$implicit,e=n.index,i=o.ec(2);o.Bb(5),o.Dc("Question No ",e+1," of ",i.reviewData.attemptQuestions.length,""),o.Bb(2),o.Cc(" ",null==t||null==t.question?null:t.question.text," "),o.Bb(1),o.kc("ngIf",!t.chosenOption),o.Bb(2),o.kc("ngIf","mcq"===(null==t||null==t.question?null:t.question.type)||"MCQ"===(null==t||null==t.question?null:t.question.type))}}function ft(t,n){if(1&t&&(o.Rb(0),o.Tb(1,"div",5),o.Tb(2,"div",6),o.Tb(3,"mat-icon",7),o.Ac(4,"close "),o.Sb(),o.Tb(5,"div",53),o.Ac(6),o.Sb(),o.Sb(),o.Ob(7,"div"),o.Sb(),o.Tb(8,"app-quiz-stepper",69),o.Tb(9,"form",36),o.yc(10,pt,11,5,"cdk-step",37),o.Sb(),o.Sb(),o.Qb()),2&t){const t=o.ec();o.Bb(3),o.kc("routerLink",o.lc(5,U)),o.Bb(3),o.Bc(t.quizInfo.name),o.Bb(2),o.kc("type","View")("stepsCount",t.stepsCount),o.Bb(2),o.kc("ngForOf",t.reviewData.attemptQuestions)}}const mt=function(t){return{"step-active":t}};function gt(t,n){if(1&t){const t=o.Ub();o.Tb(0,"button",10),o.bc("click",(function(){o.rc(t);const e=n.index;return o.ec().onClick(e)})),o.Sb()}if(2&t){const t=n.index,e=o.ec();o.kc("ngClass",o.mc(1,mt,e.selectedIndex===t))}}function ht(t,n){1&t&&(o.Tb(0,"button",11),o.Ac(1," Next "),o.Sb())}function Tt(t,n){if(1&t&&(o.Tb(0,"span"),o.Ac(1),o.Sb()),2&t){const t=o.ec(3);o.Bb(1),o.Cc(" ",t.type,"")}}function vt(t,n){1&t&&o.Ob(0,"mat-spinner",17),2&t&&o.kc("diameter",25)}function xt(t,n){if(1&t){const t=o.Ub();o.Tb(0,"button",14),o.bc("click",(function(){o.rc(t);const n=o.ec(2);return n.Publish(n.selectedIndex)})),o.yc(1,Tt,2,1,"span",15),o.yc(2,vt,1,1,"mat-spinner",16),o.Sb()}if(2&t){const t=o.ec(2);o.kc("disabled",t.isSubmitted),o.Bb(1),o.kc("ngIf",!t.isSubmitted),o.Bb(1),o.kc("ngIf",t.isSubmitted)}}function Ot(t,n){1&t&&(o.Tb(0,"button",18),o.Ac(1," Next "),o.Sb())}function St(t,n){if(1&t&&(o.yc(0,xt,3,3,"button",12),o.yc(1,Ot,2,0,"button",13)),2&t){const t=o.ec();o.kc("ngIf","View"!==t.type),o.Bb(1),o.kc("ngIf","View"===t.type)}}let kt=(()=>{class t{constructor(t,n,e,i){this.route=t,this.httpService=n,this.router=e,this.dialog=i,this.CountdownTimeUnits=[["Y",31536e6],["M",2592e6],["D",864e5],["H",36e5],["m",6e4],["s",1e3]]}ngOnInit(){this.isPublishButtonClicked=!1,this.isLoading=!0,this.step=1,this.quizId=this.route.snapshot.paramMap.get("id"),this.httpService.get(`api/${this.quizId}`).subscribe(t=>{this.isLoading=!1,t?(this.quizInfo=t,this.compareTime(t)):this.router.navigate(["/home"])},t=>{this.isLoading=!1,this.router.navigate(["/home"]),console.error("something went wrong")}),this.formGroup=new c.h({answer:new c.f(["",c.w.required])})}compareTime(t){const n=new Date,e=new Date(t.startTime),i=new Date(t.endTime);this.showTimer=e.getTime()>=n.getTime(),this.showStartButton=i.getTime()>=n.getTime(),this.showTimer?(this.countDownLeftTime=(e.getTime()-n.getTime())/1e3,this.countDownconfig=this.countDownLeftTime<86400?{leftTime:this.countDownLeftTime,format:"HH:mm:ss"}:this.countDownLeftTime>86399&&this.countDownLeftTime<2592e3?{leftTime:this.countDownLeftTime,formatDate:({date:t})=>{let n=Number(t||0);return this.CountdownTimeUnits.reduce((t,[e,i])=>{if(-1!==t.indexOf(e)){const o=Math.floor(n/i);return n-=o*i,t.replace(new RegExp(`${e}+`,"g"),t=>o.toString().padStart(t.length,"0"))}return t},"D:H:m:s")}}:{leftTime:this.countDownLeftTime,formatDate:({date:t})=>{let n=Number(t||0);return this.CountdownTimeUnits.reduce((t,[e,i])=>{if(-1!==t.indexOf(e)){const o=Math.floor(n/i);return n-=o*i,t.replace(new RegExp(`${e}+`,"g"),t=>o.toString().padStart(t.length,"0"))}return t},"D day: H: mm : s")}}):console.log("show button")}getTimerFormat(t){}startQuiz(){this.spinner=!0,this.httpService.post(`api/${this.quizId}/begin`,"").subscribe(t=>{this.spinner=!1,console.log(t),this.step=2,this.QuizData=t,this.stepsCount=this.QuizData.attemptQuestions.length-1},t=>{this.spinner=!1})}setSelected(t,n,e,i){const o=this.QuizData.attemptQuestions[t];o.question.options.forEach(t=>t.selected=!1),o.question.options[n].selected=!0,o.chosenOption=e,this.saveRecord(o)}saveRecord(t){this.httpService.post(`api/${this.QuizData.id}/save`,[{chosenOption:t.chosenOption,questionSno:t.question.sno}]).subscribe(t=>{})}handleEvent(t){this.showTimer=!1}pubishForm(t){if(4===this.step)return!1;this.isPublishButtonClicked=!0,this.httpService.post(`api/${this.QuizData.id}/submit`,"").pipe(Object(r.a)()).subscribe(t=>{if(this.isPublishButtonClicked=!1,t){const t=this.dialog.open(b,{data:"Your quiz submitted"});setTimeout(()=>{t.close()},5e3),this.router.navigate(["/home"])}},t=>{this.isPublishButtonClicked=!1})}timeConvertedMS2Sec(t){return t?t/1e3:t}openQuizleaderBoard(){this.httpService.get(`api/${this.quizId}/leaderboard`).subscribe(t=>{this.isLoading=!1,t&&(this.leaderboardData=t)},t=>{this.isLoading=!1})}showLeaderBoard(){this.step=3,this.openQuizleaderBoard()}quizReview(){this.step=3,this.isLoading=!0,this.openQuizleaderBoard(),this.httpService.get(`api/${this.quizId}/review`).subscribe(t=>{this.isLoading=!1,t&&(this.reviewData=t,this.stepsCount=this.reviewData.attemptQuestions.length-1)},t=>{this.isLoading=!1})}reviewQuestions(){this.reviewData&&this.reviewData.attemptQuestions.length&&(this.step=4)}moveTo(t){this.step=t}}return t.\u0275fac=function(n){return new(n||t)(o.Nb(u.a),o.Nb(l.a),o.Nb(u.b),o.Nb(a.b))},t.\u0275cmp=o.Hb({type:t,selectors:[["app-challenge"]],viewQuery:function(t,n){var e;1&t&&o.Gc(C,!0),2&t&&o.pc(e=o.cc())&&(n.countdown=e.first)},decls:6,vars:5,consts:[[1,"container","quiz-container"],[4,"ngIf"],[1,"img_container","mt-3"],[1,"quiz_content","mx-3"],[3,"theme"],[1,"d-flex","quiz_title"],[1,"lefttext","d-flex"],["aria-hidden","false","color","textlight",1,"close_icon",3,"routerLink"],[1,"info_text","ml-3","d-none","d-md-block",3,"innerHTML"],[1,"d-flex"],["class","submit_btns ml-1","mat-raised-button","","color","secondary",3,"click",4,"ngIf"],[1,"info_text","ml-3","d-block","d-md-none"],["onerror","this.onerror=null;this.src='https://picsum.photos/800/230/?random;'",1,"",3,"src"],[1,"quiz_content","p-4","mx-lg-3"],[1,"qname","mb-2"],[1,"qtype","mb-3"],[1,"card-text","d-flex"],[1,"duration","sub_text"],["aria-hidden","false","fontSet","material-icons-outlined"],[1,"sub_text","ml-3"],[1,"qdesc","my-3"],[1,"content_header"],[1,"small"],[3,"innerHTML"],[1,"qinstruction","mb-3"],[4,"ngIf","ngIfElse"],["showButton",""],["mat-raised-button","","color","secondary"],[3,"config"],["mat-raised-button","","color","secondary",1,"submit_btns",3,"disabled","click"],["strokeWidth","3",3,"diameter",4,"ngIf"],["strokeWidth","3",3,"diameter"],["mat-raised-button","","color","secondary",1,"submit_btns","ml-1",3,"click"],["target","_blank",3,"href"],[1,"info_text","ml-3",3,"innerHTML"],[3,"isSubmitted","stepsCount","type","isPublished"],[1,"quiz-attempts-questions"],[4,"ngFor","ngForOf"],[1,"w-100"],["mat-card-avatar","",1,"header-image"],[1,"question_image","w-100"],[3,"src",4,"ngIf"],[3,"innerHTML",4,"ngIf"],[1,"options","submission_data"],["class","single-answer",4,"ngIf","ngIfElse"],["trueFalseQts",""],[3,"src"],[1,"single-answer"],["class","options",4,"ngFor","ngForOf"],[1,"options"],[3,"change"],["class","w-100 d-flex",3,"src",4,"ngIf"],[1,"w-100","d-flex",3,"src"],[1,"info_text","ml-3"],["backtostpe1",""],["src","https://picsum.photos/800/230",4,"ngIf"],["onerror","this.onerror=null;this.src='https://picsum.photos/800/230;'",3,"src",4,"ngIf"],[1,"quiz_content","p-4","mx-3"],["class","qname mb-2",4,"ngIf"],[1,"leaderboard","mt-2","mb-1"],[1,"d-flex","flex-column"],["mat-raised-button","","color","light",1,"mr-3"],["mat-raised-button","","color","secondary",1,"submit_btns",3,"click"],["mat-raised-button","","color","light",1,"mr-3",3,"click"],["src","https://picsum.photos/800/230"],["onerror","this.onerror=null;this.src='https://picsum.photos/800/230;'",3,"src"],["matListAvatar","","src","assets/user.png","alt","..."],["matLine",""],["color","medium",1,"small"],[3,"type","stepsCount"],["class","text-danger",4,"ngIf"],["class"," single-answer",4,"ngIf"],[1,"text-danger"],["disabled","",3,"is-correct","is-incorrect",4,"ngIf","ngIfElse"],[1,"messages"],["showCurrectOption",""],["disabled",""],[1,"message","correct-message"],[1,"message","wrong-message"]],template:function(t,n){1&t&&(o.Tb(0,"div",0),o.yc(1,B,4,2,"ng-container",1),o.yc(2,H,43,21,"ng-container",1),o.yc(3,Z,10,7,"ng-container",1),o.yc(4,st,30,12,"ng-container",1),o.yc(5,ft,11,6,"ng-container",1),o.Sb()),2&t&&(o.Bb(1),o.kc("ngIf",n.isLoading),o.Bb(1),o.kc("ngIf",n.quizInfo&&!n.isLoading&&1===n.step),o.Bb(1),o.kc("ngIf",2===n.step&&!n.isLoading),o.Bb(1),o.kc("ngIf",3===n.step&&!n.isLoading),o.Bb(1),o.kc("ngIf",4===n.step&&!n.isLoading))},directives:function(){return[i.k,d.a,p.a,u.c,f.a,O,k.b,wt,i.j,s.a,w.a,w.d,w.b,w.f,w.g,w.c,I.a,q.a,q.c,q.b,y.h]},pipes:function(){return[i.d,i.s]},styles:[".quiz-container[_ngcontent-%COMP%]{max-width:835px;padding:15px;margin:60px auto 0}.quiz-container[_ngcontent-%COMP%]   .lefttext[_ngcontent-%COMP%]   .close_icon[_ngcontent-%COMP%]{cursor:pointer}.quiz-container[_ngcontent-%COMP%]   .quiz_title[_ngcontent-%COMP%]{justify-content:space-between;align-items:center;padding:0 5px;height:45px}.quiz-container[_ngcontent-%COMP%]   .img_container[_ngcontent-%COMP%]{height:230px;background-color:#c2c1c6;justify-content:center;display:flex}.quiz-container[_ngcontent-%COMP%]   .img_container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%!important;-o-object-fit:cover;object-fit:cover;height:230px}.quiz-container[_ngcontent-%COMP%]   .quiz_content[_ngcontent-%COMP%]{margin-top:-35px;background:#fff;border-radius:5px;z-index:10;position:relative}.quiz-container[_ngcontent-%COMP%]   .quiz_content[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]{margin-top:.45rem;font-size:.8rem}.quiz-container[_ngcontent-%COMP%]   .quiz_content[_ngcontent-%COMP%]   .sub_text[_ngcontent-%COMP%]{line-height:1.2rem;display:inline-flex}.quiz-container[_ngcontent-%COMP%]   .quiz_content[_ngcontent-%COMP%]   .sub_text[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:18px;padding-top:2px}.question_image[_ngcontent-%COMP%]{width:100%;align-items:center;display:flex}.question_image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{-o-object-fit:contain;object-fit:contain}.info_text[_ngcontent-%COMP%]{color:#13a864;font-weight:600;margin-top:4px;text-overflow:ellipsis}.content_header[_ngcontent-%COMP%]{font-weight:500}ol[_ngcontent-%COMP%]{margin:15px 0 0 -40px}ol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-left:40px;width:34.6rem}.options[_ngcontent-%COMP%]{margin:0 0 -5px;padding:5px 5px 5px 30px}.options[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]:first-child{margin-top:10px;padding-top:30px}.options[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]{margin-top:-10px!important}.options[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{min-height:47px}.options[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%], .options[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%]{cursor:pointer;width:39.5rem;min-height:47px;color:#0f0900;border-bottom:1px solid #979797;margin-left:-5px;vertical-align:middle;font-weight:500}.options[_ngcontent-%COMP%]   mat-checkbox.submission_data[_ngcontent-%COMP%]:hover:not(.is-selected), .options[_ngcontent-%COMP%]   mat-radio-button.submission_data[_ngcontent-%COMP%]:hover:not(.is-selected){border-bottom:1px solid #628933;background-color:#f2fdf5;color:#628933}.options[_ngcontent-%COMP%]   .is-correct[_ngcontent-%COMP%], .options[_ngcontent-%COMP%]   .is-selected[_ngcontent-%COMP%]{background-color:#628933}.options[_ngcontent-%COMP%]   .is-incorrect[_ngcontent-%COMP%]{background-color:red}.messages[_ngcontent-%COMP%]{display:flex}.messages[_ngcontent-%COMP%], .messages[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{justify-content:center;height:auto}.messages[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{font-size:16px;font-style:italic;padding:10px!important;width:35rem;display:inline-flex;align-items:center;vertical-align:middle;border-radius:5px;margin-top:-10px;word-wrap:break-word}.messages[_ngcontent-%COMP%]   .correct-message[_ngcontent-%COMP%]{border:1px solid #628933;color:#628933}.messages[_ngcontent-%COMP%]   .wrong-message[_ngcontent-%COMP%]{border:1px solid red;color:red}.submit_btns[_ngcontent-%COMP%]{min-height:36px;min-width:76px}  .options .mat-radio-button .mat-radio-label{min-height:47px}  .mat-checkbox .mat-checkbox-inner-container,   .mat-radio-button .mat-radio-container{display:none}  .mat-card-header-text{width:100%!important}.leaderboard[_ngcontent-%COMP%]{font-weight:600}.mat-list-base[_ngcontent-%COMP%]   .mat-list-item.mat-2-line[_ngcontent-%COMP%]{height:55px}  .mat-list-base .mat-list-item .mat-list-item-content{padding:0!important}  .mat-list-base{padding-top:0!important}  .mat-list-text{padding-left:5px!important}  .mat-list-base .mat-list-item .mat-line{line-height:17px;font-size:14px!important}  .mat-list-base .mat-list-item .mat-line .small{font-size:80%;color:#757575}@media screen and (max-width:991px){.quiz-container[_ngcontent-%COMP%]{max-width:100%;margin-top:0}.quiz-container[_ngcontent-%COMP%]   .img_container[_ngcontent-%COMP%]{margin-left:-15px;margin-right:-15px}}"]}),t})(),wt=(()=>{class t extends s.d{constructor(){super(...arguments),this.isPublished=new o.n}onClick(t){this.selectedIndex=t}Publish(t){console.log(t),this.isPublished.emit(t)}}return t.\u0275fac=function(n){return It(n||t)},t.\u0275cmp=o.Hb({type:t,selectors:[["app-quiz-stepper"]],inputs:{isSubmitted:"isSubmitted",stepsCount:"stepsCount",type:"type"},outputs:{isPublished:"isPublished"},features:[o.Ab([{provide:s.d,useExisting:t}]),o.yb],decls:12,vars:7,consts:[[1,"example-container"],[1,"step-navigation-bar"],[1,"steps_wrapper"],["class","quiz-stepper",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"stepper_btns"],["mat-button","","cdkStepperPrevious","",1,"mr-3","step-nav-btns",3,"disabled"],["mat-button","","cdkStepperNext","","class","step-nav-btns","color","secondary",4,"ngIf","ngIfElse"],["stepPublish",""],[1,"mt-2"],[3,"ngTemplateOutlet"],[1,"quiz-stepper",3,"ngClass","click"],["mat-button","","cdkStepperNext","","color","secondary",1,"step-nav-btns"],["mat-button","","class","step-nav-btns","color","secondary",3,"disabled","click",4,"ngIf"],["class","step-nav-btns","mat-button","","cdkStepperNext","","disabled","",4,"ngIf"],["mat-button","","color","secondary",1,"step-nav-btns",3,"disabled","click"],[4,"ngIf"],["strokeWidth","3",3,"diameter",4,"ngIf"],["strokeWidth","3",3,"diameter"],["mat-button","","cdkStepperNext","","disabled","",1,"step-nav-btns"]],template:function(t,n){if(1&t&&(o.Tb(0,"section",0),o.Tb(1,"div",1),o.Tb(2,"div",2),o.yc(3,gt,1,3,"button",3),o.Sb(),o.Tb(4,"div",4),o.Tb(5,"button",5),o.Ac(6," Prev "),o.Sb(),o.yc(7,ht,2,0,"button",6),o.yc(8,St,2,2,"ng-template",null,7,o.zc),o.Sb(),o.Sb(),o.Tb(10,"div",8),o.Pb(11,9),o.Sb(),o.Sb()),2&t){const t=o.qc(9);o.Bb(3),o.kc("ngForOf",n.steps),o.Bb(2),o.kc("disabled",0==n.selectedIndex),o.Bb(2),o.kc("ngIf",n.selectedIndex!==n.stepsCount)("ngIfElse",t),o.Bb(3),o.xc("display",n.selected?"block":"none"),o.Bb(1),o.kc("ngTemplateOutlet",n.selected.content)}},directives:[i.j,f.a,s.g,i.k,i.p,i.i,s.f,k.b],styles:[".step-navigation-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.steps_wrapper[_ngcontent-%COMP%]{margin-top:-15px;margin-left:33px}.quiz-stepper[_ngcontent-%COMP%]{background:transparent;border:0;margin-right:.2rem;border-bottom:2px solid #ccc;width:40px}.quiz-stepper.step-active[_ngcontent-%COMP%]{color:#13a864;border-bottom:2px solid #13a864}.stepper_btns[_ngcontent-%COMP%]{margin-top:-22px}.step-nav-btns[_ngcontent-%COMP%]{min-width:80px}"]}),t})();const It=o.Vb(wt);let qt=(()=>{class t{}return t.\u0275mod=o.Lb({type:t}),t.\u0275inj=o.Kb({factory:function(n){return new(n||t)},imports:[[i.b,f.b,w.e,I.c,s.e,p.b,q.d,k.a,d.b,S,u.d.forChild([{path:"",component:kt}])]]}),t})()}}]);