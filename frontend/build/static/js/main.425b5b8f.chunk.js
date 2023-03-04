(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{116:function(e,t,a){},147:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(103),s=a.n(c),i=(a(116),a(30)),o=a(13),l=a(25),d=a(14),u=a(21),j=a(15),b=a(36),p=a(149),h=a(68),O=Object(h.b)({name:"auth",initialState:{user:null,email:null,token:null,cycle:null,avgLength:null,periodStartDate:null,periodEndDate:null,daysTillPeriod:null,canBleed:!1,isBleeding:!1,daysleft:null,previousPeriod:[{startDate:null,endDate:null,count:null}]},reducers:{setLogin:function(e,t){e.user=t.payload.user,e.email=t.payload.email,e.token=t.payload.token,e.cycle=t.payload.cycle,e.avgLength=t.payload.avgLength,e.periodStartDate=t.payload.periodStartDate,e.periodEndDate=t.payload.periodEndDate,e.daysTillPeriod=t.payload.cycle,e.canBleed=t.payload.canBleed,e.isBleeding=t.payload.isBleeding,e.previousPeriod=t.payload.previousPeriod},setLogout:function(e){e.user=null,e.token=null,e.cycle=null,e.daysTillPeriod=null,e.periodStartDate=null,e.periodEndDate=null,e.daysTillPeriod=null,e.canBleed=!1,e.isBleeding=!1,e.previousPeriod=null},setPeriod:function(e,t){e.previousPeriod=t.payload.previousPeriod},setCycle:function(e,t){e.cycle=t.payload.cycle,e.avgLength=t.payload.avgLength},setNewPeriod:function(e,t){e.periodStartDate=t.payload.periodStartDate,e.periodEndDate=t.payload.periodEndDate},setUserInfo:function(e,t){e.periodStartDate=t.payload.periodStartDate,e.periodEndDate=t.payload.periodEndDate,e.cycle=t.payload.cycle,e.avgLength=t.payload.avgLength,e.canBleed=t.payload.canBleed,e.isBleeding=t.payload.isBleeding,e.previousPeriod=t.payload.previousPeriod},setCanBleed:function(e,t){e.canBleed=t.payload.canBleed},setIsBleeding:function(e,t){e.isBleeding=t.payload.isBleeding},setDays:function(e,t){e.daysleft=t.payload.daysleft}}}),m=O.actions,x=m.setLogin,f=m.setLogout,v=m.setPeriod,g=m.setCycle,D=m.setNewPeriod,y=m.setUserInfo,w=m.setIsBleeding,N=m.setCanBleed,k=(m.setDays,O.reducer),Y=a(17),B=a(1),S=function(){return Object(B.jsx)("div",{className:"loading",children:Object(B.jsx)("div",{className:"spinner"})})};function P(){var e=Object(o.n)(),t=Object(Y.b)(),a=Object(n.useState)(),r=Object(j.a)(a,2),c=(r[0],r[1]),s=Object(n.useState)(!1),i=Object(j.a)(s,2),h=i[0],O=i[1],m=function(){var a=Object(u.a)(Object(d.a)().mark((function a(n){var r,s,i,o,l,u;return Object(d.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=n.email,s=n.username,i=n.password,O(!0),a.prev=4,a.next=7,p.a.post("http://localhost:8080/register",{email:r,username:s,password:i});case 7:return o=a.sent,a.next=10,o;case 10:if(!a.sent){a.next=19;break}return a.next=14,p.a.post("http://localhost:8080/auth/login",{email:r,password:i});case 14:return l=a.sent,a.next=17,l;case 17:(u=a.sent)&&(t(x({user:u.data.user.username,email:u.data.user.email,token:u.data.accessToken,cycle:u.data.user.cycle,periodStartDate:u.data.user.periodStartDate,periodEndDate:u.data.user.periodEndDate,previousPeriod:u.data.user.previousPeriod})),e("/AccountSetup"));case 19:a.next=25;break;case 21:a.prev=21,a.t0=a.catch(4),console.log(a.t0),c(a.t0);case 25:case"end":return a.stop()}}),a,null,[[4,21]])})));return function(e){return a.apply(this,arguments)}}();return h?Object(B.jsx)(S,{}):Object(B.jsxs)("section",{className:"login-wrapper",children:[Object(B.jsx)("h1",{children:"SignUp In"}),Object(B.jsx)(b.b,{onSubmit:m,validate:function(e){var t={};return e.email||(t.email="Required"),e.username||(t.username="Required"),e.password||(t.password="Required"),e.passwordconfirm?e.password!==e.passwordconfirm&&(t.passwordconfirm="Must match"):t.passwordconfirm="Required",t},render:function(e){var t=e.handleSubmit,a=(e.form,e.submitting);e.pristine,e.values;return Object(B.jsxs)("form",{onSubmit:t,children:[Object(B.jsx)(b.a,{name:"email",children:function(e){var t=e.input,a=e.meta;return Object(B.jsxs)("div",{className:"email-input",children:[Object(B.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"email",required:!0})),Object(B.jsx)("label",{htmlFor:"email",className:"login-lable",children:Object(B.jsxs)("span",{className:"login-span",children:["Email",Object(B.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(B.jsx)("span",{className:"error",children:a.error})]})}}),Object(B.jsx)(b.a,{name:"username",children:function(e){var t=e.input,a=e.meta;return Object(B.jsxs)("div",{className:"username-input",children:[Object(B.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"text",required:!0})),Object(B.jsx)("label",{htmlFor:"username",className:"login-lable",children:Object(B.jsxs)("span",{className:"login-span",children:["Username",Object(B.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(B.jsx)("span",{className:"error",children:a.error})]})}}),Object(B.jsx)(b.a,{type:"password",name:"password",children:function(e){var t=e.input,a=e.meta;return Object(B.jsxs)("div",{className:"password-input",children:[Object(B.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"password",required:!0})),Object(B.jsx)("label",{htmlFor:"password",className:"login-lable",children:Object(B.jsxs)("span",{className:"login-span",children:["Password",Object(B.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(B.jsx)("span",{className:"error",children:a.error})]})}}),Object(B.jsx)(b.a,{type:"password",name:"passwordconfirm",children:function(e){var t=e.input,a=e.meta;return Object(B.jsxs)("div",{className:"password-input",children:[Object(B.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"password",required:!0})),Object(B.jsx)("label",{htmlFor:"passwordconfirm",className:"login-lable",children:Object(B.jsxs)("span",{className:"login-span",children:["Confirm Password",Object(B.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(B.jsx)("span",{className:"error",children:a.error})]})}}),Object(B.jsx)("button",{type:"submit",disabled:a,children:"Submit"})]})}})]})}var E=a(16),M=a(22),C=a.n(M);function L(e,t){return F.apply(this,arguments)}function F(){return(F=Object(u.a)(Object(d.a)().mark((function e(t,a){var n,r,c;return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(Y.b)(),n=p.a.post("http://localhost:8080/user/getuserinfo",{email:t},{headers:{Authorization:"Bearer ".concat(a)}}),e.next=4,n;case 4:if(!(r=e.sent)){e.next=10;break}return c={periodStartDate:r.data.user.periodStartDate,avgLength:r.data.user.avgLength,cycle:r.data.user.cycle,periodEndDate:r.data.user.periodEndDate,previousPeriod:r.data.user.previousPeriod,canBleed:r.data.user.canBleed,isBleeding:r.data.user.isBleeding},e.abrupt("return",c);case 10:return e.abrupt("return",null);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=a(109),R=function(){var e=Object(Y.b)(),t=Object(Y.c)((function(e){return e.cycle})),a=Object(Y.c)((function(e){return e.avgLength})),n=Object(Y.c)((function(e){return e.previousPeriod}));return Object(B.jsxs)("nav",{className:"nav",children:[Object(B.jsx)("div",{className:"logo",children:"placeholder"}),Object(B.jsx)("input",{id:"mobile-nav-toggle",type:"checkbox"}),Object(B.jsx)("label",{className:"mobile-nav-container",htmlFor:"mobile-nav-toggle",children:Object(B.jsx)("div",{className:"mobile-nav",id:"mobile-nav"})}),Object(B.jsxs)("ul",{className:"nav-links",id:"nav-links",children:[Object(B.jsxs)("li",{className:"stats",children:[Object(B.jsx)("h3",{children:"Information at a Glance"}),Object(B.jsxs)("span",{children:["Cycle Lenght: ",t," days"]}),Object(B.jsx)("br",{}),Object(B.jsxs)("span",{children:["Average Length: ",a," days "]}),Object(B.jsx)("br",{}),Object(B.jsxs)("span",{children:["Periods Logged: ",n.length]})]}),Object(B.jsx)("li",{className:"nav-item",children:Object(B.jsx)(i.c,{to:"/home",children:"Home"})}),Object(B.jsx)("li",{className:"nav-item",children:Object(B.jsx)(i.c,{to:"/profile",children:"Profile"})}),Object(B.jsx)("li",{className:"nav-item",children:Object(B.jsx)(i.c,{to:"/periodinfo",children:"Period Info"})}),Object(B.jsx)("li",{className:"logout",children:Object(B.jsx)("button",{onClick:function(){e(f())},children:Object(B.jsx)(A.a,{})})})]})]})},I=a(73),T=function(e,t){return Object(B.jsx)("div",{className:"countdown-wrapper",children:Object(B.jsx)("div",{className:"days-left",children:Object(B.jsxs)("span",{children:[t,"\xa0",e]})})})},q=function(e){var t=C()(e.startDate).format("YYYY-MM-DD"),a=C()(e.endDate).format("YYYY-MM-DD"),n=86400,r=Date.now()/1e3,c=new Date(t).getTime()/1e3,s=new Date(a).getTime()/1e3,i=s-c,o=s-r;console.log(o);return Object(B.jsx)("div",{className:"countdown-timer",children:Object(B.jsx)(I.a,Object(l.a)(Object(l.a)({},{isPlaying:!0,size:500,strokeWidth:10}),{},{colors:["#EAE8FF","#FF6947","#FA2C00"],colorsTime:[c,432e3,0],duration:i,initialRemainingTime:o,children:function(e){var t,a=e.elapsedTime,r=e.color;return Object(B.jsx)("span",{style:{color:r},children:T("days",(t=i-a,t/n|0))})}}))})},z=function(e){return Object(B.jsxs)("section",{className:"home",children:[Object(B.jsx)(R,{}),Object(B.jsxs)("h1",{children:["Welcome back, ",e.userName]}),Object(B.jsx)("div",{className:"placeholder"}),Object(B.jsxs)("div",{className:"period-countdown",children:[Object(B.jsx)("h2",{children:"Your next period is in"}),Object(B.jsx)(q,{startDate:e.startDate,endDate:e.endDate})]}),Object(B.jsxs)("div",{className:"check-period",children:[Object(B.jsx)("label",{htmlFor:"check-period",children:"Has your period started?"}),Object(B.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]})},H=function(e){return Object(B.jsxs)("section",{className:"home",children:[Object(B.jsx)(R,{}),Object(B.jsxs)("h1",{className:"welcome-text",children:["Welcome back, ",e.userName]}),Object(B.jsx)("div",{className:"placeholder"}),Object(B.jsxs)("div",{className:"period-countdown",children:[Object(B.jsx)("h2",{children:"Your period should be over in"}),Object(B.jsx)(q,{startDate:e.startDate,endDate:e.endDate})]}),Object(B.jsxs)("div",{className:"check-period",children:[Object(B.jsx)("label",{htmlFor:"check-period",children:"Has your period ended?"}),Object(B.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]})},W=function(e){return Object(B.jsx)("div",{className:"countdown-timer",children:Object(B.jsx)(I.a,Object(l.a)(Object(l.a)({},{isPlaying:!0,size:500,strokeWidth:10}),{},{colors:"#EAE8FF",children:function(t){var a=t.color;return Object(B.jsx)("span",{style:{color:a},children:(e.message,Object(B.jsx)("div",{className:"countdown-wrapper",children:Object(B.jsx)("div",{className:"days-left",children:Object(B.jsx)("span",{children:e.message})})}))})}}))})},U=function(e){return Object(B.jsxs)("div",{className:"page-wrapper",children:[Object(B.jsx)(R,{}),Object(B.jsxs)("section",{className:"home",children:[Object(B.jsxs)("h1",{children:["Welcome back, ",e.userName]}),Object(B.jsx)("div",{className:"placeholder"}),Object(B.jsxs)("div",{className:"period-countdown",children:[Object(B.jsx)("h2",{children:"Your period might be here"}),Object(B.jsxs)("div",{className:"inner-circle",children:[Object(B.jsx)(W,{startDate:e.startDate,endDate:e.endDate}),Object(B.jsx)("span",{children:"Today"})]})]}),Object(B.jsxs)("div",{className:"check-period",children:[Object(B.jsx)("label",{htmlFor:"check-period",children:"Has your period started?"}),Object(B.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]})]})},J=function(e){return Object(B.jsxs)("div",{className:"page-wrapper",children:[Object(B.jsx)(R,{}),Object(B.jsxs)("section",{className:"home",children:[Object(B.jsxs)("h1",{children:["Welcome back, ",e.userName]}),Object(B.jsx)("div",{className:"placeholder"}),Object(B.jsxs)("div",{className:"period-countdown",children:[Object(B.jsx)("h2",{children:"Error"}),Object(B.jsx)(W,{message:e.message})]}),Object(B.jsxs)("div",{className:"check-period",children:[Object(B.jsx)("label",{htmlFor:"check-period",children:"Has your period started?"}),Object(B.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]})]})},G=function(){var e=Object(Y.b)(),t=Object(Y.c)((function(e){return e.cycle})),a=Object(Y.c)((function(e){return e.user})),r=Object(Y.c)((function(e){return e.previousPeriod})),c=Object(Y.c)((function(e){return e.periodEndDate})),s=Object(Y.c)((function(e){return e.periodStartDate})),i=Object(Y.c)((function(e){return e.avgLength})),o=Object(Y.c)((function(e){return e.token})),l=Object(Y.c)((function(e){return e.email})),b=Object(Y.c)((function(e){return e.isBleeding})),h=Object(Y.c)((function(e){return e.canBleed})),O=Object(n.useState)(!0),m=Object(j.a)(O,2),x=m[0],f=m[1],k=new Date;k=C()(k).format("YYYY-MM-DD");var S=L(l,o),P=function(e){var t=0,a=0,n=null,r=0,c=e.length;return 1!==c&&(e.forEach((function(e){if(t+=C()(e.endDate).diff(e.startDate,"days"),null!=n){var c=C()(n).diff(e.startDate,"month",!0);Math.abs(c)<1.5&&(a+=Math.abs(C()(e.startDate).diff(n,"days")),r+=1)}else n=C()(e.startDate)})),{avgLength:Math.round(t/c),cycle:Math.round(a/r)})}(r),M=function(e,t,a,n,r){var c,s,i=null,o=new Date;if(o=C()(o).format(),e&&t)return!1;a.forEach((function(e){(null===i||i<e.startDate)&&(i=e.startDate)}));var l=C()(o).diff(i,"month");if(n&&r)if(l>1){var d=C()(i).add(l,"months");c=C()(d).add(n,"days"),s=C()(d).add(r,"days")}else i=C()(i).format(),c=C()(i).add(n,"days"),s=C()(c).add(r,"days");return{startDate:c,endDate:s}}(s,c,r,t,i),F=C()(s).subtract(t,"days"),A=function(){var t=Object(u.a)(Object(d.a)().mark((function t(a,n,r){var c,i,o,l,u;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a;case 2:c=t.sent,e(y({periodStartDate:c.periodStartDate,periodEndDate:c.periodEndDate,canBleed:c.canBleed,isBleeding:c.isBleeding,previousPeriod:c.previousPeriod})),n&&(i=n.cycle,o=n.avgLength,e(g({cycle:i,avgLength:o}))),r&&(l=C()(r.startDate).format("YYYY-MM-DD"),u=C()(r.endDate).format("YYYY-MM-DD"),e(D({periodStartDate:l,periodEndDate:u})),R(l,u)),f(!1),(s==k||s<k)&&e(N({canBleed:!0}));case 8:case"end":return t.stop()}}),t)})));return function(e,a,n){return t.apply(this,arguments)}}(),R=function(){var e=Object(u.a)(Object(d.a)().mark((function e(a,n){return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.a.post("http://localhost:8080/user/addperiod",{email:l,startDate:a,endDate:n,cycle:t,avgLength:i},{headers:{Authorization:"Bearer ".concat(o)}});case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),I=function(){var e=Object(u.a)(Object(d.a)().mark((function e(){return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.a.post("http://localhost:8080/user/setperiodinfo",{email:l,isBleeding:b,canBleed:h},{headers:{Authorization:"Bearer ".concat(o)}});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(u.a)(Object(d.a)().mark((function e(){return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.a.post("http://localhost:8080/user/addpreviousperiod",{email:l,previousPeriod:r},{headers:{Authorization:"Bearer ".concat(o)}});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(){var e=Object(u.a)(Object(d.a)().mark((function e(t,a){return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.a.post("http://localhost:8080/user/updateperiod",{email:l,periodStartDate:t,periodEndDate:a},{headers:{Authorization:"Bearer ".concat(o)}});case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),W=function(){var t=Object(u.a)(Object(d.a)().mark((function t(){var a;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("clicked"),s!=k&&(a=C()(k).add("days",i).format("YYYY-MM-DD"),q(k,a)),h&&e(N({canBleed:!1})),e(w({isBleeding:!0}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),G=function(){var t=Object(u.a)(Object(d.a)().mark((function t(){var a;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c!=k?(a=C()(k).add("days",i).format("YYYY-MM-DD"),e(v({previousPeriod:[].concat(Object(E.a)(r),[{startDate:s,endDate:a}])})),e(w({isBleeding:!1}))):(e(v({previousPeriod:[].concat(Object(E.a)(r),[{startDate:s,endDate:c}])})),e(w({isBleeding:!1})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(n.useEffect)((function(){A(S,P,M)}),[t,s,c]),Object(n.useEffect)((function(){I()}),[b,h]),Object(n.useEffect)((function(){T()}),[b]),console.log(r);return function(e,n,r){return e||n||r?n?Object(B.jsx)(U,{userName:a,onClick:W,endDate:s,startDate:k}):r?Object(B.jsx)(J,{userName:a,onClick:null,message:"More logs are required"}):Object(B.jsx)(H,{userName:a,onClick:G,endDate:c,startDate:s}):Object(B.jsx)(z,{cycle:t,userName:a,endDate:s,startDate:F,onClick:W})}(b,h,x)};var V=function(){var e=Object(o.n)(),t=Object(Y.b)(),a=Object(n.useState)(!1),r=Object(j.a)(a,2),c=r[0],s=r[1],h=Object(n.useState)(""),O=Object(j.a)(h,2);function m(){return(m=Object(u.a)(Object(d.a)().mark((function a(n){var r,c,i,o;return Object(d.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s(!0),r=n.email,c=n.password,a.next=5,p.a.post("".concat("https://period-tracker-api.onrender.com","/auth/login"),{email:r,password:c});case 5:return i=a.sent,a.next=8,i;case 8:(o=a.sent)&&t(x({user:o.data.user.username,email:o.data.user.email,token:o.data.accessToken,cycle:o.data.user.cycle,avgLength:o.data.avgLength,periodStartDate:o.data.user.periodStartDate,periodEndDate:o.data.user.periodEndDate,previousPeriod:o.data.user.previousPeriod,isBleeding:o.data.user.isBleeding,canBleed:o.data.user.canBleed})),e("/home");case 12:case"end":return a.stop()}}),a)})))).apply(this,arguments)}O[0],O[1],console.log("".concat("https://period-tracker-api.onrender.com","/auth/login"));var f=c?Object(B.jsx)(S,{}):Object(B.jsxs)("section",{className:"login-wrapper",children:[Object(B.jsx)("h1",{children:"Sign In"}),Object(B.jsx)(b.b,{onSubmit:function(e){return m.apply(this,arguments)},validate:function(e){var t={};return e.email||(t.email="Required"),e.password||(t.password="Required"),t},render:function(e){var t=e.handleSubmit,a=(e.form,e.submitting);e.pristine,e.values;return Object(B.jsxs)("form",{onSubmit:t,children:[Object(B.jsx)(b.a,{name:"email",children:function(e){var t=e.input,a=e.meta;return Object(B.jsxs)("div",{className:"email-input",children:[Object(B.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"email",required:!0})),Object(B.jsx)("label",{htmlFor:"email",className:"login-lable",children:Object(B.jsxs)("span",{className:"login-span",children:["Email",Object(B.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(B.jsx)("span",{className:"error",children:a.error})]})}}),Object(B.jsx)(b.a,{name:"password",children:function(e){var t=e.input,a=e.meta;return Object(B.jsxs)("div",{className:"password-input",children:[Object(B.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"password",required:!0})),Object(B.jsx)("label",{htmlFor:"password",className:"login-lable",children:Object(B.jsxs)("span",{className:"login-span",children:["Password",Object(B.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(B.jsx)("span",{className:"error",children:a.error})]})}}),Object(B.jsxs)("div",{className:"remember-me",children:[Object(B.jsx)("input",{type:"checkbox",id:"remember",name:"chkbox"}),Object(B.jsx)("label",{htmlFor:"chkbox",children:"Remember Me"})]}),Object(B.jsx)("button",{type:"submit",disabled:a,children:"Submit"})]})}}),Object(B.jsx)("hr",{}),Object(B.jsxs)("div",{className:"sign-up",children:[Object(B.jsx)("span",{children:"New?"}),Object(B.jsx)(i.b,{to:"/signup",children:"Create an account here"})]})]});return f},K=a(49),Q=function(){var e=Object(Y.c)((function(e){return e.user})),t=Object(Y.c)((function(e){return e.periodEndDate})),a=Object(Y.c)((function(e){return e.periodStartDate})),r=Object(Y.c)((function(e){return e.token})),c=Object(Y.c)((function(e){return e.email})),s=L(c,r),i=function(){var e=Object(u.a)(Object(d.a)().mark((function e(n){return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a||t){e.next=5;break}return e.next=3,n;case 3:e.sent,console.log("test");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=Object(n.useState)([{startDate:new Date(C()(a).format("YYYY-MM-DD")),endDate:new Date(C()(t).format("YYYY-MM-DD"))}]),l=Object(j.a)(o,2),b=l[0];l[1];return Object(n.useEffect)((function(){i(s)}),[]),Object(B.jsxs)("div",{children:[Object(B.jsx)(R,{}),Object(B.jsxs)("section",{className:"profile",children:[Object(B.jsxs)("h1",{className:"welcome-text",children:["Hello ",e,","]}),Object(B.jsx)("h2",{}),Object(B.jsx)(K.DateRange,{editableDateInputs:!1,showMonthAndYearPickers:!1,ranges:b}),Object(B.jsxs)("div",{className:"account-settings",children:[Object(B.jsx)("span",{children:"Settings"}),Object(B.jsxs)("ul",{children:[Object(B.jsx)("li",{children:"Email Notifications"}),Object(B.jsx)("li",{children:"Password Change"}),Object(B.jsx)("li",{children:"Delete Account"})]})]})]})]})};var X=function(){var e=Object(n.useState)([{startDate:new Date,endDate:new Date(""),key:"selection"}]),t=Object(j.a)(e,2),a=t[0],r=t[1],c=Object(Y.c)((function(e){return e.previousPeriod}));return Object(B.jsxs)("section",{className:"page-wrapper",children:[Object(B.jsx)(R,{}),Object(B.jsxs)("div",{className:"logging-period",children:[Object(B.jsx)("h1",{children:"Do you have any more period(s) to log?"}),Object(B.jsx)(K.DateRange,{editableDateInputs:!0,showMonthAndYearPickers:!1,fixedHeight:!0,onChange:function(e){return r([e.selection])},moveRangeOnFirstSelection:!1,ranges:a})]}),Object(B.jsxs)("div",{className:"remove-period",children:[Object(B.jsx)("h2",{children:"Or would you like to remove some?"}),Object(B.jsxs)("fieldset",{children:[Object(B.jsx)("label",{htmlFor:"periods",children:"Select a period to remove:"}),Object(B.jsxs)("select",{name:"periods",className:"periods",children:[Object(B.jsx)("option",{disabled:!0,selected:!0,children:"Select a date"}),c.map((function(e,t){return Object(B.jsx)("option",{value:t,children:"".concat(C()(e.startDate).format("MMMM Do YYYY")," - ").concat(C()(e.endDate).format("MMMM Do YYYY"))},e+t)}))]})]}),Object(B.jsx)("button",{onClick:function(){},children:"Remove"})]})]})},Z=function(){var e=Object(o.n)(),t=Object(Y.b)(),a=Object(n.useState)([{startDate:new Date,endDate:new Date,key:"selection"}]),r=Object(j.a)(a,2),c=r[0],s=r[1],i=Object(n.useState)(!1),l=Object(j.a)(i,2),b=l[0],h=l[1],O=Object(Y.c)((function(e){return e.previousPeriod})),m=Object(Y.c)((function(e){return e.email})),x=Object(Y.c)((function(e){return e.token})),f=function(e){t(v({previousPeriod:e}))};Object(n.useEffect)((function(){!function(e){if(e[0].endDate&&e[0].startDate.getDate()!=e[0].endDate.getDate()){var t=C()(e[0].startDate).format(),a=C()(e[0].endDate).format();if(0!=O.length){var n=O.map((function(e){return e})),r={startDate:t,endDate:a,count:O.length};n.push(r),f(n)}else f([{startDate:t,endDate:a,count:0}])}}(c)}),[c]);var g=function(){var t=Object(u.a)(Object(d.a)().mark((function t(){return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return h(!0),t.prev=1,t.next=4,p.a.post("http://localhost:8080/user/newuser",{email:m,userInfo:O},{headers:{Authorization:"Bearer ".concat(x)}});case 4:e("/home"),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return console.log(c),b?Object(B.jsx)(S,{}):Object(B.jsxs)("section",{className:"setup-wrapper",children:[Object(B.jsx)("h1",{children:"When was your last few periods?"}),Object(B.jsx)("p",{children:"Just select them below, and once your done hit next. Please try to make them as close as you can."}),Object(B.jsx)(K.DateRange,{editableDateInputs:!0,showMonthAndYearPickers:!1,fixedHeight:!0,onChange:function(e){return s([e.selection])},moveRangeOnFirstSelection:!1,ranges:c}),Object(B.jsx)("button",{type:"submit",className:"nextButton",onClick:g,children:"Next"})]})},$=a(34),_=a(108),ee=function(){var e=document.getElementById("calendar");new $.a(e,{plugins:[_.a],initialView:"resourceTimelineWeek",resources:[{title:"Resource A"},{title:"Resource B"}]}).render()};var te=function(){var e=Boolean(Object(Y.c)((function(e){return e.token})));return Object(Y.c)((function(e){return e.previousPeriod})),Object(B.jsx)(i.a,{children:Object(B.jsxs)(o.d,{children:[Object(B.jsx)(o.b,{path:"/accountsetup",element:Object(B.jsx)(Z,{})}),Object(B.jsx)(o.b,{path:"/signup",element:Object(B.jsx)(P,{})}),Object(B.jsx)(o.b,{path:"/",element:Object(B.jsx)(V,{})}),Object(B.jsx)(o.b,{path:"/profile",element:e?Object(B.jsx)(Q,{}):Object(B.jsx)(o.a,{to:"/"})}),Object(B.jsx)(o.b,{path:"/periodinfo",element:e?Object(B.jsx)(X,{}):Object(B.jsx)(o.a,{to:"/"})}),Object(B.jsx)(o.b,{path:"/home",element:e?Object(B.jsx)(G,{}):Object(B.jsx)(o.a,{to:"/"})}),Object(B.jsx)(o.b,{path:"/Test1",element:Object(B.jsx)(ee,{})})]})})},ae=a(40),ne=a(106),re=a.n(ne),ce=a(107),se={key:"root",storage:re.a,version:1},ie=Object(ae.g)(se,k),oe=Object(h.a)({reducer:ie,middleware:function(e){return e({serializableCheck:{ignoredActions:[ae.a,ae.f,ae.b,ae.c,ae.d,ae.e]}})}});s.a.createRoot(document.getElementById("root")).render(Object(B.jsx)(r.a.StrictMode,{children:Object(B.jsx)(Y.a,{store:oe,children:Object(B.jsx)(ce.a,{loading:null,persistor:Object(ae.h)(oe),children:Object(B.jsx)(te,{})})})}))}},[[147,1,2]]]);
//# sourceMappingURL=main.425b5b8f.chunk.js.map