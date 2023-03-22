(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{109:function(e,t,a){},143:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(96),s=a.n(c),i=(a(109),a(23)),o=a(7),l=a(15),d=a(6),j=a(11),u=a(8),b=a(30),p=a(147),h=a(62),O=Object(h.b)({name:"auth",initialState:{user:null,email:null,token:null,cycle:null,avgLength:null,periodStartDate:null,periodEndDate:null,daysTillPeriod:null,canBleed:!1,isBleeding:!1,daysleft:null,previousPeriod:[{startDate:null,endDate:null,count:null}]},reducers:{setLogin:function(e,t){e.user=t.payload.user,e.email=t.payload.email,e.token=t.payload.token,e.cycle=t.payload.cycle,e.avgLength=t.payload.avgLength,e.periodStartDate=t.payload.periodStartDate,e.periodEndDate=t.payload.periodEndDate,e.daysTillPeriod=t.payload.cycle,e.canBleed=t.payload.canBleed,e.isBleeding=t.payload.isBleeding,e.previousPeriod=t.payload.previousPeriod},setLogout:function(e){e.user=null,e.token=null,e.cycle=null,e.daysTillPeriod=null,e.periodStartDate=null,e.periodEndDate=null,e.daysTillPeriod=null,e.canBleed=!1,e.isBleeding=!1,e.previousPeriod=null},setPeriod:function(e,t){e.previousPeriod=t.payload.previousPeriod},setCycle:function(e,t){e.cycle=t.payload.cycle,e.avgLength=t.payload.avgLength},setNewPeriod:function(e,t){e.periodStartDate=t.payload.periodStartDate,e.periodEndDate=t.payload.periodEndDate},setUserInfo:function(e,t){e.periodStartDate=t.payload.periodStartDate,e.periodEndDate=t.payload.periodEndDate,e.cycle=t.payload.cycle,e.avgLength=t.payload.avgLength,e.canBleed=t.payload.canBleed,e.isBleeding=t.payload.isBleeding,e.previousPeriod=t.payload.previousPeriod},setCanBleed:function(e,t){e.canBleed=t.payload.canBleed},setIsBleeding:function(e,t){e.isBleeding=t.payload.isBleeding},setDays:function(e,t){e.daysleft=t.payload.daysleft}}}),m=O.actions,x=m.setLogin,f=m.setLogout,v=m.setPeriod,g=m.setCycle,D=m.setNewPeriod,y=m.setUserInfo,w=m.setIsBleeding,N=m.setCanBleed,k=(m.setDays,O.reducer),S=a(9),Y=a(1),B=function(){return Object(Y.jsx)("div",{className:"loading",children:Object(Y.jsx)("div",{className:"spinner"})})};function P(){var e=Object(o.n)(),t=Object(S.b)(),a=Object(n.useState)(),r=Object(u.a)(a,2),c=(r[0],r[1]),s=Object(n.useState)(!1),i=Object(u.a)(s,2),h=i[0],O=i[1],m=function(){var a=Object(j.a)(Object(d.a)().mark((function a(n){var r,s,i,o,l,j;return Object(d.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=n.email,s=n.username,i=n.password,O(!0),a.prev=4,a.next=7,p.a.post("".concat("https://period-tracker-api.onrender.com","/register"),{email:r,username:s,password:i});case 7:return o=a.sent,a.next=10,o;case 10:if(!a.sent){a.next=19;break}return a.next=14,p.a.post("".concat("https://period-tracker-api.onrender.com","/auth/login"),{email:r,password:i});case 14:return l=a.sent,a.next=17,l;case 17:(j=a.sent)&&(t(x({user:j.data.user.username,email:j.data.user.email,token:j.data.accessToken,cycle:j.data.user.cycle,periodStartDate:j.data.user.periodStartDate,periodEndDate:j.data.user.periodEndDate,previousPeriod:j.data.user.previousPeriod})),e("/AccountSetup"));case 19:a.next=25;break;case 21:a.prev=21,a.t0=a.catch(4),console.log(a.t0),c(a.t0);case 25:case"end":return a.stop()}}),a,null,[[4,21]])})));return function(e){return a.apply(this,arguments)}}();return h?Object(Y.jsx)(B,{}):Object(Y.jsxs)("section",{className:"login-wrapper",children:[Object(Y.jsx)("h1",{children:"Sign Up"}),Object(Y.jsx)(b.b,{onSubmit:m,validate:function(e){var t={};return e.email||(t.email="Required"),e.username||(t.username="Required"),e.password||(t.password="Required"),e.passwordconfirm?e.password!==e.passwordconfirm&&(t.passwordconfirm="Must match"):t.passwordconfirm="Required",t},render:function(e){var t=e.handleSubmit,a=(e.form,e.submitting);e.pristine,e.values;return Object(Y.jsxs)("form",{onSubmit:t,children:[Object(Y.jsx)(b.a,{name:"email",children:function(e){var t=e.input,a=e.meta;return Object(Y.jsxs)("div",{className:"email-input",children:[Object(Y.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"email",required:!0})),Object(Y.jsx)("label",{htmlFor:"email",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Email",Object(Y.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(Y.jsx)("span",{className:"error",children:a.error})]})}}),Object(Y.jsx)(b.a,{name:"username",children:function(e){var t=e.input,a=e.meta;return Object(Y.jsxs)("div",{className:"username-input",children:[Object(Y.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"text",required:!0})),Object(Y.jsx)("label",{htmlFor:"username",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Username",Object(Y.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(Y.jsx)("span",{className:"error",children:a.error})]})}}),Object(Y.jsx)(b.a,{type:"password",name:"password",children:function(e){var t=e.input,a=e.meta;return Object(Y.jsxs)("div",{className:"password-input",children:[Object(Y.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"password",required:!0})),Object(Y.jsx)("label",{htmlFor:"password",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Password",Object(Y.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(Y.jsx)("span",{className:"error",children:a.error})]})}}),Object(Y.jsx)(b.a,{type:"password",name:"passwordconfirm",children:function(e){var t=e.input,a=e.meta;return Object(Y.jsxs)("div",{className:"password-input",children:[Object(Y.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"password",required:!0})),Object(Y.jsx)("label",{htmlFor:"passwordconfirm",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Confirm Password",Object(Y.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(Y.jsx)("span",{className:"error",children:a.error})]})}}),Object(Y.jsx)("button",{type:"submit",disabled:a,children:"Submit"})]})}})]})}var M=a(18),C=a(13),E=a.n(C);function F(){return(F=Object(j.a)(Object(d.a)().mark((function e(t,a){var n,r,c;return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(S.b)(),n=p.a.post("".concat("https://period-tracker-api.onrender.com","/user/getuserinfo"),{email:t},{headers:{Authorization:"Bearer ".concat(a)}}),e.next=4,n;case 4:if(!(r=e.sent)){e.next=10;break}return c={periodStartDate:r.data.user.periodStartDate,avgLength:r.data.user.avgLength,cycle:r.data.user.cycle,periodEndDate:r.data.user.periodEndDate,previousPeriod:r.data.user.previousPeriod,canBleed:r.data.user.canBleed,isBleeding:r.data.user.isBleeding},e.abrupt("return",c);case 10:return e.abrupt("return",null);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var L=a(102),A=function(){var e=Object(S.b)(),t=Object(S.c)((function(e){return e.cycle})),a=Object(S.c)((function(e){return e.avgLength})),n=Object(S.c)((function(e){return e.previousPeriod}));return Object(Y.jsxs)("nav",{className:"nav",children:[Object(Y.jsx)("div",{className:"logo",children:"placeholder"}),Object(Y.jsx)("input",{id:"mobile-nav-toggle",type:"checkbox"}),Object(Y.jsx)("label",{className:"mobile-nav-container",htmlFor:"mobile-nav-toggle",children:Object(Y.jsx)("div",{className:"mobile-nav",id:"mobile-nav"})}),Object(Y.jsxs)("ul",{className:"nav-links",id:"nav-links",children:[Object(Y.jsxs)("li",{className:"stats",children:[Object(Y.jsx)("h3",{children:"Information at a Glance"}),Object(Y.jsxs)("span",{children:["Cycle Lenght: ",t," days"]}),Object(Y.jsx)("br",{}),Object(Y.jsxs)("span",{children:["Average Length: ",a," days "]}),Object(Y.jsx)("br",{}),Object(Y.jsxs)("span",{children:["Periods Logged: ",n.length]})]}),Object(Y.jsx)("li",{className:"nav-item",children:Object(Y.jsx)(i.c,{to:"/home",children:"Home"})}),Object(Y.jsx)("li",{className:"nav-item",children:Object(Y.jsx)(i.c,{to:"/profile",children:"Profile"})}),Object(Y.jsx)("li",{className:"nav-item",children:Object(Y.jsx)(i.c,{to:"/periodinfo",children:"Period Info"})}),Object(Y.jsx)("li",{className:"logout",children:Object(Y.jsx)("button",{onClick:function(){e(f())},children:Object(Y.jsx)(L.a,{})})})]})]})},R=a(67),I=function(e,t){return Object(Y.jsx)("div",{className:"countdown-wrapper",children:Object(Y.jsx)("div",{className:"days-left",children:Object(Y.jsxs)("span",{children:[t,"\xa0",e]})})})},q=function(e){var t=E()(e.startDate).format("YYYY-MM-DD"),a=E()(e.endDate).format("YYYY-MM-DD"),n=86400,r=Date.now()/1e3,c=new Date(t).getTime()/1e3,s=new Date(a).getTime()/1e3,i=s-c,o=s-r;return Object(Y.jsx)("div",{className:"countdown-timer",children:Object(Y.jsx)(R.a,Object(l.a)(Object(l.a)({},{isPlaying:!0,size:500,strokeWidth:10}),{},{colors:[e.color1,e.color2,e.color3],colorsTime:[c,432e3,0],duration:i,initialRemainingTime:o,children:function(e){var t,a=e.elapsedTime,r=e.color;return Object(Y.jsx)("span",{style:{color:r},children:I("days",(t=i-a,Math.ceil(t/n)))})}}))})},z=a(99);var T=function(e){var t=new Date;return Object(Y.jsx)("div",{className:"horizontal-date-picker",children:Object(Y.jsx)(z.Datepicker,{startValue:new Date(e.startValue),endValue:new Date(e.endValue),startDate:Date.now(),endDate:t.setDate(t.getDate()+7),className:"horizontal-date"})})},V=function(){var e=(new Date).getFullYear();return Object(Y.jsx)("footer",{children:Object(Y.jsxs)("span",{children:["\xa9 ",e," ",Object(Y.jsx)("a",{href:"albertfriend.dev",target:"_blank",children:"Albert Friend"})]})})},H=function(e){return Object(Y.jsxs)("div",{className:"page-wrapper",children:[Object(Y.jsx)(A,{}),Object(Y.jsxs)("section",{className:"home content",children:[Object(Y.jsxs)("h1",{children:["Welcome back, ",e.userName]}),Object(Y.jsx)(T,{startValue:e.periodStartDate,endValue:e.periodEndDate}),Object(Y.jsxs)("div",{className:"period-countdown",children:[Object(Y.jsx)("h2",{children:"Your next period is in"}),Object(Y.jsx)(q,{startDate:e.startDate,endDate:e.endDate,color1:"#40bf32",color2:"#e0e20c",color3:"#FA2C00"})]}),Object(Y.jsxs)("div",{className:"check-period",children:[Object(Y.jsx)("label",{htmlFor:"check-period",children:"Has your period started?"}),Object(Y.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]}),Object(Y.jsx)(V,{})]})},W=function(e){return Object(Y.jsxs)("div",{className:"page-wrapper",children:[Object(Y.jsx)(A,{}),Object(Y.jsxs)("section",{className:"home",children:[Object(Y.jsxs)("h1",{className:"welcome-text",children:["Welcome back, ",e.userName]}),Object(Y.jsx)(T,{startValue:e.periodStartDate,endValue:e.periodEndDate}),Object(Y.jsxs)("div",{className:"period-countdown",children:[Object(Y.jsx)("h2",{children:"Your period should be over in"}),Object(Y.jsx)(q,{startDate:e.startDate,endDate:e.endDate,color1:"#40bf32",color2:"#e0e20c",color3:"#FA2C00"})]}),Object(Y.jsxs)("div",{className:"check-period",children:[Object(Y.jsx)("label",{htmlFor:"check-period",children:"Has your period ended?"}),Object(Y.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]}),Object(Y.jsx)(V,{})]})},U=function(e){return Object(Y.jsx)("div",{className:"countdown-timer",children:Object(Y.jsx)(R.a,Object(l.a)(Object(l.a)({},{isPlaying:!0,size:500,strokeWidth:10}),{},{colors:"#EAE8FF",children:function(t){var a=t.color;return Object(Y.jsx)("span",{style:{color:a},children:(e.message,Object(Y.jsx)("div",{className:"countdown-wrapper",children:Object(Y.jsx)("div",{className:"days-left",children:Object(Y.jsx)("span",{children:e.message})})}))})}}))})},J=function(e){return Object(Y.jsxs)("div",{className:"page-wrapper",children:[Object(Y.jsx)(A,{}),Object(Y.jsxs)("section",{className:"home content",children:[Object(Y.jsxs)("h1",{children:["Welcome back, ",e.userName]}),Object(Y.jsx)(T,{startValue:e.periodStartDate,endValue:e.periodEndDate}),Object(Y.jsxs)("div",{className:"period-countdown",children:[Object(Y.jsx)("h2",{children:"Your period might be here"}),Object(Y.jsxs)("div",{className:"inner-circle",children:[Object(Y.jsx)(U,{startDate:e.startDate,endDate:e.endDate}),Object(Y.jsx)("span",{children:"Today"})]})]}),Object(Y.jsxs)("div",{className:"check-period",children:[Object(Y.jsx)("label",{htmlFor:"check-period",children:"Has your period started?"}),Object(Y.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]}),Object(Y.jsx)(V,{})]})},G=function(e){return Object(Y.jsxs)("div",{className:"page-wrapper",children:[Object(Y.jsx)(A,{}),Object(Y.jsxs)("section",{className:"home content",children:[Object(Y.jsxs)("h1",{children:["Welcome back, ",e.userName]}),Object(Y.jsx)("div",{className:"placeholder"}),Object(Y.jsxs)("div",{className:"period-countdown",children:[Object(Y.jsx)("h2",{children:"Error"}),Object(Y.jsx)(U,{message:e.message})]}),Object(Y.jsxs)("div",{className:"check-period",children:[Object(Y.jsx)("label",{htmlFor:"check-period",children:"Has your period started?"}),Object(Y.jsx)("button",{name:"check-period",type:"button",onClick:e.onClick,children:"Yes"})]})]}),Object(Y.jsx)(V,{})]})},_=function(){var e=Object(S.b)(),t=Object(S.c)((function(e){return e.cycle})),a=Object(S.c)((function(e){return e.user})),r=Object(S.c)((function(e){return e.previousPeriod})),c=Object(S.c)((function(e){return e.periodEndDate})),s=Object(S.c)((function(e){return e.periodStartDate})),i=Object(S.c)((function(e){return e.avgLength})),o=Object(S.c)((function(e){return e.token})),l=Object(S.c)((function(e){return e.email})),b=Object(S.c)((function(e){return e.isBleeding})),h=Object(S.c)((function(e){return e.canBleed})),O=Object(n.useState)(!0),m=Object(u.a)(O,2),x=m[0],f=m[1],k=new Date;k=E()(k).format("YYYY-MM-DD");var B=function(e,t){return F.apply(this,arguments)}(l,o),P=function(e){var t=0,a=0,n=null,r=0,c=e.length;return 1!==c&&(e.forEach((function(e){if(t+=E()(e.endDate).diff(e.startDate,"days"),null!=n){var c=E()(n).diff(e.startDate,"month",!0);Math.abs(c)<1.5&&(a+=Math.abs(E()(e.startDate).diff(n,"days")),r+=1)}else n=E()(e.startDate)})),{avgLength:Math.round(t/c),cycle:Math.round(a/r)})}(r),C=function(e,t,a,n,r){var c,s,i=null,o=new Date;if(o=E()(o).format(),e&&t)return!1;a.forEach((function(e){(null===i||i<e.startDate)&&(i=e.startDate)}));var l=E()(o).diff(i,"month");if(n&&r)if(l>1){var d=E()(i).add(l,"months");c=E()(d).add(n,"days"),s=E()(d).add(r,"days")}else i=E()(i).format(),c=E()(i).add(n,"days"),s=E()(c).add(r,"days");return{startDate:c,endDate:s}}(s,c,r,t,i),L=E()(s).subtract(t,"days"),A=function(){var t=Object(j.a)(Object(d.a)().mark((function t(a,n,r){var c,i,o,l,j;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a;case 2:c=t.sent,e(y({periodStartDate:c.periodStartDate,periodEndDate:c.periodEndDate,canBleed:c.canBleed,isBleeding:c.isBleeding,previousPeriod:c.previousPeriod})),n&&(i=n.cycle,o=n.avgLength,e(g({cycle:i,avgLength:o}))),r&&(l=E()(r.startDate).format("YYYY-MM-DD"),j=E()(r.endDate).format("YYYY-MM-DD"),e(D({periodStartDate:l,periodEndDate:j})),R(l,j)),f(!1),(E()(s).format("YYYY-MM-DD")==k||E()(s).format("YYYY-MM-DD")<k&&!b)&&e(N({canBleed:!0}));case 8:case"end":return t.stop()}}),t)})));return function(e,a,n){return t.apply(this,arguments)}}(),R=function(){var e=Object(j.a)(Object(d.a)().mark((function e(a,n){return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.a.post("".concat("https://period-tracker-api.onrender.com","/user/addperiod"),{email:l,startDate:a,endDate:n,cycle:t,avgLength:i},{headers:{Authorization:"Bearer ".concat(o)}});case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),I=function(){var e=Object(j.a)(Object(d.a)().mark((function e(t,a){var n;return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p.a.post("".concat("https://period-tracker-api.onrender.com","/user/updateperiod"),{email:l,periodStartDate:t,periodEndDate:a},{headers:{Authorization:"Bearer ".concat(o)}}),e.abrupt("return",n);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),q=function(){var t=Object(j.a)(Object(d.a)().mark((function t(){var a,n,r,o,l;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(E()(s).format("YYYY-MM-DD")==k){t.next=11;break}return a=E()(k).add("days",i).format("YYYY-MM-DD"),n=I(k,a),console.log(n),t.next=6,n;case 6:r=t.sent,e(N({canBleed:r.data.canBleed})),e(w({isBleeding:r.data.isBleeding})),t.next=17;break;case 11:return o=I(s,c),t.next=14,o;case 14:l=t.sent,e(N({canBleed:l.data.canBleed})),e(w({isBleeding:l.data.isBleeding}));case 17:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),z=function(){var t=Object(j.a)(Object(d.a)().mark((function t(){var a;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("test"),c!=k?(a=E()(k).add("days",i).format("YYYY-MM-DD"),e(v({previousPeriod:[].concat(Object(M.a)(r),[{startDate:s,endDate:a}])})),e(w({isBleeding:!1}))):(e(v({previousPeriod:[].concat(Object(M.a)(r),[{startDate:s,endDate:c}])})),e(w({isBleeding:!1})));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(n.useEffect)((function(){A(B,P,C)}),[t,s,c]);return function(e,n,r){return e||n||r?n?Object(Y.jsx)(J,{userName:a,onClick:q,endDate:s,startDate:k,startValue:s,endValue:c}):r?Object(Y.jsx)(G,{userName:a,onClick:null,message:"More logs are required"}):Object(Y.jsx)(W,{userName:a,onClick:z,endDate:c,startDate:s,periodStartDate:s,periodEndDate:c}):Object(Y.jsx)(H,{cycle:t,userName:a,endDate:s,startDate:L,onClick:q,periodStartDate:s,periodEndDate:c})}(b,h,x)};var K=function(){var e=Object(o.n)(),t=Object(S.b)(),a=Object(n.useState)(!1),r=Object(u.a)(a,2),c=r[0],s=r[1],h=Object(n.useState)(),O=Object(u.a)(h,2),m=O[0],f=O[1],v=Object(n.useState)(""),g=Object(u.a)(v,2);function D(){return(D=Object(j.a)(Object(d.a)().mark((function a(n){var r,c,i,o;return Object(d.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s(!0),r=n.email,c=n.password,a.next=5,p.a.post("".concat("https://period-tracker-api.onrender.com","/auth/login"),{email:r,password:c}).catch((function(e){e.response&&(f(e.response.data.error),console.log(e.response.data.error)),s(!1)}));case 5:return i=a.sent,a.next=8,i;case 8:(o=a.sent)&&(t(x({user:o.data.user.username,email:o.data.user.email,token:o.data.accessToken,cycle:o.data.user.cycle,avgLength:o.data.avgLength,periodStartDate:o.data.user.periodStartDate,periodEndDate:o.data.user.periodEndDate,previousPeriod:o.data.user.previousPeriod,isBleeding:o.data.user.isBleeding,canBleed:o.data.user.canBleed})),e("/home"));case 11:case"end":return a.stop()}}),a)})))).apply(this,arguments)}g[0],g[1];var y=c?Object(Y.jsx)(B,{}):Object(Y.jsxs)("section",{className:"login-wrapper",children:[Object(Y.jsx)("h1",{children:"Sign In"}),Object(Y.jsx)("span",{className:"message",children:m}),Object(Y.jsx)(b.b,{onSubmit:function(e){return D.apply(this,arguments)},validate:function(e){var t={};return e.email||(t.email="Required"),e.password||(t.password="Required"),t},render:function(e){var t=e.handleSubmit,a=(e.form,e.submitting);e.pristine,e.values;return Object(Y.jsxs)("form",{onSubmit:t,children:[Object(Y.jsx)(b.a,{name:"email",children:function(e){var t=e.input,a=e.meta;return Object(Y.jsxs)("div",{className:"email-input",children:[Object(Y.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"email",required:!0})),Object(Y.jsx)("label",{htmlFor:"email",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Email",Object(Y.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(Y.jsx)("span",{className:"error",children:a.error})]})}}),Object(Y.jsx)(b.a,{name:"password",children:function(e){var t=e.input,a=e.meta;return Object(Y.jsxs)("div",{className:"password-input",children:[Object(Y.jsx)("input",Object(l.a)(Object(l.a)({},t),{},{type:"password",required:!0})),Object(Y.jsx)("label",{htmlFor:"password",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Password",Object(Y.jsx)("small",{children:"*"})]})}),a.error&&a.touched&&Object(Y.jsx)("span",{className:"error",children:a.error})]})}}),Object(Y.jsxs)("div",{className:"remember-me",children:[Object(Y.jsx)("input",{type:"checkbox",id:"remember",name:"chkbox"}),Object(Y.jsx)("label",{htmlFor:"chkbox",children:"Remember Me"})]}),Object(Y.jsx)("button",{type:"submit",disabled:a,children:"Submit"})]})}}),Object(Y.jsx)("hr",{}),Object(Y.jsxs)("div",{className:"sign-up",children:[Object(Y.jsx)("span",{children:"New?"}),Object(Y.jsx)(i.b,{to:"/signup",children:"Create an account here"})]})]});return y},Q=a(36),X=function(){var e=Object(o.n)(),t=Object(S.b)(),a=Object(S.c)((function(e){return e.user})),r=(Object(S.c)((function(e){return e.periodEndDate})),Object(S.c)((function(e){return e.periodStartDate})),Object(S.c)((function(e){return e.token}))),c=Object(S.c)((function(e){return e.email})),s=Object(n.useState)(!1),i=Object(u.a)(s,2),l=i[0],d=i[1],j=Object(n.useState)(!1),b=Object(u.a)(j,2),h=b[0],O=b[1],m=Object(n.useState)(!1),x=Object(u.a)(m,2),v=x[0],g=x[1],D=Object(n.useState)(""),y=Object(u.a)(D,2),w=y[0],N=y[1],k=Object(n.useState)(""),B=Object(u.a)(k,2),P=B[0],M=B[1],C=Object(n.useState)(""),E=Object(u.a)(C,2),F=E[0],L=E[1],R=Object(n.useState)(""),I=Object(u.a)(R,2),q=I[0],z=I[1],T=Object(n.useState)(""),H=Object(u.a)(T,2),W=(H[0],H[1]),U=Object(n.useState)([{startDate:new Date,endDate:new Date}]),J=Object(u.a)(U,2),G=J[0],_=(J[1],function(){O(!h)}),K=Object(Y.jsxs)("div",{className:"page-wrapper",children:[Object(Y.jsx)(A,{}),Object(Y.jsxs)("section",{className:"profile content",children:[Object(Y.jsxs)("h1",{className:"welcome-text",children:["Hello ",a,","]}),Object(Y.jsx)("h2",{children:"here is how you month looks"}),Object(Y.jsx)(Q.DateRange,{editableDateInputs:!1,showMonthAndYearPickers:!1,ranges:G}),Object(Y.jsxs)("div",{className:"account-settings",children:[Object(Y.jsx)("button",{onClick:function(){d(!l)},children:"Settings"}),l&&Object(Y.jsxs)("div",{className:"inner-account-settings",children:[Object(Y.jsx)("div",{className:"setting-option",children:Object(Y.jsx)("button",{children:"Email Notifications"})}),Object(Y.jsxs)("div",{className:"setting-option",children:[Object(Y.jsx)("button",{onClick:function(){g(!v)},children:"Password Change"}),v&&Object(Y.jsxs)("form",{className:"password-change",onSubmit:function(){F==q?p.a.post("".concat("https://period-tracker-api.onrender.com","/auth/changepassword"),{email:c,oldPassword:P,newPassword:F},{headers:{Authorization:"Bearer ".concat(r)}}):W("New passwords do not match")},children:[Object(Y.jsxs)("div",{className:"password-input",children:[Object(Y.jsx)("input",{type:"password",value:P,onChange:function(e){M(e.target.value)}}),Object(Y.jsx)("label",{htmlFor:"password",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Old Password",Object(Y.jsx)("small",{children:"*"})]})})]}),Object(Y.jsxs)("div",{className:"password-input",children:[Object(Y.jsx)("input",{type:"password",value:F,onChange:function(e){L(e.target.value)}}),Object(Y.jsx)("label",{htmlFor:"password",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["New Password",Object(Y.jsx)("small",{children:"*"})]})})]}),Object(Y.jsxs)("div",{className:"password-input",children:[Object(Y.jsx)("input",{type:"password",value:q,onChange:function(e){z(e.target.value)}}),Object(Y.jsx)("label",{htmlFor:"password",className:"login-lable",children:Object(Y.jsxs)("span",{className:"login-span",children:["Confirm Password",Object(Y.jsx)("small",{children:"*"})]})})]}),Object(Y.jsx)("button",{type:"submit",children:"Submit"})]})]}),Object(Y.jsx)("div",{className:"setting-option",children:Object(Y.jsx)("button",{onClick:_,children:"Delete Account"})})]})]}),h&&Object(Y.jsx)("div",{className:"page-fade",children:Object(Y.jsxs)("div",{className:"warning-box",children:[Object(Y.jsx)("h1",{children:"Please enter your email adress to delete your account."}),Object(Y.jsxs)("form",{onSubmit:function(){w===c&&(p.a.post("".concat("https://period-tracker-api.onrender.com","/auth/deleteuser"),{email:c},{headers:{Authorization:"Bearer ".concat(r)}}),t(f()),e("/"))},className:"delete-account",children:[Object(Y.jsxs)("div",{className:"email-input",children:[Object(Y.jsx)("input",{type:"email",value:w,onChange:function(e){N(e.target.value)}}),Object(Y.jsx)("label",{htmlFor:"email",className:"login-lable",children:Object(Y.jsx)("span",{className:"login-span",children:"Email"})})]}),Object(Y.jsx)("button",{type:"submit",children:"Delete"}),Object(Y.jsx)("button",{onClick:_,children:"Cancel"})]})]})})]}),Object(Y.jsx)(V,{})]});return K};var Z=function(){var e=Object(S.b)(),t=Object(S.c)((function(e){return e.token})),a=Object(S.c)((function(e){return e.email})),r=Object(S.c)((function(e){return e.previousPeriod})),c=Object(n.useState)(),s=Object(u.a)(c,2),i=s[0],o=s[1],l=Object(n.useState)(),b=Object(u.a)(l,2),h=b[0],O=b[1],m=Object(n.useState)(),x=Object(u.a)(m,2),f=x[0],g=x[1],D=Object(n.useState)([{startDate:new Date,endDate:new Date,key:"selection"}]),y=Object(u.a)(D,2),w=y[0],N=y[1],k=function(){var n=Object(j.a)(Object(d.a)().mark((function n(){var r;return Object(d.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,p.a.post("".concat("https://period-tracker-api.onrender.com","/user/removePeriod"),{email:a,removeDate:i},{headers:{Authorization:"Bearer ".concat(t)}});case 2:201===(r=n.sent).status&&(e(v({previousPeriod:r.data.previousPeriod})),O(r.data.message));case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),B=function(t){e(v({previousPeriod:t}))},P=function(){var e=Object(j.a)(Object(d.a)().mark((function e(){var n,c;return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("".concat("https://period-tracker-api.onrender.com","/user/newuser"),{email:a,userInfo:r},{headers:{Authorization:"Bearer ".concat(t)}});case 2:return n=e.sent,e.next=5,n;case 5:c=e.sent,g("".concat(c.data.message,"!"));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){!function(e){if(e[0].endDate&&e[0].startDate.getDate()!=e[0].endDate.getDate()){var t=E()(e[0].startDate).format(),a=E()(e[0].endDate).format();if(0!=r.length){var n=r.map((function(e){return e})),c={startDate:t,endDate:a,count:r.length};n.push(c),B(n)}else B([{startDate:t,endDate:a,count:0}])}}(w)}),[w]),Object(Y.jsxs)("div",{className:"page-wrapper",children:[Object(Y.jsx)(A,{}),Object(Y.jsxs)("section",{className:"info content",children:[Object(Y.jsxs)("div",{className:"logging-period",children:[Object(Y.jsx)("h1",{children:"Do you have any more period(s) to log?"}),Object(Y.jsx)("span",{className:"message",children:f}),Object(Y.jsx)(Q.DateRange,{editableDateInputs:!0,showMonthAndYearPickers:!1,fixedHeight:!0,onChange:function(e){return N([e.selection])},moveRangeOnFirstSelection:!1,ranges:w}),Object(Y.jsx)("button",{className:"button",onClick:P,children:"Add"})]}),Object(Y.jsxs)("div",{className:"remove-period",children:[Object(Y.jsx)("span",{className:"message",children:h}),Object(Y.jsx)("h2",{children:"Or would you like to remove some?"}),Object(Y.jsxs)("fieldset",{children:[Object(Y.jsx)("label",{htmlFor:"periods",children:"Select a period to remove:"}),Object(Y.jsxs)("select",{name:"periods",className:"periods",onChange:function(e){o(e.target.value)},children:[Object(Y.jsx)("option",{disabled:!0,selected:!0,children:"Select a date"}),r.map((function(e,t){return Object(Y.jsx)("option",{value:t,children:"".concat(E()(e.startDate).format("MMMM Do YYYY")," - ").concat(E()(e.endDate).format("MMMM Do YYYY"))},e+t)}))]})]}),Object(Y.jsx)("button",{className:"button",onClick:k,children:"Remove"})]})]}),Object(Y.jsx)(V,{})]})},$=function(){var e=Object(o.n)(),t=Object(S.b)(),a=Object(n.useState)([{startDate:new Date,endDate:new Date,key:"selection"}]),r=Object(u.a)(a,2),c=r[0],s=r[1],i=Object(n.useState)(!1),l=Object(u.a)(i,2),b=l[0],h=l[1],O=Object(S.c)((function(e){return e.previousPeriod})),m=Object(S.c)((function(e){return e.email})),x=Object(S.c)((function(e){return e.token})),f=function(e){t(v({previousPeriod:e}))};Object(n.useEffect)((function(){!function(e){if(e[0].endDate&&e[0].startDate.getDate()!=e[0].endDate.getDate()){var t=E()(e[0].startDate).format(),a=E()(e[0].endDate).format();if(0!=O.length){var n=O.map((function(e){return e})),r={startDate:t,endDate:a,count:O.length};n.push(r),f(n)}else f([{startDate:t,endDate:a,count:0}])}}(c)}),[c]);var g=function(){var t=Object(j.a)(Object(d.a)().mark((function t(){return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return h(!0),t.prev=1,t.next=4,p.a.post("".concat("https://period-tracker-api.onrender.com","/user/newuser"),{email:m,userInfo:O},{headers:{Authorization:"Bearer ".concat(x)}});case 4:t.sent&&e("/Home"),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(){return t.apply(this,arguments)}}();return b?Object(Y.jsx)(B,{}):Object(Y.jsxs)("section",{className:"setup-wrapper",children:[Object(Y.jsx)("h1",{children:"When was your last few periods?"}),Object(Y.jsx)("p",{children:"Just select them below, and once your done hit next. Please try to make them as close as you can."}),Object(Y.jsx)(Q.DateRange,{editableDateInputs:!0,showMonthAndYearPickers:!1,fixedHeight:!0,onChange:function(e){return s([e.selection])},moveRangeOnFirstSelection:!1,ranges:c}),Object(Y.jsx)("button",{type:"submit",className:"nextButton",onClick:g,children:"Next"})]})},ee=function(){return Object(Y.jsx)("div",{children:Object(Y.jsx)(Q.DateRange,{editableDateInputs:!1,showMonthAndYearPickers:!1})})};var te=function(){var e=Boolean(Object(S.c)((function(e){return e.token})));return Object(S.c)((function(e){return e.previousPeriod})),Object(Y.jsx)(i.a,{children:Object(Y.jsxs)(o.d,{children:[Object(Y.jsx)(o.b,{path:"/accountsetup",element:Object(Y.jsx)($,{})}),Object(Y.jsx)(o.b,{path:"/signup",element:Object(Y.jsx)(P,{})}),Object(Y.jsx)(o.b,{path:"/",element:Object(Y.jsx)(K,{})}),Object(Y.jsx)(o.b,{path:"/profile",element:e?Object(Y.jsx)(X,{}):Object(Y.jsx)(o.a,{to:"/"})}),Object(Y.jsx)(o.b,{path:"/periodinfo",element:e?Object(Y.jsx)(Z,{}):Object(Y.jsx)(o.a,{to:"/"})}),Object(Y.jsx)(o.b,{path:"/home",element:e?Object(Y.jsx)(_,{}):Object(Y.jsx)(o.a,{to:"/"})}),Object(Y.jsx)(o.b,{path:"/Test1",element:Object(Y.jsx)(ee,{})})]})})},ae=a(33),ne=a(100),re=a.n(ne),ce=a(101),se={key:"root",storage:re.a,version:1},ie=Object(ae.g)(se,k),oe=Object(h.a)({reducer:ie,middleware:function(e){return e({serializableCheck:{ignoredActions:[ae.a,ae.f,ae.b,ae.c,ae.d,ae.e]}})}});s.a.createRoot(document.getElementById("root")).render(Object(Y.jsx)(r.a.StrictMode,{children:Object(Y.jsx)(S.a,{store:oe,children:Object(Y.jsx)(ce.a,{loading:null,persistor:Object(ae.h)(oe),children:Object(Y.jsx)(te,{})})})}))}},[[143,1,2]]]);
//# sourceMappingURL=main.076bacf4.chunk.js.map