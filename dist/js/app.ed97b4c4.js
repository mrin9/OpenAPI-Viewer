(function(e){function t(t){for(var s,n,o=t[0],l=t[1],c=t[2],p=0,d=[];p<o.length;p++)n=o[p],a[n]&&d.push(a[n][0]),a[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],s=!0,n=1;n<r.length;n++){var o=r[n];0!==a[o]&&(s=!1)}s&&(i.splice(t--,1),e=l(l.s=r[0]))}return e}var s={},n={app:0},a={app:0},i=[];function o(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-1b86d6d1":"1d3e1e12","chunk-623265b6":"cd9f86ec"}[e]+".js"}function l(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.e=function(e){var t=[],r={"chunk-1b86d6d1":1,"chunk-623265b6":1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=new Promise(function(t,r){for(var s="css/"+({}[e]||e)+"."+{"chunk-1b86d6d1":"4dbfb934","chunk-623265b6":"2f840c71"}[e]+".css",a=l.p+s,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var c=i[o],p=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(p===s||p===a))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){c=d[o],p=c.getAttribute("data-href");if(p===s||p===a)return t()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=t,u.onerror=function(t){var s=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");i.request=s,delete n[e],u.parentNode.removeChild(u),r(i)},u.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(u)}).then(function(){n[e]=0}));var s=a[e];if(0!==s)if(s)t.push(s[2]);else{var i=new Promise(function(t,r){s=a[e]=[t,r]});t.push(s[2]=i);var c,p=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=o(e),c=function(t){d.onerror=d.onload=null,clearTimeout(u);var r=a[e];if(0!==r){if(r){var s=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+s+": "+n+")");i.type=s,i.request=n,r[1](i)}a[e]=void 0}};var u=setTimeout(function(){c({type:"timeout",target:d})},12e4);d.onerror=d.onload=c,p.appendChild(d)}return Promise.all(t)},l.m=e,l.c=s,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)l.d(r,s,function(t){return e[t]}.bind(null,s));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/OpenAPI-Viewer/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],p=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var u=p;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},1:function(e,t){},2:function(e,t){},3:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("0fb7"),r("450d");var s=r("f529"),n=r.n(s),a=(r("be4f"),r("896a")),i=r.n(a),o=(r("5e32"),r("6721")),l=r.n(o),c=(r("e612"),r("dd87")),p=r.n(c),d=(r("075a"),r("72aa")),u=r.n(d),f=(r("6611"),r("e772")),m=r.n(f),h=(r("1f1a"),r("4e4b")),v=r.n(h),g=(r("e960"),r("b35b")),y=r.n(g),b=r("2b0e"),w=r("8c4f"),x=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"sw-app-shell",attrs:{id:"sw-app-shell"}},[r("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"sw-main-container"},[r("div",{staticClass:"sw-app-header-container"},[r("div",{staticClass:"sw-row",staticStyle:{padding:"8px 4px 8px 4px","min-height":"54px"}},[r("div",{staticStyle:{display:"flex","align-items":"center"}},[r("mrin-logo",{staticStyle:{height:"36px",width:"36px","margin-left":"5px"}}),r("div",{staticClass:"sw-prod-title"},[e._v(" MrinDoc ")])],1),r("div",{staticStyle:{margin:"0px 8px"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.specUrl,expression:"specUrl"}],ref:"specUrl",staticClass:"sw-dark sw-medium",staticStyle:{width:"260px","margin-right":"-1px"},attrs:{type:"text",placeholder:"Spec URL"},domProps:{value:e.specUrl},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onExplore(t):null},input:function(t){t.target.composing||(e.specUrl=t.target.value)}}}),r("button",{staticClass:"sw-btn sw-primary",staticStyle:{"border-radius":"0 2px 2px 0","padding-left":"5px","padding-right":"5px"},on:{click:e.onExplore}},[e._v("OPEN")])]),r("div",{staticStyle:{display:"flex","flex-direction":"column","margin-right":"8px","align-items":"flex-end"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.searchVal,expression:"searchVal"}],staticClass:"sw-medium sw-dark",staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"Search"},domProps:{value:e.searchVal},on:{keyup:e.onSearchKeyUp,input:function(t){t.target.composing||(e.searchVal=t.target.value)}}})]),r("div",{staticStyle:{flex:"1"}}),e.isDevMode?r("div",{staticStyle:{display:"flex",width:"200px","flex-direction":"column","margin-right":"8px","align-items":"stretch"}},[r("el-select",{staticClass:"sw-dark",attrs:{size:"medium",placeholder:"Select API Server","popper-class":"sw-dark"},on:{change:function(t){e.$store.commit("selectedApiServer",e.selectedApiServer)}},model:{value:e.selectedApiServer,callback:function(t){e.selectedApiServer=t},expression:"selectedApiServer"}},e._l(e.parsedSpec.servers,function(e){return r("el-option",{key:e.url,attrs:{label:e.url,value:e.url}})}),1),r("div",{staticStyle:{display:"flex","margin-top":"2px"}},[r("input",{staticClass:"sw-dark sw-medium",staticStyle:{"margin-right":"-1px"},attrs:{type:"text",placeholder:"Token"},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onExplore(t):null}}}),r("button",{staticClass:"sw-btn sw-primary",staticStyle:{"border-radius":"0 2px 2px 0","padding-left":"5px","padding-right":"5px"}},[e._v("SAVE")])])],1):e._e(),r("div",{staticStyle:{display:"flex","flex-direction":"column","margin-right":"8px","align-items":"flex-start"}},[r("el-switch",{staticClass:"sw-dark",staticStyle:{"margin-bottom":"2px"},attrs:{"active-text":"Expand All"},on:{change:e.onExpandAll},model:{value:e.expandAll,callback:function(t){e.expandAll=t},expression:"expandAll"}}),r("el-switch",{staticClass:"sw-dark",attrs:{"active-text":"Developer Mode"},on:{change:function(t){e.$store.commit("isDevMode",e.isDevMode)}},model:{value:e.isDevMode,callback:function(t){e.isDevMode=t},expression:"isDevMode"}})],1)])]),e.isSpecLoaded?r("div",{ref:"pageContainer",staticClass:"sw-page-container"},[e.parsedSpec.info?r("div",{staticClass:"sw-doc-info"},[r("div",{staticClass:"sw-doc-title"},[e._v("\n            "+e._s(e.parsedSpec.info.title)+" \n            "),e.parsedSpec.info.version?r("span",{staticStyle:{"font-size":"14px","font-weight":"bold"}},[e._v(e._s(e.parsedSpec.info.version))]):e._e()]),e.docDescription?r("div",{staticClass:"sw-markdown-block"},[r("span",{domProps:{innerHTML:e._s(e.docDescription)}})]):e._e(),e.parsedSpec.info.license&&e.parsedSpec.info.license.name?r("div",{staticStyle:{"font-size":"12px",margin:"8px 0 0 0"}},[e._v(" \n            "+e._s(e.parsedSpec.info.license.name)+" \n            "),e.parsedSpec.info.license.url?r("a",{attrs:{href:e.parsedSpec.info.license.url}},[e._v(" "+e._s(e.parsedSpec.info.license.url))]):e._e()]):e._e()]):e._e(),e._l(e.parsedSpec.tags,function(t){return r("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"tag.show"}],key:t.name,staticClass:"sw-tag-container"},[r("div",{staticClass:"sw-tag-title"},[e._v(e._s(t.name))]),t.description?r("span",{staticClass:"sw-gray-small-text"},[e._v(" "+e._s(t.description)+" ")]):e._e(),r("end-point",{attrs:{paths:t.paths,parameters:t.parameters}})],1)})],2):e._e()])])},S=[],_=(r("a481"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{width:"100%"}},e._l(e.paths,function(t,s){return t.show?r("div",{key:s,class:"sw-endpoint-wrapper "+t.method+" "+(t.expanded?"sw-expanded":"sw-collapsed")},[r("div",{class:"sw-endpoint-head "+t.method+" "+(t.expanded?"sw-expanded":"sw-collapsed"),on:{click:function(e){t.expanded=!t.expanded}}},[r("div",{class:"sw-method "+t.method},[e._v(" "+e._s(t.method)+" ")]),r("div",{class:"sw-path "+(t.depricated?" sw-depricated":"")},[e._v(" "+e._s(t.path)+" ")]),t.depricated?r("span",{staticStyle:{"font-size":"12px","text-transform":"uppercase","font-weight":"bold",color:"orangered",margin:"2px 0 0 5px"}},[e._v(" Depricated ")]):e._e(),r("div",{staticStyle:{"min-width":"60px",flex:"1"}}),r("div",{staticClass:"sw-end-point-descr"},[e._v(" "+e._s(t.summary)+" ")])]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.expanded,expression:"fullPath.expanded"}],class:"sw-endpoint-body "+t.method},[t.summary||t.description?r("div",{staticClass:"sw-end-point-summary"},[r("div",{staticClass:"sw-end-point-title"},[e._v(e._s(t.summary))]),t.summary!==t.description?r("div",{staticClass:"sw-markdown-block"},[r("span",{domProps:{innerHTML:e._s(e.toHtml(t.description))}})]):e._e()]):e._e(),r("div",{class:"sw-req-resp-container "+e.layoutClass},[r("request-parameters",{staticClass:"sw-request",attrs:{method:t.method,url:t.path,parameters:t.parameters,requestBody:t.requestBody}}),r("response-types",{staticClass:"sw-response",attrs:{responses:t.responses}})],1)])]):e._e()}))}),k=[],C=r("0e54"),A=r.n(C),O={props:{paths:{type:Array,required:!0,default:function(){return[]}}},data:function(){return{layoutClass:"sw-row"}},methods:{toHtml(e){return A()(e)}},components:{RequestParameters:()=>r.e("chunk-1b86d6d1").then(r.bind(null,"b2da")),ResponseTypes:()=>r.e("chunk-623265b6").then(r.bind(null,"1bbf"))}},P=O,E=(r("b2ef"),r("2877")),M=Object(E["a"])(P,_,k,!1,null,"343fed3c",null);M.options.__file="EndPoint.vue";var j=M.exports,D=r("b279"),T=(r("28a5"),r("a789")),U=r.n(T),$=r("9f5f"),z=r.n($);function I(e){return z.a.convertUrl(e,{}).then(function(e){console.info("%c Convertion to OpenAPI 3.0 - Success !!! ","color:cornflowerblue");let t=new U.a;return t.validate(e.openapi,{validate:{spec:!1,schema:!1}})}).then(function(t){console.info("%c OpenAPI 3.0 Dereferencing - Success !!! ","color:cornflowerblue");let r=["get","put","post","delete","patch","options","head"],s=[],n=0;for(let e in t.paths){let a={summary:t.paths[e].summary,description:t.paths[e].description,servers:t.paths[e].servers?t.paths[e].servers:[],parameters:t.paths[e].parameters?t.paths[e].parameters:[]};r.forEach(function(r){let i,o,l;if(t.paths[e][r]){let c=t.paths[e][r];if(c.tags)o=c.tags[0],t.tags&&(l=t.tags.find(function(e){return e.name===o}));else{let t=e.indexOf("/",1);-1===t?t=e.length-1:t-=1,o=e.substr(1,t)}i=s.find(e=>e.name==o),i||(i={show:!0,name:o,description:l?l.description:"",paths:[]},s.push(i));let p=c.summary?c.summary:"",d=c.description?c.description:"";if(!p&&d)if(d.length>100){let e=-1;e=d.indexOf("\n"),(-1===e||e>100)&&(e=d.indexOf(". ")),(-1===e||e>100)&&(e=d.indexOf(".")),p=-1===e||e>100?d:d.substr(0,e)}else p=d;i.paths.push({show:!0,expanded:!1,summary:p,method:r,description:c.description,path:e,operationId:c.operationId,requestBody:c.requestBody,parameters:c.parameters?a.parameters.concat(c.parameters):a.parameters,servers:c.servers?a.servers.concat(c.servers):a.servers,responses:c.responses,depricated:c.deprecated,security:c.security,commonSummary:a.summary,commonDescription:a.description}),n++}})}let a={},i=[];a=t.components?t.components.securitySchemes:{},t.servers&&t.servers.map(function(t){if(t.url&&"/"===t.url.substr(0,1)){let r=e.split("/");t.url=r[0]+"//"+r[2]+t.url}}),i=t.servers;let o={info:t.info,tags:s,externalDocs:t.externalDocs,securitySchemes:a,servers:i,basePath:t.basePath,totalPathCount:n};return Promise.resolve(o)}).catch(function(e){console.error(e)})}var L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"1 0 511 512"}},[r("path",{attrs:{d:"M350.96 411.023C315.914 471.395 250.566 512 175.73 512S35.547 471.395.5 411.023c25.64-44.16 67.488-77.746 117.4-92.598 18.32-5.457 37.73-8.383 57.82-8.383 64.27 0 121.527 29.945 158.62 76.637a202.91 202.91 0 0 1 16.609 24.344zm0 0",fill:"#adc165"}}),r("path",{attrs:{d:"M334.352 386.68c-57.172 16.984-121.246 8.652-173.89-28.223-16.465-11.527-30.68-25.05-42.55-40.03 18.32-5.457 37.73-8.383 57.82-8.383 64.27 0 121.527 29.945 158.62 76.637zm77.172 32.18H85.195a7.84 7.84 0 0 1-7.84-7.84 7.84 7.84 0 0 1 7.84-7.836h326.328a7.84 7.84 0 0 1 7.84 7.84 7.84 7.84 0 0 1-7.84 7.836zm0 0",fill:"#99aa52"}}),r("path",{attrs:{d:"M374.32 337.773c-1.086 10.242-2.97 20.414-5.62 30.426-67.48 17.906-142.39.406-195.31-52.512-52.922-52.9-70.418-127.828-52.512-195.31 51.11-13.555 106.496-6.812 153.34 20.258 15 8.664 29.133 19.418 41.97 32.254 45.066 45.07 64.445 106.1 58.133 164.883zm0 0",fill:"#ffc73b"}}),r("path",{attrs:{d:"M374.32 337.773c-51.195-29.6-89.03-81.246-98.824-144.207-2.793-17.937-3.137-35.695-1.277-52.93 15 8.664 29.133 19.418 41.97 32.254 45.066 45.07 64.445 106.1 58.133 164.883zm37.203 81.086c-2.008 0-4.012-.762-5.543-2.293l-230.75-230.75a7.84 7.84 0 0 1 11.086-11.086l230.75 230.75c3.06 3.063 3.06 8.023 0 11.086-1.53 1.53-3.54 2.293-5.543 2.293zm0 0",fill:"#efb025"}}),r("path",{attrs:{d:"M310.543 175.23c0 74.84 40.605 140.184 100.98 175.234C471.895 315.418 512.5 250.07 512.5 175.23S471.898 35.047 411.523 0c-60.375 35.047-100.98 100.395-100.98 175.23zm0 0",fill:"#ff903e"}}),r("path",{attrs:{d:"M411.523 418.86a7.84 7.84 0 0 1-7.84-7.836V84.69c0-4.328 3.512-7.84 7.84-7.84s7.84 3.512 7.84 7.84v326.332a7.84 7.84 0 0 1-7.84 7.836zm0 0",fill:"#e87425"}})])])},q=[],N={props:{color:{type:String,default:"#333"}}},V=N,B=Object(E["a"])(V,L,q,!1,null,null,null);B.options.__file="Logo.vue";var H=B.exports,R=r("c0d6"),J={data:function(){return{specUrl:"https://raw.githubusercontent.com/APIs-guru/unofficial_openapi_specs/master/github.com/v3/swagger.yaml",searchVal:"",parsedSpec:{},isDevMode:!1,selectedApiServer:"",isSpecLoaded:!1,expandAll:!1,loading:!1,docDescription:""}},methods:{onExplore(){let e=this;e.loading=!0,e.$nextTick(function(){I(e.specUrl).then(function(t){let r="";e.searchVal="",e.parsedSpec=t,t.info.description&&(e.docDescription=A()(t.info.description)),(t.server&&0==t.server.length||!t.server)&&(r=e.specUrl.substring(0,e.specUrl.indexOf("/",e.specUrl.indexOf("//")+2)),t.basePath&&(r=r+"/"+t.basePath.replace(/^\/|\/$/g,""),e.parsedSpec.servers=[{url:r,description:"Auto generated Server URI"}])),e.isSpecLoaded=!0,e.isDevMode=!0,e.selectedApiServer=t.servers[0].url,R["a"].commit("isDevMode",!0),R["a"].commit("selectedApiServer",t.servers[0].url),setTimeout(()=>e.loading=!1,8*t.totalPathCount)}).catch(function(t){return e.loading=!1,e.$message({showClose:!0,message:"Oops, Error encountered while parsing the Spec",type:"error"}),console.error("Onoes! The API is invalid. "+t.message),!1})})},onSearchKeyUp:Object(D["a"])(function(e){var t=this;this.parsedSpec.tags.map(function(e){let r=0;for(let s=0;s<e.paths.length;s++)e.paths[s].path.toLowerCase().includes(t.searchVal.toLowerCase())?(e.paths[s].show=!0,r++):e.paths[s].show=!1;e.show=r>0})},500),onExpandAll(e){void 0!==this.parsedSpec.tags&&this.parsedSpec.tags.map(function(t){t.paths.map(function(t){t.expanded=e})})}},mounted(){this.$refs.specUrl.focus()},components:{EndPoint:j,MrinLogo:H}},K=J,F=(r("fdd5"),Object(E["a"])(K,x,S,!1,null,"135d32d6",null));F.options.__file="AppShell.vue";var G=F.exports;b["default"].use(w["a"]);var Q=new w["a"]({routes:[{path:"/",redirect:function(e){return"/home"}},{path:"/home",name:"AppShell",component:G}]}),W=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},X=[],Y=(r("5c0b"),{}),Z=Object(E["a"])(Y,W,X,!1,null,null,null);Z.options.__file="App.vue";var ee=Z.exports,te=r("4897"),re=r.n(te),se=r("b2d6"),ne=r.n(se);b["default"].config.productionTip=!1,re.a.use(ne.a),b["default"].use(y.a),b["default"].use(v.a),b["default"].use(m.a),b["default"].use(u.a),b["default"].use(p.a),b["default"].use(l.a),b["default"].use(i.a.directive),b["default"].prototype.$message=n.a,b["default"].prototype.$loading=i.a.service;new b["default"]({router:Q,store:R["a"],beforeCreate:function(){},render:e=>e(ee)}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var s=r("5e27"),n=r.n(s);n.a},"5e27":function(e,t,r){},b279:function(e,t,r){"use strict";r.d(t,"a",function(){return s}),r.d(t,"c",function(){return n}),r.d(t,"b",function(){return i});r("28a5"),r("3b2b"),r("ac6a");function s(e,t){var r=null;return function(){clearTimeout(r);var s=arguments,n=this;r=setTimeout(function(){e.apply(n,s)},t)}}function n(e,t){if("object"===e.type||e.properties)for(let r in e.properties){let s=Object.assign({},e.properties[r]);t[r]=n(s,{})}else{if("array"!==e.type&&!e.items)return a(e);{let r=Object.assign({},e.items);t=[n(r,{})]}}return t}function a(e){if(e.example)return e.example;if(0===Object.keys(e).length)return null;const t=e.format||e.type||(e.enum?"enum":null);switch(t){case"int32":case"int64":case"integer":return 0;case"float":case"double":case"number":return.5;case"string":return e.enum?e.enum[0]:e.pattern?rx(new RegExp(e.pattern)):"string";case"byte":return btoa("string");case"binary":return"binary";case"boolean":return!1;case"date":return new Date(0).toISOString().split("T")[0];case"date-time":return new Date(0).toISOString();case"dateTime":return new Date(0).toISOString();case"password":return"password";case"enum":return e.enum[0];default:return e.nullable?null:(console.warn("Unknown schema value",e),"?")}}function i(e,t,r){if("object"===e.type||e.properties)for(let s in e.properties){let r=Object.assign({},e.properties[s]);if("object"===e.properties[s].type||e.properties[s].properties)t.push({label:{label:s,type:e.properties[s].type,descr:e.properties[s].description},children:i(r,[],s)});else if("array"===e.properties[s].type||e.properties[s].items){let n="";n=e.properties[s].items.properties?"array of objects":"array of "+e.properties[s].items.type,t.push({label:{label:"[ "+s+" ]",type:n,descr:e.properties[s].description},children:i(r,[],s)})}else{let r="";r=e.properties[s].enum?"Enum: "+e.properties[s].enum.join(" | "):e.properties[s].type,t.push({label:{label:s,type:r,descr:e.properties[s].description}})}}else if("array"===e.type){if("object"===e.items.type||e.items.properties){let t=Object.assign({},e.items);return i(t,[])}if("array"!==e.items.type)return;t.push({label:{label:"[ "+e.items.type+" ]",type:e.items.type,descr:e.items.description}})}else t.push({label:{label:r,type:e.type,descr:e.description}});return t}},b2ef:function(e,t,r){"use strict";var s=r("e54e"),n=r.n(s);n.a},bd15:function(e,t,r){},c0d6:function(e,t,r){"use strict";var s=r("2b0e"),n=r("2f62");r("bfa9");s["default"].use(n["a"]);t["a"]=new n["a"].Store({state:{lang:"en",baseUrl:"",scheme:"http",isDevMode:!1,selectedApiServer:""},mutations:{lang(e,t){e.lang=t},baseUrl(e,t){e.baseUrl=t},scheme(e,t){e.scheme=t},isDevMode(e,t){e.isDevMode=t},selectedApiServer(e,t){e.selectedApiServer=t}},actions:{}})},e54e:function(e,t,r){},fdd5:function(e,t,r){"use strict";var s=r("bd15"),n=r.n(s);n.a}});
//# sourceMappingURL=app.ed97b4c4.js.map