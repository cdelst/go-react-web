(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{18:function(e,t,n){},19:function(e,t,n){},21:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),a=n(9),s=n.n(a),i=(n(18),n(19),n(13)),r=(n(7),n(1)),l=function(){return Object(r.jsx)("div",{className:"IntroContainer",children:Object(r.jsxs)("div",{className:"IntroContainer-content",children:[Object(r.jsx)("div",{className:"IntroContainer-content--intro",children:"hi there! my name is"}),Object(r.jsx)("div",{className:"IntroContainer-content--name",children:"case."}),Object(r.jsx)("div",{className:"IntroContainer-content--occupation",children:Object(r.jsx)("div",{children:"developer + student"})})]})})},d=function(){var e=JSON.parse(localStorage.getItem("location")),t=Object(c.useState)(e),n=Object(i.a)(t,2),o=n[0],a=n[1];console.log("location from localStorage: "+o),Object(c.useEffect)((function(){if(null!=o){var e=parseInt(o.last_updated);Date.now()-e>6e5&&(s(),console.log("Longer than 10 minutes since last fetch"))}null==o&&(s(),console.log("localStorage empty, fetching"))}),[]);var s=function(){fetch("api/query").then((function(e){return e.json()})).then((function(e){e.last_updated=Date.now(),a(e),localStorage.setItem("location",JSON.stringify(e))}))};return Object(r.jsx)(l,{})},j=(n(21),n.p+"static/media/logo-512.a05c642e.png");var u=function(){return Object(r.jsx)("div",{className:"Title-background",children:Object(r.jsx)("img",{className:"App-logo",src:j,alt:"signature"})})};console.log("5b7ee5cdde67d6a1b66ad6c1671ba586d9dc766");var b=function(){return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("div",{children:Object(r.jsx)(u,{})}),Object(r.jsx)("div",{className:"body",children:Object(r.jsx)(d,{})})]})},h=n(12);s.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(h.a,{children:Object(r.jsx)(b,{})})}),document.getElementById("root"))},7:function(e,t,n){}},[[27,1,2]]]);
//# sourceMappingURL=main.3eaf2c95.chunk.js.map