!function(e){function t(t){for(var o,r,i=t[0],a=t[1],s=t[2],c=0,u=[];c<i.length;c++)r=i[c],Object.prototype.hasOwnProperty.call(D,r)&&D[r]&&u.push(D[r][0]),D[r]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);for(U&&U(t);u.length;)u.shift()();return $.push.apply($,s||[]),n()}function n(){for(var e,t=0;t<$.length;t++){for(var n=$[t],o=!0,r=1;r<n.length;r++){var i=n[r];0!==D[i]&&(o=!1)}o&&($.splice(t--,1),e=j(j.s=n[0]))}return e}var o=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!x[e]||!C[e])return;for(var n in C[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(v[n]=t[n]);0==--m&&0===b&&O()}(e,t),o&&o(e,t)};var r,i=!0,a="8fdee832f3fc28c6b86a",s={},c=[],u=[];function l(t){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:r!==t,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var o=0;o<e.length;o++)n._acceptedDependencies[e[o]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,p){case"idle":(v={})[t]=e[t],f("ready");break;case"ready":k(t);break;case"prepare":case"check":case"dispose":case"apply":(y=y||[]).push(t)}},check:L,apply:B,status:function(e){if(!e)return p;d.push(e)},addStatusHandler:function(e){d.push(e)},removeStatusHandler:function(e){var t=d.indexOf(e);t>=0&&d.splice(t,1)},data:s[t]};return r=void 0,n}var d=[],p="idle";function f(e){p=e;for(var t=0;t<d.length;t++)d[t].call(null,e)}var h,v,g,y,m=0,b=0,w={},C={},x={};function E(e){return+e+""===e?+e:e}function L(e){if("idle"!==p)throw new Error("check() is only allowed in idle status");return i=e,f("check"),(t=1e4,t=t||1e4,new Promise((function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var o=new XMLHttpRequest,r=j.p+""+a+".hot-update.json";o.open("GET",r,!0),o.timeout=t,o.send(null)}catch(e){return n(e)}o.onreadystatechange=function(){if(4===o.readyState)if(0===o.status)n(new Error("Manifest request to "+r+" timed out."));else if(404===o.status)e();else if(200!==o.status&&304!==o.status)n(new Error("Manifest request to "+r+" failed."));else{try{var t=JSON.parse(o.responseText)}catch(e){return void n(e)}e(t)}}}))).then((function(e){if(!e)return f(P()?"ready":"idle"),null;C={},w={},x=e.c,g=e.h,f("prepare");var t=new Promise((function(e,t){h={resolve:e,reject:t}}));for(var n in v={},D)_(n);return"prepare"===p&&0===b&&0===m&&O(),t}));var t}function _(e){x[e]?(C[e]=!0,m++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=j.p+""+e+"."+a+".hot-update.js",document.head.appendChild(t)}(e)):w[e]=!0}function O(){f("ready");var e=h;if(h=null,e)if(i)Promise.resolve().then((function(){return B(i)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var n in v)Object.prototype.hasOwnProperty.call(v,n)&&t.push(E(n));e.resolve(t)}}function B(t){if("ready"!==p)throw new Error("apply() is only allowed in ready status");return function t(n){var o,i,u,l,d;function p(e){for(var t=[e],n={},o=t.map((function(e){return{chain:[e],id:e}}));o.length>0;){var r=o.pop(),i=r.id,a=r.chain;if((l=T[i])&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var s=0;s<l.parents.length;s++){var c=l.parents[s],u=T[c];if(u){if(u.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([c]),moduleId:i,parentId:c};-1===t.indexOf(c)&&(u.hot._acceptedDependencies[i]?(n[c]||(n[c]=[]),h(n[c],[i])):(delete n[c],t.push(c),o.push({chain:a.concat([c]),id:c})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function h(e,t){for(var n=0;n<t.length;n++){var o=t[n];-1===e.indexOf(o)&&e.push(o)}}P();var m={},b=[],w={},C=function(){console.warn("[HMR] unexpected require("+_.moduleId+") to disposed module")};for(var L in v)if(Object.prototype.hasOwnProperty.call(v,L)){var _;d=E(L),_=v[L]?p(d):{type:"disposed",moduleId:L};var O=!1,B=!1,k=!1,$="";switch(_.chain&&($="\nUpdate propagation: "+_.chain.join(" -> ")),_.type){case"self-declined":n.onDeclined&&n.onDeclined(_),n.ignoreDeclined||(O=new Error("Aborted because of self decline: "+_.moduleId+$));break;case"declined":n.onDeclined&&n.onDeclined(_),n.ignoreDeclined||(O=new Error("Aborted because of declined dependency: "+_.moduleId+" in "+_.parentId+$));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(_),n.ignoreUnaccepted||(O=new Error("Aborted because "+d+" is not accepted"+$));break;case"accepted":n.onAccepted&&n.onAccepted(_),B=!0;break;case"disposed":n.onDisposed&&n.onDisposed(_),k=!0;break;default:throw new Error("Unexception type "+_.type)}if(O)return f("abort"),Promise.reject(O);if(B)for(d in w[d]=v[d],h(b,_.outdatedModules),_.outdatedDependencies)Object.prototype.hasOwnProperty.call(_.outdatedDependencies,d)&&(m[d]||(m[d]=[]),h(m[d],_.outdatedDependencies[d]));k&&(h(b,[_.moduleId]),w[d]=C)}var S,I=[];for(i=0;i<b.length;i++)d=b[i],T[d]&&T[d].hot._selfAccepted&&w[d]!==C&&!T[d].hot._selfInvalidated&&I.push({module:d,parents:T[d].parents.slice(),errorHandler:T[d].hot._selfAccepted});f("dispose"),Object.keys(x).forEach((function(e){!1===x[e]&&function(e){delete D[e]}(e)}));var R,U,A=b.slice();for(;A.length>0;)if(d=A.pop(),l=T[d]){var M={},q=l.hot._disposeHandlers;for(u=0;u<q.length;u++)(o=q[u])(M);for(s[d]=M,l.hot.active=!1,delete T[d],delete m[d],u=0;u<l.children.length;u++){var F=T[l.children[u]];F&&((S=F.parents.indexOf(d))>=0&&F.parents.splice(S,1))}}for(d in m)if(Object.prototype.hasOwnProperty.call(m,d)&&(l=T[d]))for(U=m[d],u=0;u<U.length;u++)R=U[u],(S=l.children.indexOf(R))>=0&&l.children.splice(S,1);f("apply"),void 0!==g&&(a=g,g=void 0);for(d in v=void 0,w)Object.prototype.hasOwnProperty.call(w,d)&&(e[d]=w[d]);var H=null;for(d in m)if(Object.prototype.hasOwnProperty.call(m,d)&&(l=T[d])){U=m[d];var X=[];for(i=0;i<U.length;i++)if(R=U[i],o=l.hot._acceptedDependencies[R]){if(-1!==X.indexOf(o))continue;X.push(o)}for(i=0;i<X.length;i++){o=X[i];try{o(U)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:d,dependencyId:U[i],error:e}),n.ignoreErrored||H||(H=e)}}}for(i=0;i<I.length;i++){var V=I[i];d=V.module,c=V.parents,r=d;try{j(d)}catch(e){if("function"==typeof V.errorHandler)try{V.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:d,error:t,originalError:e}),n.ignoreErrored||H||(H=t),H||(H=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:d,error:e}),n.ignoreErrored||H||(H=e)}}if(H)return f("fail"),Promise.reject(H);if(y)return t(n).then((function(e){return b.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}));return f("idle"),new Promise((function(e){e(b)}))}(t=t||{})}function P(){if(y)return v||(v={}),y.forEach(k),y=void 0,!0}function k(t){Object.prototype.hasOwnProperty.call(v,t)||(v[t]=e[t])}var T={},D={0:0},$=[];function j(t){if(T[t])return T[t].exports;var n=T[t]={i:t,l:!1,exports:{},hot:l(t),parents:(u=c,c=[],u),children:[]};return e[t].call(n.exports,n,n.exports,function(e){var t=T[e];if(!t)return j;var n=function(n){return t.hot.active?(T[n]?-1===T[n].parents.indexOf(e)&&T[n].parents.push(e):(c=[e],r=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),c=[]),j(n)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return j[e]},set:function(t){j[e]=t}}};for(var i in j)Object.prototype.hasOwnProperty.call(j,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(n,i,o(i));return n.e=function(e){return"ready"===p&&f("prepare"),b++,j.e(e).then(t,(function(e){throw t(),e}));function t(){b--,"prepare"===p&&(w[e]||_(e),0===b&&0===m&&O())}},n.t=function(e,t){return 1&t&&(e=n(e)),j.t(e,-2&t)},n}(t)),n.l=!0,n.exports}j.m=e,j.c=T,j.d=function(e,t,n){j.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},j.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},j.t=function(e,t){if(1&t&&(e=j(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(j.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)j.d(n,o,function(t){return e[t]}.bind(null,o));return n},j.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return j.d(t,"a",t),t},j.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},j.p="./",j.h=function(){return a};var S=window.webpackJsonp=window.webpackJsonp||[],I=S.push.bind(S);S.push=t,S=S.slice();for(var R=0;R<S.length;R++)t(S[R]);var U=I;$.push([8,1]),n()}([,,,function(e,t,n){},function(e,t,n){var o;(o=n(5)).keys().forEach(o)},function(e,t,n){var o={"./undo-icon.svg":6};function r(e){var t=i(e);return n(t)}function i(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}r.keys=function(){return Object.keys(o)},r.resolve=i,e.exports=r,r.id=5},function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),i=n(2),a=n.n(i),s=new r.a({id:"undo-icon",use:"undo-icon-usage",viewBox:"0 0 500 500",content:'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xmlns:xlink="http://www.w3.org/1999/xlink" id="undo-icon">\r\n <defs>\r\n  <style type="text/css">\r\n   \r\n    #undo-icon .str0 {stroke:#0083DB;stroke-width:5}\r\n    #undo-icon .fil3 {fill:none}\r\n    #undo-icon .fil2 {fill:url(#undo-icon_id0)}\r\n    #undo-icon .fil0 {fill:url(#undo-icon_id1)}\r\n    #undo-icon .fil1 {fill:url(#undo-icon_id2)}\r\n   \r\n  </style>\r\n  <linearGradient id="undo-icon_id0" gradientUnits="userSpaceOnUse" x1="87.514" y1="320.036" x2="389.944" y2="320.036">\r\n   <stop offset="0" style="stop-color:#0099FF" />\r\n   <stop offset="1" style="stop-color:#5DBEFF" />\r\n  </linearGradient>\r\n  <linearGradient id="undo-icon_id1" gradientUnits="userSpaceOnUse" x1="247.858" y1="90.578" x2="247.858" y2="400.813">\r\n   <stop offset="0" style="stop-color:#B9E3FF" />\r\n   <stop offset="1" style="stop-color:#0078C8" />\r\n  </linearGradient>\r\n  <linearGradient id="undo-icon_id2" gradientUnits="userSpaceOnUse" x1="211.82" y1="202.802" x2="288.158" y2="279.142">\r\n   <stop offset="0" style="stop-color:#17A2FF" />\r\n   <stop offset="1" style="stop-color:#74C7FF" />\r\n  </linearGradient>\r\n </defs>\r\n <g id="undo-icon_Layer_x0020_1">\r\n  <metadata id="undo-icon_CorelCorpID_0Corel-Layer"></metadata>\r\n  <path class="fil0" d="M286 461c-14,0 -14,20 0,20 103,0 184,-89 184,-191 0,-103 -83,-186 -186,-186l-77 0 0 -60c0,-26 -30,-33 -51,-13l-113 114c-17,17 -17,33 0,50l113 114c21,20 51,13 51,-13l0 -60 77 0c64,0 115,52 115,116 0,63 -49,109 -113,109z" />\r\n  <path class="fil1" d="M40 170l249 0c82,0 149,67 149,149 0,58 -33,110 -81,136 19,-9 37,-22 52,-37 31,-33 51,-79 51,-128 0,-49 -20,-93 -51,-125 -32,-32 -76,-51 -125,-51l-87 0 0 -70c0,-6 -2,-11 -8,-14 -9,-3 -19,2 -25,8l-114 114c-7,7 -10,13 -10,18z" />\r\n  <path class="fil2" d="M357 455c48,-26 81,-78 81,-136 0,-82 -67,-149 -149,-149l-249 0c0,10 10,16 10,18l114 114c6,6 16,11 25,8 7,-3 7,-14 8,-14l0 -70 87 0c35,0 66,14 89,37 22,23 36,54 36,89 0,34 -13,64 -35,85 -19,18 -44,30 -73,33 20,-2 38,-7 56,-15z" />\r\n  <path class="fil3 str0" d="M286 461c-14,0 -14,20 0,20 103,0 184,-89 184,-191 0,-103 -83,-186 -186,-186l-77 0 0 -60c0,-26 -30,-33 -51,-13l-113 114c-17,17 -17,33 0,50l113 114c21,20 51,13 51,-13l0 -60 77 0c64,0 115,52 115,116 0,63 -49,109 -113,109z" />\r\n </g>\r\n</symbol>'});a.a.add(s);t.default=s},function(e,t){class n extends HTMLElement{constructor(){super(),this.onTogglePointerDown=this.onTogglePointerDown.bind(this),this.attachShadow({mode:"open"})}setTogglePositionByValue(e){let t=e/this.step-this.centerToggle;this.togglePosition=t}get togglePosition(){return this._currentTogglePosition}set togglePosition(e){e<=-this.centerToggle?this._currentTogglePosition=-this.centerToggle:e>=this.widthBar-this.centerToggle?this._currentTogglePosition=this.widthBar-this.centerToggle:this._currentTogglePosition=e,this.toggle.style.transform=`translateX(${this._currentTogglePosition}px)`}get currentValueRange(){return(this.togglePosition+this.centerToggle)*this.step+ +this.getAttribute("min-value")}onTogglePointerDown(e){e.preventDefault();let t=e.clientX-this.toggle.getBoundingClientRect().left,n=e=>{e.preventDefault();let n=e.pageX-this.leftEdge-t;this.togglePosition=n,this.dispatchEvent(new CustomEvent("change-range-value",{bubbles:!0,detail:this.currentValueRange}))},o=()=>{e.preventDefault(),this.dispatchEvent(new CustomEvent("end-change-range-value",{bubbles:!0,detail:this.currentValueRange})),document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",o)};document.addEventListener("pointermove",n),document.addEventListener("pointerup",o)}connectedCallback(){this.render(),this.bar=this.shadowRoot.getElementById("bar"),this.toggle=this.shadowRoot.getElementById("toggle"),this.toggle.ondragstart=()=>!1,this.step=Math.abs((+this.getAttribute("max-value")-+this.getAttribute("min-value"))/this.bar.getBoundingClientRect().width),this.widthBar=this.bar.getBoundingClientRect().width,this.leftEdge=this.bar.getBoundingClientRect().left,this.centerToggle=this.toggle.getBoundingClientRect().width/2,this.setTogglePositionByValue(+this.getAttribute("current-value")),this.toggle.addEventListener("pointerdown",this.onTogglePointerDown)}disconnectedCallback(){this.toggle.removeEventListener("pointerdown",this.onTogglePointerDown)}static get observedAttributes(){return["current-value"]}attributeChangedCallback(e,t,n){"current-value"===e&&this.toggle&&(this.togglePosition=+n/this.step-this.centerToggle)}render(){this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          width: 100%;\n          height: 50px;\n          padding: 8px;\n\n          display: flex;\n          align-items: center;\n          justify-content: center;\n\n          box-sizing: border-box;\n        }\n\n        :host * {\n          box-sizing: border-box;\n        }\n\n        #bar {\n          width: 100%;\n          height: 6px;\n\n          display: flex;\n          align-items: center;\n          justify-content: flex-start;\n\n          background-color: blue;\n          border-radius: 8px;\n        }\n\n        #toggle {\n          width: 28px;\n          height: 28px;\n          \n          background-color: green;\n\n          border-radius: 50%;\n\n          cursor: pointer;\n          touch-action: none;\n        }\n\n      </style>\n\n      <div id="bar">\n        <div id="toggle">\n\n        </div>\n      </div>\n    '}}customElements.define("range-element",n)},function(e,t,n){"use strict";n.r(t);n(3),n(4),n(7);var o,r=(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=function(){function e(){this.color={red:0,green:0,blue:0,alfa:1}}return Object.defineProperty(e.prototype,"color",{get:function(){return this._color},set:function(e){this._color=e,this.rgba="rgba("+this.color.red+", "+this.color.green+", "+this.color.blue+", "+this.color.alfa+")"},enumerable:!1,configurable:!0}),e.prototype.pointer=function(e,t,n,o,r){var i=t.clientX-n,a=t.clientY-o,s=e.previewContext;s.save(),s.strokeStyle="black",s.lineWidth=1,s.setLineDash([]),s.beginPath(),s.moveTo(i,a),s.lineTo(i,a+10),s.closePath(),s.stroke(),s.beginPath(),s.shadowOffsetX=2,s.shadowOffsetY=2,s.shadowBlur=2,s.shadowColor="rgba(0,0,0,0.5)",s.fillStyle=r,s.arc(i,a+20,10,0,360),s.fill(),s.stroke(),s.restore()},e.prototype.drawPointer=function(e,t){var n=this;t.preventDefault();var o=e.$canvas.getBoundingClientRect().left,r=e.$canvas.getBoundingClientRect().top;e.clearContext(),this.pointer(e,t,o,r,this.rgba);var i=function(t){e.clearContext(),n.pointer(e,t,o,r,n.rgba)},a=function(t){e.clearContext(),n.pointer(e,t,o,r,n.rgba)},s=function(t){e.$canvas.removeEventListener("pointerout",s),e.$canvas.removeEventListener("pointermove",i),e.$canvas.removeEventListener("click",a)};e.$canvas.addEventListener("click",a),e.$canvas.addEventListener("pointermove",i),e.$canvas.addEventListener("pointerout",s)},e.prototype.draw=function(e,t){var n=this;t.preventDefault();var o=e.$canvas.getBoundingClientRect().left,r=e.$canvas.getBoundingClientRect().top,i=function(t,o){var r=e.drawContext.getImageData(t,o,1,1).data;n.color={red:r[0],green:r[1],blue:r[2],alfa:r[3]/255}};i(t.clientX-o,t.clientY-r),e.color=this.color;var a=function(t){t.preventDefault(),i(t.clientX-o,t.clientY-r),e.color=n.color},s=function(t){t.preventDefault(),e.$canvas.removeEventListener("pointermove",a),e.$canvas.removeEventListener("pointerup",s)};e.$canvas.addEventListener("pointermove",a),e.$canvas.addEventListener("pointerup",s)},e}(),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.drawShape=function(e,t,n){e.lineTo(t,n)},t}(function(){function e(){}return e.prototype.pointer=function(e,t,n,o){var r=t.clientX-n,i=t.clientY-o,a=e.previewContext;a.save(),a.shadowOffsetX=2,a.shadowOffsetY=2,a.shadowBlur=2,a.shadowColor="rgba(0,0,0,0.5)",a.fillStyle=e.rgba,a.beginPath(),a.arc(r,i,e.lineWidth/2,0,360),a.fill(),a.restore()},e.prototype.drawPointer=function(e,t){var n=this;t.preventDefault();var o=e.$canvas.getBoundingClientRect().left,r=e.$canvas.getBoundingClientRect().top;e.clearContext(),this.pointer(e,t,o,r);var i=function(t){e.clearContext(),n.pointer(e,t,o,r)},a=function(t){e.$canvas.removeEventListener("pointerdown",s),e.$canvas.removeEventListener("pointerout",a),e.$canvas.removeEventListener("pointermove",i),e.$canvas.removeEventListener("pointerup",c)},s=function(t){e.$canvas.removeEventListener("pointerdown",s),e.$canvas.removeEventListener("pointerout",a),e.$canvas.removeEventListener("pointermove",i)},c=function(){e.$canvas.addEventListener("pointerdown",s),e.$canvas.addEventListener("pointerout",a),e.$canvas.addEventListener("pointermove",i)};e.$canvas.addEventListener("pointermove",i),e.$canvas.addEventListener("pointerdown",s),e.$canvas.addEventListener("pointerout",a),e.$canvas.addEventListener("pointerup",c)},e.prototype.draw=function(e,t,n){var o=this;t.preventDefault();var r=e.drawContext,i=e.previewContext,a=function(){e.clearContext(),i.restore(),r.stroke(),e.$canvas.removeEventListener("pointerout",d),e.$canvas.removeEventListener("pointermove",u),e.$canvas.removeEventListener("pointerup",l)},s=e.$canvas.getBoundingClientRect().left,c=e.$canvas.getBoundingClientRect().top;r.moveTo(t.clientX-s,t.clientY-c),r.beginPath(),i.save(),i.setLineDash([0]),i.beginPath(),i.moveTo(t.clientX-s,t.clientY-c),n();var u=function(e){e.preventDefault(),o.drawShape(i,e.clientX-s,e.clientY-c),i.stroke(),o.drawShape(r,e.clientX-s,e.clientY-c)},l=function(e){e.preventDefault(),a()},d=function(){t.preventDefault(),a()};e.$canvas.addEventListener("pointerout",d),e.$canvas.addEventListener("pointermove",u),e.$canvas.addEventListener("pointerup",l)},e}()),s=function(){function e(){}return e.prototype.pointer=function(e,t,n,o){var r=t.clientX-n,i=t.clientY-o,a=e.previewContext;a.save(),a.shadowOffsetX=2,a.shadowOffsetY=2,a.shadowBlur=2,a.shadowColor="rgba(0,0,0,0.5)",a.strokeStyle=e.rgba,a.lineWidth=2,a.setLineDash([]),a.beginPath(),a.moveTo(r,i-10),a.lineTo(r,i+10),a.closePath(),a.stroke(),a.beginPath(),a.moveTo(r-10,i),a.lineTo(r+10,i),a.closePath(),a.stroke(),a.restore()},e.prototype.drawPointer=function(e,t){var n=this;t.preventDefault();var o=e.$canvas.getBoundingClientRect().left,r=e.$canvas.getBoundingClientRect().top;e.clearContext(),this.pointer(e,t,o,r);var i=function(t){e.clearContext(),n.pointer(e,t,o,r)},a=function(t){e.$canvas.removeEventListener("pointermove",i),e.$canvas.removeEventListener("pointerdown",s),e.$canvas.removeEventListener("pointerout",a),e.$canvas.removeEventListener("pointerup",c)},s=function(t){e.$canvas.removeEventListener("pointermove",i),e.$canvas.removeEventListener("pointerdown",s),e.$canvas.removeEventListener("pointerout",a)},c=function(t){e.$canvas.addEventListener("pointermove",i),e.$canvas.addEventListener("pointerdown",s),e.$canvas.addEventListener("pointerout",a)};e.$canvas.addEventListener("pointermove",i),e.$canvas.addEventListener("pointerdown",s),e.$canvas.addEventListener("pointerup",c),e.$canvas.addEventListener("pointerout",a)},e.prototype.draw=function(e,t,n){var o=this;t.preventDefault();var r=e.previewContext,i=e.drawContext,a=e.$canvas.getBoundingClientRect().left,s=e.$canvas.getBoundingClientRect().top,c=t.clientX-a,u=t.clientY-s,l=function(t){n(),o.drawShape(i,c,u,t.clientX-a,t.clientY-s),e.clearContext(),e.$canvas.removeEventListener("pointerout",p),e.$canvas.removeEventListener("pointermove",d),e.$canvas.removeEventListener("pointerup",f)},d=function(t){t.preventDefault(),e.clearContext(),o.pointer(e,t,a,s),o.drawShape(r,c,u,t.clientX-a,t.clientY-s)},p=function(e){e.preventDefault(),l(e)},f=function(e){e.preventDefault(),l(e)};e.$canvas.addEventListener("pointerup",f),e.$canvas.addEventListener("pointerout",p),e.$canvas.addEventListener("pointermove",d)},e}(),c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.drawShape=function(e,t,n,o,r){var i=o-t,a=r-n;e.strokeRect(t,n,i,a)},t}(s),u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.drawShape=function(e,t,n,o,r){e.beginPath();var i=(t+o)/2,a=(n+r)/2,s=o-i,c=r-a,u=+Math.sqrt(Math.pow(s,2)+Math.pow(c,2)).toFixed(2);e.arc(i,a,u,0,360),e.stroke()},t}(s),l=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.drawShape=function(e,t,n,o,r){e.beginPath(),e.moveTo(t,n),e.lineTo(o,r),e.stroke()},t}(s),d=function(){function e(e,t){this.data=t,this.canvas=e}return e.prototype.restore=function(){this.canvas.restore(this.data)},e}(),p=function(){function e(e){var t=this;this._color={red:0,green:0,blue:0,alfa:1},this.listeners=new Set,this.onCanvasPointerOver=function(e){t.shape.drawPointer(t,e)},this.onCanvasPointerDown=function(e){e.preventDefault(),t.shape.draw(t,e,t.makeBackup)},this.canvas=document.createElement("canvas"),this.fon=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.fonContext=this.fon.getContext("2d"),this.canvasContainer=e,this.shape=new a,this.setCanvasSize(),this.canvas.style.cursor="none",this.context.globalCompositeOperation="source-over",this.fonContext.globalCompositeOperation="source-over",this.fonContext.lineCap="round",this.fonContext.lineJoin="round",this.fonContext.lineWidth=2,this.fonContext.strokeStyle="black",this.context.strokeStyle="rgba(0,0,0,0.4)",this.context.setLineDash([2,4]),this.renderCanvas(),this.canvas.addEventListener("pointerdown",this.onCanvasPointerDown),this.canvas.addEventListener("pointerover",this.onCanvasPointerOver)}return e.prototype.addListener=function(e){this.listeners.add(e)},e.prototype.removeListener=function(e){this.listeners.delete(e)},e.prototype.update=function(){var e=this;this.listeners.forEach((function(t){t(e.color)}))},Object.defineProperty(e.prototype,"makeBackupCommand",{set:function(e){this.makeBackup=e},enumerable:!1,configurable:!0}),e.prototype.setCanvasSize=function(){this.width=this.canvas.width=this.fon.width=this.canvasContainer.getBoundingClientRect().width,this.height=this.canvas.height=this.fon.height=this.canvasContainer.getBoundingClientRect().height},Object.defineProperty(e.prototype,"drawContext",{get:function(){return this.fonContext},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"previewContext",{get:function(){return this.context},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"backgroundImage",{set:function(e){var t=this;if(/image/.test(e.type)){var n=new Image;n.onload=function(){t.drawContext.save(),t.drawContext.globalCompositeOperation="source-over",n.width>t.width||n.height>t.height?(t.fonContext.drawImage(n,0,0,t.width,t.height),t.drawContext.restore()):(t.fonContext.drawImage(n,0,0),t.drawContext.restore())},n.src=URL.createObjectURL(e)}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"toogleEraser",{set:function(e){this.fonContext.globalCompositeOperation=e?"destination-out":"source-over"},enumerable:!1,configurable:!0}),e.prototype.saveCanvasAsFile=function(){this.fon.toBlob((function(e){var t=document.createElement("a");t.download="mycanvas.png",t.href=URL.createObjectURL(e),t.click(),URL.revokeObjectURL(t.href)}),"image/png")},e.prototype.saveCanvasToBuffer=function(e,t){this.fon.toBlob((function(n){navigator.clipboard&&"function"==typeof ClipboardItem?navigator.clipboard.write([new ClipboardItem({"image/png":n})]).then(e):(console.log("navigator ClipboardItem not exist"),t())}),"image/png")},Object.defineProperty(e.prototype,"$canvas",{get:function(){return this.canvas},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"shapeInstrument",{set:function(e){this.shape=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"color",{get:function(){return this._color},set:function(e){this._color=e,this.fonContext.strokeStyle=this.rgba,this.update()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"rgba",{get:function(){return"rgba("+this.color.red+", "+this.color.green+", "+this.color.blue+", "+this.color.alfa+")"},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"lineWidth",{get:function(){return this.fonContext.lineWidth},set:function(e){this.context.lineWidth=this.fonContext.lineWidth=e},enumerable:!1,configurable:!0}),e.prototype.clearCanvas=function(){this.fonContext.clearRect(0,0,this.width,this.height)},e.prototype.clearContext=function(){this.context.clearRect(0,0,this.width,this.height)},e.prototype.renderCanvas=function(){this.canvasContainer.append(this.fon,this.canvas)},e.prototype.createSnapshot=function(){var e=document.createElement("canvas");return e.width=this.width,e.height=this.height,e.getContext("2d").drawImage(this.fon,0,0),new d(this,e)},e.prototype.restore=function(e){this.clearCanvas(),this.fonContext.save(),this.fonContext.globalCompositeOperation="source-over",this.drawContext.drawImage(e,0,0),this.fonContext.restore()},e}(),f=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),h=function(e){this.canvas=e},v=function(e){function t(t,n){var o=e.call(this,t)||this;return o.color=n,o}return f(t,e),t.prototype.execute=function(){this.canvas.color=this.color},t}(h),g=function(e){function t(t,n){var o=e.call(this,t)||this;return o.value=n,o}return f(t,e),t.prototype.execute=function(){this.canvas.lineWidth=this.value},t}(h),y=function(e){function t(t,n){var o=e.call(this,t)||this;return o.value=n,o}return f(t,e),t.prototype.execute=function(){this.canvas.backgroundImage=this.value},t}(h),m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return f(t,e),t.prototype.execute=function(){this.canvas.saveCanvasAsFile()},t}(h),b=function(e){function t(t,n,o){var r=e.call(this,t)||this;return r.resolve=n,r.reject=o,r}return f(t,e),t.prototype.execute=function(){this.canvas.saveCanvasToBuffer(this.resolve,this.reject)},t}(h),w=function(e){function t(t,n){var o=e.call(this,t)||this;return o.tool=n,o}return f(t,e),t.prototype.execute=function(){this.canvas.shapeInstrument=this.tool},t}(h),C=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return f(t,e),t.prototype.execute=function(){this.canvas.clearCanvas()},t}(h),x=function(e){function t(t,n){var o=e.call(this,t)||this;return o.toggle=n,o}return f(t,e),t.prototype.execute=function(){this.canvas.toogleEraser=this.toggle},t}(h),E=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return f(t,e),t.prototype.execute=function(){return this.canvas.createSnapshot()},t}(h),L=function(e){function t(t,n){var o=e.call(this,t)||this;return o.backup=n,o}return f(t,e),t.prototype.execute=function(){this.backup.restore()},t}(h);function _({timing:e,draw:t,duration:n}){let o=performance.now();return new Promise(r=>{requestAnimationFrame((function i(a){let s=(a-o)/n;s>1&&(s=1);let c=e(s);t(c),s<1?requestAnimationFrame(i):r()}))})}function O(e){return Math.pow(e,5)}function B(e){return function(t){return e(1-t)}}function P(e,t,n){return(e-t)*n+t}var k=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),T=function(){this.saveAsFileBtn=new q(document.querySelector(".save-as-file-btn")),this.saveToBufferBtn=new M(document.querySelector(".save-to-buffer")),this.insertFonBtn=new A(document.querySelector(".insert-btn")),this.setLineWidthBtn=new U(document.querySelector(".set-line-width-btn")),this.setColorBtn=new R(document.querySelector(".set-color-btn")),this.setDrawToolBtn=new I(document.querySelector(".page-main__draw-tools")),this.clearCanvasBtn=new S(document.querySelector('[data-clear="clear"]')),this.eraserToogleBtn=new j(document.querySelector(".eraser-label")),this.undoBtn=new $(document.querySelector(".undo-btn"))},D=function(e){this.btn=e},$=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return k(t,e),t.prototype.setCommand=function(e){this.btn.addEventListener("click",(function(){e()}))},t}(D),j=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return k(t,e),t.prototype.setCommand=function(e){var t=this;this.btn.addEventListener("click",(function(){var n=t.btn.querySelector("input").checked;n?(t.btn.classList.add("eraser-label--on"),e(n)):(t.btn.classList.remove("eraser-label--on"),e(n))}))},t}(D),S=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return k(t,e),t.prototype.setCommand=function(e){this.btn.addEventListener("click",(function(){e()}))},t}(D),I=function(e){function t(t){var n=e.call(this,t)||this;return n.activeTool=document.querySelector(".draw-tools__button--selected"),n.toggleDrawToolsPanel(),n}return k(t,e),t.prototype.toggleDrawToolsPanel=function(){var e=this;window.innerWidth>=768&&(this.btn.addEventListener("pointerenter",(function(t){_({duration:400,timing:B(O),draw:function(t){e.btn.style.left=P(-56,0,t)+"px"}})})),this.btn.addEventListener("pointerleave",(function(t){_({duration:400,timing:B(O),draw:function(t){e.btn.style.left=P(0,-56,t)+"px"}})})))},t.prototype.setCommand=function(e){var t=this;this.btn.addEventListener("click",(function(n){var o=n.target;if("BUTTON"===o.tagName&&o!==t.activeTool){var r=o.dataset.tool;r&&e(r)&&(t.activeTool.classList.remove("draw-tools__button--selected"),o.classList.add("draw-tools__button--selected"),t.activeTool=o)}}))},t}(D),R=function(e){function t(t){var n=e.call(this,t)||this;n.setColor=n.setColor.bind(n),n.rangeBtn=n.btn.querySelector(".range-btn"),n.rangeBtnContent=n.btn.querySelector(".range-btn__content"),n.range=n.btn.querySelector(".range-btn__range");var o=Array.from(n.btn.querySelectorAll("range-element"));return n.rangeRed=o[0],n.rangeGreen=o[1],n.rangeBlue=o[2],n.rangeAlfa=o[3],n.rangeBtn.addEventListener("click",(function(){n.range.classList.toggle("range-btn__range--active")})),n}return k(t,e),t.prototype.setColor=function(e){this.rangeRed.setTogglePositionByValue(e.red),this.rangeGreen.setTogglePositionByValue(e.green),this.rangeBlue.setTogglePositionByValue(e.blue),this.rangeAlfa.setTogglePositionByValue(e.alfa),this.rangeBtnContent.style.background="rgba("+e.red+", "+e.green+", "+e.blue+", "+e.alfa+")"},t.prototype.setCommand=function(e){var t,n=this;this.btn.addEventListener("end-change-range-value",(function(o){t=setTimeout((function(){n.range.classList.remove("range-btn__range--active")}),2e3);var r=Math.round(n.rangeRed.currentValueRange),i=Math.round(n.rangeGreen.currentValueRange),a=Math.round(n.rangeBlue.currentValueRange),s=n.rangeAlfa.currentValueRange;n.rangeBtnContent.style.background="rgba("+r+", "+i+", "+a+", "+s+")",e({red:r,green:i,blue:a,alfa:s})})),this.btn.addEventListener("change-range-value",(function(e){clearTimeout(t);var o=Math.round(n.rangeRed.currentValueRange),r=Math.round(n.rangeGreen.currentValueRange),i=Math.round(n.rangeBlue.currentValueRange),a=n.rangeAlfa.currentValueRange;n.rangeBtnContent.style.background="rgba("+o+", "+r+", "+i+", "+a+")"}))},t}(D),U=function(e){function t(t){var n=e.call(this,t)||this;return n.rangeBtn=n.btn.querySelector(".range-btn"),n.rangeBtnContent=n.btn.querySelector(".range-btn__content"),n.range=n.btn.querySelector(".range-btn__range"),n.rangeBtn.addEventListener("click",(function(){n.range.classList.toggle("range-btn__range--active")})),n}return k(t,e),t.prototype.setCommand=function(e){var t=this;this.btn.addEventListener("change-range-value",(function(e){t.rangeBtnContent.textContent=""+Math.round(e.detail)})),this.btn.addEventListener("end-change-range-value",(function(n){t.range.classList.remove("range-btn__range--active"),e(Math.round(n.detail))}))},t}(D),A=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return k(t,e),t.prototype.setCommand=function(e){this.btn.addEventListener("change",(function(t){var n=t.target;if("INPUT"===n.tagName){var o=n.files[0];o&&e(o)}}))},t}(D),M=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return k(t,e),t.prototype.setCommand=function(e){this.btn.addEventListener("click",(function(t){e()}))},t}(D),q=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return k(t,e),t.prototype.setCommand=function(e){this.btn.addEventListener("click",(function(t){e()}))},t}(D),F={brush:new a,line:new l,circle:new u,rectangle:new c,"pixel-color":new i};new(function(){function e(){this.canvas=new p(document.querySelector(".canvas-container")),this.UI=new T,this.history=[],this.setListenersUI()}return e.prototype.executeCommand=function(e){var t=e.execute();t instanceof d&&this.history.push(t)},e.prototype.setColor=function(e){this.executeCommand(new v(this.canvas,e))},e.prototype.setLineWidth=function(e){this.executeCommand(new g(this.canvas,e))},e.prototype.setBackgroundImage=function(e){this.executeCommand(new y(this.canvas,e))},e.prototype.copyToClipBoard=function(e,t){this.executeCommand(new b(this.canvas,e,t))},e.prototype.saveAsFile=function(){this.executeCommand(new m(this.canvas))},e.prototype.setTool=function(e){var t=F[e];return t?(this.executeCommand(new w(this.canvas,t)),!0):(alert("That shape "+e+" not exist!"),!1)},e.prototype.clearCanvas=function(){this.executeCommand(new C(this.canvas))},e.prototype.toogleEraser=function(e){this.executeCommand(new x(this.canvas,e))},e.prototype.makeBackup=function(){this.executeCommand(new E(this.canvas)),console.log(this.history)},e.prototype.undo=function(){var e=this.history.pop();e&&this.executeCommand(new L(this.canvas,e)),console.log(this.history)},e.prototype.setListenersUI=function(){var e=this;this.UI.setColorBtn.setCommand((function(t){return e.setColor(t)})),this.canvas.addListener(this.UI.setColorBtn.setColor),this.UI.setLineWidthBtn.setCommand((function(t){return e.setLineWidth(t)})),this.UI.insertFonBtn.setCommand((function(t){return e.setBackgroundImage(t)})),window.addEventListener("paste",(function(t){for(var n=t.clipboardData.files,o=0;o<n.length;o++)/image/.test(n[o].type)&&e.setBackgroundImage(n[o])})),this.UI.saveAsFileBtn.setCommand((function(){return e.saveAsFile()})),this.UI.saveToBufferBtn.setCommand((function(){return e.copyToClipBoard((function(){return alert("copy to clipboard!")}),(function(){return alert("Not support! Use Chrome browser for copy to buffer!")}))})),this.UI.setDrawToolBtn.setCommand((function(t){return e.setTool(t)})),this.UI.undoBtn.setCommand((function(){return e.undo()})),this.UI.clearCanvasBtn.setCommand((function(){return e.clearCanvas()})),this.UI.eraserToogleBtn.setCommand((function(t){return e.toogleEraser(t)})),this.canvas.makeBackupCommand=function(){return e.makeBackup()},document.addEventListener("keydown",(function(t){("KeyZ"===t.code&&t.ctrlKey||t.metaKey)&&e.undo()}))},e}()),document.documentElement.clientWidth<768&&document.querySelector(".page-main__draw-tools").scrollIntoView(!1)}]);