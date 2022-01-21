(function(t){function e(e){for(var n,s,r=e[0],l=e[1],c=e[2],h=0,p=[];h<r.length;h++)s=r[h],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&p.push(a[s][0]),a[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],n=!0,r=1;r<i.length;r++){var l=i[r];0!==a[l]&&(n=!1)}n&&(o.splice(e--,1),t=s(s.s=i[0]))}return t}var n={},a={app:0},o=[];function s(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;o.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[t.isHome?t._e():i("router-link",{staticClass:"return-home",attrs:{to:"/"}},[t._v("Return home")]),i("router-view"),t._m(0)],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",{staticClass:"footer"},[t._v("Made by "),i("strong",[t._v("Amante Reale")]),t._v(".")])}],s=(i("b0c0"),{name:"app",computed:{isHome:function(){return"home"===this.$route.name}}}),r=s,l=i("2877"),c=Object(l["a"])(r,a,o,!1,null,null,null),u=c.exports,h=i("8c4f"),p=(i("db43"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("h1",[t._v("Choice Paradoxes")]),i("p",[t._v("Choose a paradox: "),i("router-link",{attrs:{to:"/mh"}},[t._v("Monty Hall Problem")]),t._v(" or "),i("router-link",{attrs:{to:"/bb"}},[t._v("Bertrand's Box Paradox")])],1),i("p",[t._v('For each paradox you will be given a choice to play the game yourself. Try it out a couple of times. When you\'re done, run the simulation. Click the "Explain" button to read why the problem tricks people, and how to solve it mathematically.')])])}),d=[],f={name:"Home",props:{}},m=f,v=Object(l["a"])(m,p,d,!1,null,"9c6ff0a2",null),b=v.exports,_=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("h1",[t._v("Monty Hall Problem")]),i("problem-navigation",{attrs:{wikiLink:"https://en.wikipedia.org/wiki/Monty_Hall_problem"},on:{"show-explanation":t.showExplanation}}),i("h2",[t._v("Play the Game")]),i("p",[t._v("In this game you are given a choice of three doors. Behind one door is a car, behind the other two is nothing. After you choose a door, the host of the game will open one of the other doors, not containing the car. At this point you are given a choice to either keep the same door, or choose the other one. Once you make that choice, the host will open your door revealing whether you've won the car or lost.")]),i("div",{staticClass:"game"}),t.playedGame?i("div",{staticClass:"simulation"},[i("button",{attrs:{disabled:t.simRunning,type:"button"},on:{click:function(e){return t.simulate(!1)}}},[t._v("Simulate - No Switching")]),t._v(" "),i("button",{attrs:{disabled:t.simRunning,type:"button"},on:{click:function(e){return t.simulate(!0)}}},[t._v("Simulate Switching")]),t._v(" "),t.simRunning?i("button",{on:{click:t.stopSim}},[t._v("Stop Simulation")]):t._e()]):t._e(),t.ranSimOnce?i("div",{staticClass:"simulation-display"},[i("p",{staticClass:"simulation-notes"},[i("strong",[t._v("Sims:")]),t._v(" "+t._s(t.simulationRuns)+" "),i("br")]),t._m(0),i("div",{staticClass:"door",class:t.doorClass(1)},[t._v(" 1 ")]),i("div",{staticClass:"door",class:t.doorClass(2)},[t._v(" 2 ")]),i("div",{staticClass:"door",class:t.doorClass(3)},[t._v(" 3 ")])]):t._e(),i("BarChart"),i("div",{staticStyle:{clear:"both"}})],1)},y=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",{staticClass:"legend"},[i("strong",[t._v("Legend:")]),t._v(" Car door: "),i("span",{staticClass:"blue"},[t._v("Blue")]),t._v(", First Choice: "),i("span",{staticClass:"red"},[t._v("Red")]),t._v(", Final Choice (Incorrect): "),i("span",{staticClass:"orange"},[t._v("Orange")]),t._v(", Final Choice (Correct): "),i("span",{staticClass:"green"},[t._v("Green")]),t._v(", Host Opens Door: "),i("span",{staticClass:"pink"},[t._v("Pink")])])}],g=(i("7db0"),i("d3b7"),i("4de4"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"problem-navigation"},[i("a",{attrs:{href:t.wikiLink,target:"_blank"}},[t._v("Wikipedia")]),t._v(" "),i("a",{attrs:{href:""},on:{click:function(e){return e.stopPropagation(),t.showExplanation(e)}}},[t._v("Explanation")])])}),w=[],C={name:"ProblemNavigation",methods:{showExplanation:function(){this.$emit("show-explanation")}},props:{wikiLink:String}},x=C,k=Object(l["a"])(x,g,w,!1,null,"a426563a",null),O=k.exports,S=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},R=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("canvas",{attrs:{id:"ctx"}})])}],P=i("9b4a"),E={name:"BarChart",created:function(){var t=document.getElementById("ctx").getContext("2d");new P["a"](t,{type:"bar",data:{labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{y:{beginAtZero:!0}}}})}},j=E,B=Object(l["a"])(j,S,R,!1,null,null,null),$=B.exports,M={name:"MontyHall",props:{},methods:{getBarChartValues:function(){var t={datasets:[{data:[20,10]}],labels:["a","b"]};return console.log(t),t},doorClass:function(t){var e={};return this.display.carDoor===t&&(e.blue=!0),this.display.firstChoice===t&&(e.red=!0),this.display.finalChoice===t&&this.display.win&&(e.green=!0),this.display.finalChoice!==t||this.display.win||(e.orange=!0),this.display.hostOpens===t&&(e.pink=!0),e},showExplanation:function(){alert("explain")},simulate:function(t){this.simRunning||(this.simRunning=!0,this.ranSimOnce=!0,this.wait=1e3,this.simulationRuns=0,this.wins=0,this.losses=0,this.withSwitch=t,this.maxRuns=100,this.simulateTick())},stopSim:function(){this.simRunning=!1},simulateTick:function(){var t=this;this.simulationRuns++,this.display.carDoor=this.rand(3),this.display.firstChoice=this.rand(3),this.display.hostOpens=this.hostOpensDoor(this.display.carDoor,this.display.firstChoice),this.withSwitch?(this.display.finalChoice=[1,2,3].find((function(e){return e!==t.display.firstChoice&&e!==t.display.hostOpens})),this.display.finalChoice===this.display.carDoor?(this.wins++,this.display.win=!0):(this.losses++,this.display.win=!1)):(this.display.finalChoice=this.display.firstChoice,this.display.firstChoice===this.display.carDoor?(this.wins++,this.display.win=!0):(this.losses++,this.display.win=!1)),this.wait>1?this.wait-=50:this.wait<1&&(this.wait=1),this.simRunning&&this.maxRuns>0&&(this.maxRuns--,setTimeout(this.simulateTick,this.wait))},hostOpensDoor:function(t,e){var i=0;if(t===e){var n=[1,2,3].filter((function(e){return e!==t}));n=1===t?[2,3]:2===t?[1,3]:[1,2],i=n[this.rand(2)-1]}else i=[1,2,3].find((function(i){return i!==t&&i!==e}));return i},rand:function(t){return Math.floor(Math.random()*t)+1}},components:{ProblemNavigation:O,BarChart:$},data:function(){return{playedGame:!0,simulationRuns:0,wins:0,losses:0,simRunning:!1,wait:1e3,display:{firstChoice:0,carDoor:0,hostOpens:0,finalChoice:0,win:!1},maxRuns:100,ranSimOnce:!1}}},D=M,H=(i("94e4"),Object(l["a"])(D,_,y,!1,null,"5f4fc70e",null)),T=H.exports,G=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},A=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("h1",[t._v("Bertrand's Box Paradox")])])}],F={name:"BertrandsBox",props:{}},L=F,I=Object(l["a"])(L,G,A,!1,null,"76e25c31",null),N=I.exports,W=[{path:"/",component:b,name:"home"},{path:"/mh",component:T},{path:"/bb",component:N}],J=W;n["a"].config.productionTip=!1,n["a"].use(h["a"]);var V=new h["a"]({mode:"history",routes:J});new n["a"]({router:V,render:function(t){return t(u)}}).$mount("#app")},"68e5":function(t,e,i){},"94e4":function(t,e,i){"use strict";i("68e5")},db43:function(t,e,i){}});
//# sourceMappingURL=app.56a9e24b.js.map