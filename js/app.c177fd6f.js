(function(e){function t(t){for(var s,a,o=t[0],l=t[1],c=t[2],p=0,d=[];p<o.length;p++)a=o[p],r[a]&&d.push(r[a][0]),r[a]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],s=!0,a=1;a<n.length;a++){var o=n[a];0!==r[o]&&(s=!1)}s&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var s={},a={app:0},r={app:0},i=[];function o(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-3d106e28":"5b0b03a2","chunk-5bceff24":"94df298b"}[e]+".js"}function l(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"chunk-3d106e28":1,"chunk-5bceff24":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise(function(t,n){for(var s="css/"+({}[e]||e)+"."+{"chunk-3d106e28":"76e15dde","chunk-5bceff24":"bb12d078"}[e]+".css",r=l.p+s,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var c=i[o],p=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(p===s||p===r))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){c=d[o],p=c.getAttribute("data-href");if(p===s||p===r)return t()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=t,u.onerror=function(t){var s=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");i.request=s,delete a[e],u.parentNode.removeChild(u),n(i)},u.href=r;var m=document.getElementsByTagName("head")[0];m.appendChild(u)}).then(function(){a[e]=0}));var s=r[e];if(0!==s)if(s)t.push(s[2]);else{var i=new Promise(function(t,n){s=r[e]=[t,n]});t.push(s[2]=i);var c,p=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=o(e),c=function(t){d.onerror=d.onload=null,clearTimeout(u);var n=r[e];if(0!==n){if(n){var s=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+s+": "+a+")");i.type=s,i.request=a,n[1](i)}r[e]=void 0}};var u=setTimeout(function(){c({type:"timeout",target:d})},12e4);d.onerror=d.onload=c,p.appendChild(d)}return Promise.all(t)},l.m=e,l.c=s,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)l.d(n,s,function(t){return e[t]}.bind(null,s));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/OpenAPI-Viewer/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],p=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var u=p;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"103e":function(e,t,n){"use strict";var s=n("c010"),a=n.n(s);a.a},2:function(e,t){},2348:function(e,t,n){},3:function(e,t){},4076:function(e,t,n){"use strict";var s=n("d9a0"),a=n.n(s);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("0fb7"),n("450d");var s=n("f529"),a=n.n(s),r=(n("be4f"),n("896a")),i=n.n(r),o=(n("e612"),n("dd87")),l=n.n(o),c=(n("075a"),n("72aa")),p=n.n(c),d=(n("6611"),n("e772")),u=n.n(d),m=(n("1f1a"),n("4e4b")),h=n.n(m),f=(n("e960"),n("b35b")),v=n.n(f),g=n("2b0e"),y=n("8c4f"),w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"sw-app-shell",attrs:{id:"sw-app-shell"}},[n("vue-sideout-panel",{staticStyle:{"z-index":"9000"},attrs:{widths:["500px"]},on:{close:function(t){e.showSettingsPanel=!1}},model:{value:e.showSettingsPanel,callback:function(t){e.showSettingsPanel=t},expression:"showSettingsPanel"}},[n("div",{staticClass:"sw-side-panel-container"},[n("div",{staticClass:"sw-row"},[n("el-switch",{staticStyle:{"margin-right":"5px"},attrs:{"active-text":"Developer Mode"},on:{change:function(t){e.$store.commit("isDevMode",e.isDevMode)}},model:{value:e.isDevMode,callback:function(t){e.isDevMode=t},expression:"isDevMode"}}),n("el-select",{attrs:{size:"medium",placeholder:"Select API Server"},on:{change:function(t){e.$store.commit("selectedApiServer",e.selectedApiServer)}},model:{value:e.selectedApiServer,callback:function(t){e.selectedApiServer=t},expression:"selectedApiServer"}},e._l(e.parsedSpec.servers,function(e){return n("el-option",{key:e.url,attrs:{label:e.url,value:e.url}})}),1)],1)])]),n("vue-sideout-panel",{staticStyle:{"z-index":"9000"},attrs:{widths:["500px"]},on:{close:function(t){e.showLoadJsonPanel=!1}},model:{value:e.showLoadJsonPanel,callback:function(t){e.showLoadJsonPanel=t},expression:"showLoadJsonPanel"}},[n("div",{staticClass:"sw-side-panel-container"},[n("div",{staticClass:"sw-bold-small-text"},[e._v(" Paste JSON String below ")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.jsonSpecText,expression:"jsonSpecText"}],staticClass:"sw-mono-font",staticStyle:{flex:"1"},domProps:{value:e.jsonSpecText},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.loadJson()},input:function(t){t.target.composing||(e.jsonSpecText=t.target.value)}}}),n("button",{staticClass:"sw-btn sw-primary",staticStyle:{"margin-top":"5px",width:"70px","align-self":"flex-end"},on:{click:function(t){e.loadJson()}}},[e._v("LOAD")])])]),n("div",{staticClass:"sw-app-header-container"},[n("div",{staticClass:"sw-row",staticStyle:{padding:"8px 4px 8px 4px","min-height":"54px"}},[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("mrin-logo",{staticStyle:{height:"36px",width:"36px","margin-left":"5px"}}),n("div",{staticClass:"sw-prod-title"},[e._v(" MrinDoc ")])],1),n("div",{staticStyle:{margin:"0px 8px"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.specUrl,expression:"specUrl"}],ref:"specUrl",staticClass:"sw-spec-url sw-dark sw-medium",attrs:{type:"text",placeholder:"Spec URL"},domProps:{value:e.specUrl},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.loadSpec(!1)},input:function(t){t.target.composing||(e.specUrl=t.target.value)}}}),n("button",{staticClass:"sw-btn sw-primary",staticStyle:{"border-radius":"0 2px 2px 0","padding-left":"5px","padding-right":"5px"},on:{click:function(t){e.loadSpec(!1)}}},[e._v("OPEN")])]),n("button",{staticClass:"sw-btn sw-primary",on:{click:function(t){e.showLoadJsonPanel=!0}}},[e._v("Load JSON")]),n("div",{staticStyle:{flex:"1"}}),n("div",{staticStyle:{display:"flex","flex-direction":"column","margin-right":"8px","align-items":"flex-end"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchVal,expression:"searchVal"}],staticClass:"sw-medium sw-dark",staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"Search"},domProps:{value:e.searchVal},on:{keyup:e.onSearchKeyUp,input:function(t){t.target.composing||(e.searchVal=t.target.value)}}})]),n("div",{staticStyle:{display:"flex","flex-direction":"column","margin-right":"8px","align-items":"flex-start"}},[n("i",{staticClass:"el-icon-setting",staticStyle:{color:"#aaa","font-size":"32px",cursor:"pointer"},on:{click:function(t){e.showSettingsPanel=!e.showSettingsPanel}}})])])]),e.isSpecLoaded?n("div",{ref:"pageContainer",staticClass:"sw-page-container"},[e.parsedSpec.info?n("div",{staticClass:"sw-doc-info"},[n("div",{staticClass:"sw-doc-title"},[e._v("\n          "+e._s(e.parsedSpec.info.title)+" \n          "),e.parsedSpec.info.version?n("span",{staticStyle:{"font-size":"14px","font-weight":"bold"}},[e._v(e._s(e.parsedSpec.info.version))]):e._e()]),e.docDescription?n("div",{staticClass:"sw-markdown-block"},[n("span",{domProps:{innerHTML:e._s(e.docDescription)}})]):e._e(),e.parsedSpec.info.license&&e.parsedSpec.info.license.name?n("div",{staticStyle:{"font-size":"12px",margin:"8px 0 0 0"}},[e._v(" \n          "+e._s(e.parsedSpec.info.license.name)+" \n          "),e.parsedSpec.info.license.url?n("a",{attrs:{href:e.parsedSpec.info.license.url}},[e._v(" "+e._s(e.parsedSpec.info.license.url))]):e._e()]):e._e()]):e._e(),e.parsedSpec.securitySchemes?n("security-schemes",{attrs:{schemes:e.parsedSpec.securitySchemes,authStatusText:e.authStatus}}):e._e(),e._l(e.parsedSpec.tags,function(t){return n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"tag.show"}],key:t.name,staticClass:"sw-tag-container"},[n("div",{staticClass:"sw-tag-title"},[e._v(e._s(t.name))]),t.description?n("span",{staticClass:"sw-markdown-block",domProps:{innerHTML:e._s(e.$marked(t.description))}}):e._e(),n("end-point",{attrs:{paths:t.paths,parameters:t.parameters}})],1)})],2):e._e()],1)},S=[],x=(n("a481"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%"}},e._l(e.paths,function(t,s){return t.show?n("div",{key:s,class:"sw-endpoint-wrapper "+t.method+" "+(t.expanded?"sw-expanded":"sw-collapsed")},[n("div",{class:"sw-endpoint-head "+t.method+" "+(t.expanded?"sw-expanded":"sw-collapsed"),on:{click:function(n){e.expandEndPoint(t)}}},[n("div",{class:"sw-method "+t.method},[e._v(" "+e._s(t.method)+" ")]),n("div",{class:"sw-path "+(t.depricated?" sw-depricated":"")},[e._v(" "+e._s(t.path)+" ")]),t.depricated?n("span",{staticStyle:{"font-size":"12px","text-transform":"uppercase","font-weight":"bold",color:"orangered",margin:"2px 0 0 5px"}},[e._v(" Depricated ")]):e._e(),n("div",{staticStyle:{"min-width":"60px",flex:"1"}}),n("div",{staticClass:"sw-end-point-descr"},[e._v(" "+e._s(t.summary)+" ")])]),t.expandedAtLeastOnce?n("div",{directives:[{name:"show",rawName:"v-show",value:t.expanded,expression:"fullPath.expanded"}],class:"sw-endpoint-body "+t.method},[t.summary||t.description?n("div",{staticClass:"sw-end-point-summary"},[n("div",{staticClass:"sw-end-point-title"},[e._v(e._s(t.summary))]),t.summary!==t.description?n("div",{staticClass:"sw-markdown-block"},[n("span",{domProps:{innerHTML:e._s(e.toHtml(t.description))}})]):e._e()]):e._e(),n("div",{class:"sw-req-resp-container "+e.layoutClass},[n("request-parameters",{staticClass:"sw-request",attrs:{method:t.method,url:t.path,parameters:t.parameters,requestBody:t.requestBody}}),n("response-types",{staticClass:"sw-response",attrs:{responses:t.responses}})],1)]):e._e()]):e._e()}),0)}),b=[],_=n("0e54"),k=n.n(_),T={props:{paths:{type:Array,required:!0,default:function(){return[]}}},data:function(){return{layoutClass:"sw-row"}},methods:{expandEndPoint(e){e.expandedAtLeastOnce=!0,e.expanded=!e.expanded},toHtml(e){return e?k()(e):""}},mounted(){},components:{RequestParameters:()=>n.e("chunk-3d106e28").then(n.bind(null,"b2da")),ResponseTypes:()=>n.e("chunk-5bceff24").then(n.bind(null,"1bbf"))}},A=T,C=(n("5e46"),n("2877")),O=Object(C["a"])(A,x,b,!1,null,"7c533553",null);O.options.__file="EndPoint.vue";var P=O.exports,U=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"1 0 511 512"}},[n("path",{attrs:{d:"M350.96 411.023C315.914 471.395 250.566 512 175.73 512S35.547 471.395.5 411.023c25.64-44.16 67.488-77.746 117.4-92.598 18.32-5.457 37.73-8.383 57.82-8.383 64.27 0 121.527 29.945 158.62 76.637a202.91 202.91 0 0 1 16.609 24.344zm0 0",fill:"#adc165"}}),n("path",{attrs:{d:"M334.352 386.68c-57.172 16.984-121.246 8.652-173.89-28.223-16.465-11.527-30.68-25.05-42.55-40.03 18.32-5.457 37.73-8.383 57.82-8.383 64.27 0 121.527 29.945 158.62 76.637zm77.172 32.18H85.195a7.84 7.84 0 0 1-7.84-7.84 7.84 7.84 0 0 1 7.84-7.836h326.328a7.84 7.84 0 0 1 7.84 7.84 7.84 7.84 0 0 1-7.84 7.836zm0 0",fill:"#99aa52"}}),n("path",{attrs:{d:"M374.32 337.773c-1.086 10.242-2.97 20.414-5.62 30.426-67.48 17.906-142.39.406-195.31-52.512-52.922-52.9-70.418-127.828-52.512-195.31 51.11-13.555 106.496-6.812 153.34 20.258 15 8.664 29.133 19.418 41.97 32.254 45.066 45.07 64.445 106.1 58.133 164.883zm0 0",fill:"#ffc73b"}}),n("path",{attrs:{d:"M374.32 337.773c-51.195-29.6-89.03-81.246-98.824-144.207-2.793-17.937-3.137-35.695-1.277-52.93 15 8.664 29.133 19.418 41.97 32.254 45.066 45.07 64.445 106.1 58.133 164.883zm37.203 81.086c-2.008 0-4.012-.762-5.543-2.293l-230.75-230.75a7.84 7.84 0 0 1 11.086-11.086l230.75 230.75c3.06 3.063 3.06 8.023 0 11.086-1.53 1.53-3.54 2.293-5.543 2.293zm0 0",fill:"#efb025"}}),n("path",{attrs:{d:"M310.543 175.23c0 74.84 40.605 140.184 100.98 175.234C471.895 315.418 512.5 250.07 512.5 175.23S471.898 35.047 411.523 0c-60.375 35.047-100.98 100.395-100.98 175.23zm0 0",fill:"#ff903e"}}),n("path",{attrs:{d:"M411.523 418.86a7.84 7.84 0 0 1-7.84-7.836V84.69c0-4.328 3.512-7.84 7.84-7.84s7.84 3.512 7.84 7.84v326.332a7.84 7.84 0 0 1-7.84 7.836zm0 0",fill:"#e87425"}})])])},$=[],q={props:{color:{type:String,default:"#333"}}},L=q,I=Object(C["a"])(L,U,$,!1,null,null,null);I.options.__file="Logo.vue";var j=I.exports,M=n("8d9b"),N=n.n(M),D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"sw-security-title"},[e._v(" AUTHENTICATION "),n("span",{staticStyle:{color:"orangered","font-size":"20px"}},[e._v(" "+e._s(e.authStatusData))])]),n("table",{staticClass:"sw-table",staticStyle:{"margin-top":"5px","line-height":"16px",width:"auto"}},[e._m(0),e._l(e.schemes,function(t,s){return n("tr",{key:s},[n("td",{staticClass:"sw-markdown-block",staticStyle:{width:"auto"}},[n("div",{staticClass:"sw-security-sub-title"},[e._v(" "+e._s(t.type)+" "+e._s(t.scheme?t.scheme:"")+" ")]),n("span",{domProps:{innerHTML:e._s(e.$marked(t.description?t.description:""))}})]),"apiKey"===t.type?n("td",[e._v("\n        If Activated, all requests will send "),n("code",[e._v("'"+e._s(t.name)+"'")]),e._v(" in "),n("code",[e._v("'"+e._s(t.in)+"'")]),e._v(" with the given value\n        "),n("div",{staticStyle:{margin:"5px 0 10px 0"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.apiToken,expression:"apiToken"}],staticClass:"sw-small",staticStyle:{width:"205px","margin-right":"5px"},attrs:{type:"text",placeholder:"api-token"},domProps:{value:e.apiToken},on:{input:function(t){t.target.composing||(e.apiToken=t.target.value)}}}),n("button",{staticClass:"sw-btn sw-primary sw-small",on:{click:function(n){e.onActivateSecurityScheme(t)}}},[e._v("ACTIVATE")])])]):"http"===t.type&&"basic"===t.scheme?n("td",[e._v("\n          If Activated, all requests will send "),n("code",[e._v("'Authorization'")]),e._v(" \n          header that contains the word  "),n("code",[e._v("'Basic'")]),e._v(" word followed by a space and a base64-encoded string username:password.\n          "),n("div",{staticStyle:{margin:"5px 0 10px 0"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"sw-small",staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"sw-small",staticStyle:{width:"100px",margin:"0 5px"},attrs:{type:"text",placeholder:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),n("button",{staticClass:"sw-btn sw-primary sw-small",on:{click:function(n){e.onActivateSecurityScheme(t)}}},[e._v("ACTIVATE")])])]):"http"===t.type&&"bearer"===t.scheme?n("td",[e._v("\n          If Activated, all requests will send "),n("code",[e._v("'Authorization'")]),e._v(" \n          header that contains the word  "),n("code",[e._v("'Bearer'")]),e._v(" word followed by a space and a Token String.\n          "),n("div",{staticStyle:{margin:"5px 0 10px 0"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.bearerToken,expression:"bearerToken"}],staticClass:"sw-small",staticStyle:{width:"205px","margin-right":"5px"},attrs:{type:"text",placeholder:"bearer-token"},domProps:{value:e.bearerToken},on:{input:function(t){t.target.composing||(e.bearerToken=t.target.value)}}}),n("button",{staticClass:"sw-btn sw-primary sw-small",on:{click:function(n){e.onActivateSecurityScheme(t)}}},[e._v("ACTIVATE")]),n("div",{staticClass:"sw-gray-small-text",staticStyle:{"font-size":"11px","margin-top":"2px"}},[e._v("Once activated, this token will be sent in 'Authorization' header of every request ")])])]):"oauth2"===t.type?n("td",e._l(t.flows,function(t,s){return n("span",{key:s},[t.authorizationUrl?n("div",[n("b",[e._v("Auth URL:")]),n("code",{staticStyle:{color:"#999"}},[e._v(" "+e._s(t.authorizationUrl))])]):e._e(),t.tokenUrl?n("div",[n("b",[e._v("Token URL: ")]),n("code",{staticStyle:{color:"#999"}},[e._v(" "+e._s(t.tokenUrl)+" ")])]):e._e(),t.refreshUrl?n("div",[n("b",[e._v("Refresh URL: ")]),n("code",{staticStyle:{color:"#999"}},[e._v(" "+e._s(t.refreshUrl))])]):e._e(),t.scopes?[n("b",[e._v("Scopes:")]),e._l(t.scopes,function(t,s){return n("code",{key:s,staticStyle:{color:"#999"}},[e._v(" \n              "+e._s(s)+", \n            ")])})]:e._e(),n("div",{staticStyle:{margin:"5px 0 10px 0"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.clientId,expression:"clientId"}],staticClass:"sw-small",staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"client-id"},domProps:{value:e.clientId},on:{input:function(t){t.target.composing||(e.clientId=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.clientSecret,expression:"clientSecret"}],staticClass:"sw-small",staticStyle:{width:"100px",margin:"0 5px"},attrs:{type:"text",placeholder:"client-secret"},domProps:{value:e.clientSecret},on:{input:function(t){t.target.composing||(e.clientSecret=t.target.value)}}}),n("button",{staticClass:"sw-btn sw-primary sw-small",on:{click:function(n){e.onOAuth(s,t)}}},[e._v("ACTIVATE")])]),t.authorizationUrl?n("div",[n("b",[e._v("Directions: ")]),e._v(" Register this client with "),n("code",[e._v(e._s(e.getOAuthBaseUrl(t.authorizationUrl)))]),n("br")]):e._e(),n("ul",[e._m(1,!0),n("li",[e._v(" During registration, specify callback(redirect) url as "),n("code",[e._v(e._s(e.browserLocation.origin))])])])],2)}),0):n("td",[e._v(" \n        "+e._s(t.type)+"\n      ")])])})],2)])},E=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",[n("th",[e._v("Type ")]),n("th",[e._v(" Authentication Procedure ")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[e._v(" Obtain a "),n("code",[e._v("client-id")]),e._v(" and "),n("code",[e._v("client-secret")])])}],z=n("c0d6");n("6b54");function V(e,t,n,s,a){let r=Math.floor(1099511627776*(1+Math.random())).toString(16),i=`${e}?response_type=${s}&client_id=${t}&redirect_uri=${n}&state=${r}`;a&&(i=i+"&scope="+a),window.location.assign(i)}var J=n("b279"),H={props:{schemes:{type:Object},authStatusText:{type:String,default:"(Not Authenticated)"}},data:function(){return{username:"",password:"",apiToken:"",bearerToken:"",customHeader:"",customToken:"",clientId:"",clientSecret:"",authStatusData:this.authStatusText,browserLocation:location}},methods:{onActivateSecurityScheme(e){if("apikey"===e.type.toLowerCase()&&"header"===e.in)this.$data.apiToken&&(z["a"].commit("reqTokenType",e.type.toLowerCase()),z["a"].commit("reqSendTokenIn",e.name),z["a"].commit("reqToken",this.$data.apiToken),this.authStatusData="(API Key Active)");else if("http"===e.type&&"bearer"===e.scheme)this.$data.bearerToken&&(z["a"].commit("reqTokenType",e.scheme),z["a"].commit("reqToken",this.$data.bearerToken),this.authStatusData="(HTTP Bearer Active)");else if("http"===e.type&&"basic"===e.scheme&&this.$data.username&&this.$data.password){z["a"].commit("reqTokenType",e.scheme);let t=btoa(this.$data.username+":"+this.$data.password);z["a"].commit("reqToken",t),this.authStatusData="(HTTP Basic Active)"}},onOAuth(e,t){let n=location.href.substring(0,location.href.indexOf("#"))+"oauth.html",s="token",a="";z["a"].commit("oAuthTokenUrl",t.tokenUrl),V(t.authorizationUrl,this.clientId,n,s,a)},getOAuthBaseUrl(e){return Object(J["c"])(e)}},mounted(){}},B=H,R=(n("4076"),Object(C["a"])(B,D,E,!1,null,"0525926e",null));R.options.__file="SecuritySchemes.vue";var W=R.exports,K=(n("28a5"),n("a789")),F=n.n(K),G=n("9f5f"),Q=n.n(G);function X(e){let t,n={patch:!0,warnOnly:!0};return t="string"===typeof e?Q.a.convertUrl(e,n):Q.a.convertObj(e,n),t.then(function(e){console.info("%c Convertion to OpenAPI 3.0 - Success !!! ","color:cornflowerblue");let t=new F.a;return t.validate(e.openapi,{validate:{spec:!1,schema:!1}})}).then(function(t){console.info("%c OpenAPI 3.0 Dereferencing - Success !!! ","color:cornflowerblue");let n=["get","put","post","delete","patch","options","head"],s=[],a=0;for(let e in t.paths){let r={summary:t.paths[e].summary,description:t.paths[e].description,servers:t.paths[e].servers?t.paths[e].servers:[],parameters:t.paths[e].parameters?t.paths[e].parameters:[]};n.forEach(function(n){let i,o,l;if(t.paths[e][n]){let c=t.paths[e][n];if(c.tags)o=c.tags[0],t.tags&&(l=t.tags.find(function(e){return e.name===o}));else{let t=e.indexOf("/",1);-1===t?t=e.length-1:t-=1,o=e.substr(1,t)}i=s.find(e=>e.name==o),i||(i={show:!0,name:o,description:l?l.description:"",paths:[]},s.push(i));let p=c.summary?c.summary:"",d=c.description?c.description:"";if(!p&&d)if(d.length>100){let e=-1;e=d.indexOf("\n"),(-1===e||e>100)&&(e=d.indexOf(". ")),(-1===e||e>100)&&(e=d.indexOf(".")),p=-1===e||e>100?d:d.substr(0,e)}else p=d;i.paths.push({show:!0,expanded:!1,expandedAtLeastOnce:!1,summary:p,method:n,description:c.description,path:e,operationId:c.operationId,requestBody:c.requestBody,parameters:c.parameters,servers:c.servers?r.servers.concat(c.servers):r.servers,responses:c.responses,depricated:c.deprecated,security:c.security,commonSummary:r.summary,commonDescription:r.description}),a++}})}let r={},i=[];r=t.components?t.components.securitySchemes:{},t.servers&&t.servers.map(function(t){if(t.url&&"/"===t.url.substr(0,1)){let n=e.split("/");t.url=n[0]+"//"+n[2]+t.url}}),i=t.servers;let o={info:t.info,tags:s,externalDocs:t.externalDocs,securitySchemes:r,servers:i,basePath:t.basePath,totalPathCount:a};return Promise.resolve(o)}).catch(function(e){console.error(e)})}var Y={data:function(){return{specUrl:"",searchVal:"",parsedSpec:{},isDevMode:!1,selectedApiServer:"",isSpecLoaded:!1,expandAll:!1,loading:!1,authStatus:"",docDescription:"",showSettingsPanel:!1,showLoadJsonPanel:!1,jsonSpecText:""}},methods:{loadJson(){let e=this;try{let n=JSON.parse(this.jsonSpecText);e.loading=!0,X(n).then(function(t){e.loading=!1,e.specUrl="",e.showLoadJsonPanel=!1,e.afterSpecParsedAndValidated(t)}).catch(function(t){return e.loading=!1,e.$message({showClose:!0,message:"Oops, Error encountered while parsing the Spec",type:"error"}),console.error("Onoes! The API is invalid. "+t.message),!1})}catch(t){e.$message({showClose:!0,message:"Unable to parse the JSON Text",type:"error"})}},loadSpec(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this;t.loading=!0,t.$nextTick(function(){X(t.specUrl).then(function(n){t.loading=!1,t.jsonSpecText="",void 0!==n&&null!==n?t.afterSpecParsedAndValidated(n,e):t.$message({showClose:!0,message:"Network Error encountered while fetching the Spec",type:"error"})}).catch(function(e){return t.loading=!1,t.$message({showClose:!0,message:"Oops, Error encountered while parsing the Spec",type:"error"}),console.error("Onoes! The API is invalid. "+e.message),!1})})},onSearchKeyUp:Object(J["a"])(function(e){var t=this;this.parsedSpec.tags.map(function(e){let n=0;for(let s=0;s<e.paths.length;s++)e.paths[s].path.toLowerCase().includes(t.searchVal.toLowerCase())?(e.paths[s].show=!0,n++):e.paths[s].show=!1;e.show=n>0})},500),afterSpecParsedAndValidated(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this,s="";n.searchVal="",n.parsedSpec=e,e.info.description&&(n.docDescription=k()(e.info.description)),(e.servers&&0==e.servers.length||!e.servers)&&(s=n.specUrl.substring(0,n.specUrl.indexOf("/",n.specUrl.indexOf("//")+2)),e.basePath&&(s=s+"/"+e.basePath.replace(/^\/|\/$/g,"")),n.parsedSpec.servers=[{url:s,description:"Auto generated Server URI"}]),n.isSpecLoaded=!0,n.isDevMode=!0,n.selectedApiServer=e.servers[0].url,z["a"].commit("specUrl",n.specUrl),z["a"].commit("selectedApiServer",e.servers[0].url),z["a"].commit("oAuthTokenUrl",""),!1===t&&(z["a"].commit("isDevMode",!0),z["a"].commit("reqToken",""),z["a"].commit("reqTokenType",""),z["a"].commit("reqSendTokenIn",""),z["a"].commit("reqHeader",""))},onExpandAll(e){void 0!==this.parsedSpec.tags&&this.parsedSpec.tags.map(function(t){t.paths.map(function(t){t.expanded=e,t.expandedAtLeastOnce=!0})})},onActivateSecurityScheme(e){console.log("%o",e)}},beforeRouteUpdate(e,t,n){e.path.startsWith("/load")&&e.params.specUrl&&(this.authStatus="(Not Authenticated)",this.specUrl=e.params.specUrl,this.loadSpec(!1)),n()},mounted(){"/reload"===this.$route.fullPath?(console.log("in reload"),this.specUrl=z["a"].state.specUrl,z["a"].commit("reqToken",localStorage.getItem("accessToken")),z["a"].commit("reqTokenType",localStorage.getItem("tokenType")),this.specUrl&&(this.authStatus="(OAuth Applied)",this.loadSpec(!0))):this.$route.fullPath.startsWith("/load")&&this.$route.params.specUrl?(this.authStatus="(Not Authenticated)",this.specUrl=this.$route.params.specUrl,this.loadSpec(!1)):(console.log("in else"),this.authStatus="(Not Authenticated)")},components:{EndPoint:P,MrinLogo:j,SecuritySchemes:W,VueSideoutPanel:N.a}},Z=Y,ee=(n("103e"),Object(C["a"])(Z,w,S,!1,null,"32a0f188",null));ee.options.__file="AppShell.vue";var te=ee.exports;g["default"].use(y["a"]);const ne=new y["a"]({routes:[{path:"/",redirect:function(e){return"load"}},{path:"/load/:specUrl?",name:"load",component:te},{path:"/reload",name:"reload",component:te}]});ne.beforeEach((e,t,n)=>{if(e.path.startsWith("/load")&&!e.params.specUrl){let e="";e="https://api.apis.guru/v2/specs/bitbucket.org/2.0/swagger.json",ne.push(`/load/${encodeURIComponent(e)}`)}n()});var se=ne,ae=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},re=[],ie=(n("5c0b"),{}),oe=Object(C["a"])(ie,ae,re,!1,null,null,null);oe.options.__file="App.vue";var le=oe.exports,ce=n("4897"),pe=n.n(ce),de=n("b2d6"),ue=n.n(de);g["default"].config.productionTip=!1,pe.a.use(ue.a),g["default"].use(v.a),g["default"].use(h.a),g["default"].use(u.a),g["default"].use(p.a),g["default"].use(l.a),g["default"].use(i.a.directive),g["default"].prototype.$message=a.a,g["default"].prototype.$loading=i.a.service,g["default"].prototype.$marked=k.a;new g["default"]({router:se,store:z["a"],render:e=>e(le)}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var s=n("5e27"),a=n.n(s);a.a},"5e27":function(e,t,n){},"5e46":function(e,t,n){"use strict";var s=n("2348"),a=n.n(s);a.a},b279:function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n.d(t,"f",function(){return r}),n.d(t,"b",function(){return i}),n.d(t,"d",function(){return a}),n.d(t,"c",function(){return c}),n.d(t,"e",function(){return p});n("28a5"),n("ac6a");function s(e,t){var n=null;return function(){clearTimeout(n);var s=arguments,a=this;n=setTimeout(function(){e.apply(a,s)},t)}}function a(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n="";if(e.enum){let t="";e.enum.map(function(e){t=t+e+", "}),n=`enum:〔 ${t.slice(0,-2)} 〕`}else e.type&&(n+=e.type);"integer"!==e.type&&"number"!==e.type||(void 0!==e.minimum&&void 0!==e.maximum?n=n+" ( "+(e.exclusiveMinimum?"> ":"")+e.minimum+" to "+(e.exclusiveMaximum?"< ":"")+e.maximum+" )":void 0!==e.minimum&&void 0===e.maximum?n=n+" ( "+(e.exclusiveMinimum?"> ":">=")+e.minimum+" )":void 0===e.minimum&&void 0!==e.maximum&&(n=n+" ( "+(e.exclusiveMaximum?"< ":"<=")+e.maximum+" )"),void 0!==e.multipleOf&&(n=n+" ( multiple of:"+e.multipleOf+" )")),"string"===e.type&&(void 0!==e.minLength&&void 0!==e.maxLength?n=n+" ( length: "+e.minLength+" to "+e.maxLength+" )":void 0!==e.minLength&&void 0===chema.maxLength?n=n+" ( min-length: "+e.minLength+" )":void 0===e.minLength&&void 0!==e.maxLength&&(n=n+" ( max-length: "+e.maxLength+" )"));let s=t?"":"<br/>";return e.format&&(n+=` ${s} (${e.format})`),e.pattern&&(n+=` ${s}(${e.pattern})`),n}function r(e,t){if(null!=e){if("object"===e.type||e.properties)for(let n in e.properties)e.properties[n].deprecated||e.properties[n].readOnly||e.properties[n].writeOnly||(t[n]=r(e.properties[n],{}));else if("array"===e.type||e.items)t=[r(e.items,{})];else{if(!e.allOf)return`${a(e)}~|~${e.description?e.description:""}`;{let n={};e.allOf.map(function(e){if(e&&e.type){let t=r(e,{});Object.assign(n,t)}}),t=n}}return t}}function i(e,t,n,s,a){let r=[];if(e)for(let o in e){let t="";try{t=JSON.parse(e[o].value),r.push({exampleType:"json",exampleValue:"text"===a?JSON.stringify(t,void 0,2):t})}catch(i){r.push({exampleType:"text",exampleValue:e[o].value})}}else if(t)try{let e=JSON.parse(t);r.push({exampleType:"json",exampleValue:"text"===a?JSON.stringify(e,void 0,2):e})}catch(i){r.push({exampleType:"text",exampleValue:t})}if(0==r.length)if(n){let e=o(n,{});r.push({exampleType:"json",exampleValue:"text"===a?JSON.stringify(e,void 0,2):e})}else r.push({exampleType:"text",exampleValue:""});return r}function o(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(null!=e){if("object"===e.type||e.properties)for(let s in e.properties)e.properties[s].deprecated||e.properties[s].readOnly&&!n.includeReadOnly||e.properties[s].writeOnly&&!n.includeWriteOnly||(t[s]=o(e.properties[s],{},n));else if("array"===e.type||e.items)t=[o(e.items,{},n)];else{if(!e.allOf)return l(e);{let s={};e.allOf.map(function(e){if(e&&e.type){let t=o(e,{},n);Object.assign(s,t)}}),t=s}}return t}}function l(e){if(e.example)return e.example;if(0===Object.keys(e).length)return null;const t=e.format||e.type||(e.enum?"enum":null);switch(t){case"int32":case"int64":case"integer":return 0;case"float":case"double":case"number":return.5;case"string":return e.enum?e.enum[0]:e.pattern?e.pattern:"string";case"byte":return btoa("string");case"binary":return"binary";case"boolean":return!1;case"date":return new Date(0).toISOString().split("T")[0];case"date-time":return new Date(0).toISOString();case"dateTime":return new Date(0).toISOString();case"password":return"password";case"enum":return e.enum[0];case"uri":return"http://example.com";case"uuid":return"3fa85f64-5717-4562-b3fc-2c963f66afa6";case"email":return"user@example.com";case"hostname":return"example.com";case"ipv4":return"198.51.100.42";case"ipv6":return"2001:0db8:5b96:0000:0000:426f:8e17:642a";default:return e.nullable?null:(console.warn("Unknown schema value",e),"?")}}function c(e){let t=e.split("/");return t[0]+"//"+t[2]}function p(){const e=new WeakSet;return(t,n)=>{if("object"===typeof n&&null!==n){if(e.has(n))return;e.add(n)}return n}}},c010:function(e,t,n){},c0d6:function(e,t,n){"use strict";var s=n("2b0e"),a=n("2f62"),r=n("bfa9");s["default"].use(a["a"]);const i=["lang","specUrl","reqToken","reqTokenType","reqHeader","reqSendTokenIn","oAuthTokenUrl"];new r["a"]({key:"mrindoc",storage:window.localStorage,filter:function(e){return i.indexOf(e.type)>=0}});t["a"]=new a["a"].Store({state:{lang:"en",specUrl:"",isDevMode:!1,selectedApiServer:"",reqHeader:"",reqToken:"",reqTokenType:"",reqSendTokenIn:"",oAuthClientId:"",oAuthClientSecret:"",oAuthTokenUrl:""},mutations:{lang(e,t){e.lang=t},specUrl(e,t){e.specUrl=t},isDevMode(e,t){e.isDevMode=t},reqToken(e,t){e.reqToken=t},reqTokenType(e,t){e.reqTokenType=t},reqHeader(e,t){e.reqHeader=t},reqSendTokenIn(e,t){e.reqSendTokenIn=t},oAuthClientId(e,t){e.oAuthClientId=t},oAuthClientSecret(e,t){e.oAuthClientSecret=t},oAuthTokenUrl(e,t){e.oAuthTokenUrl=t},selectedApiServer(e,t){e.selectedApiServer=t}},plugins:[(new r["a"]).plugin]})},d9a0:function(e,t,n){}});
//# sourceMappingURL=app.c177fd6f.js.map