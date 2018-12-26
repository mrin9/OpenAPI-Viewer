<template>
  <div id="sw-app-shell"  v-loading.fullscreen.lock="loading" class="sw-app-shell" >
      <!-- Settings Panel -->
      <vue-sideout-panel v-model="showSettingsPanel" @close="showSettingsPanel=false" :widths="['500px']" style="z-index:9000" >
        <div class="sw-side-panel-container">
          <div class="sw-row">
            <el-switch v-model="isDevMode"
              style="margin-right:5px"
              active-text="Developer Mode"  
              @change= "$store.commit('isDevMode', isDevMode)"
            > 
            </el-switch>
            <el-select 
              v-model="selectedApiServer" 
              size="medium" 
              placeholder="Select API Server" 
              @change= "$store.commit('selectedApiServer', selectedApiServer)"
            >
              <el-option v-for="item in parsedSpec.servers" :key="item.url" :label="item.url" :value="item.url"></el-option>
            </el-select>
          </div>  
        </div>
      </vue-sideout-panel>

      <!-- Load JSON Panel -->
      <vue-sideout-panel v-model="showLoadJsonPanel" @close="showLoadJsonPanel=false" :widths="['500px']" style="z-index:9000" >
        <div class="sw-side-panel-container">
          <div class="sw-bold-small-text"> Paste JSON String below </div> 
          <textarea class="sw-mono-font" v-model= "jsonSpecText" style="flex:1" @keyup.enter="loadJson()"/>
          <button class="sw-btn sw-primary" style="margin-top:5px; width:70px;align-self: flex-end;" @click="loadJson()">LOAD</button>
        </div>  
      </vue-sideout-panel>


      <div class="sw-app-header-container">
        <div class="sw-row" style="padding:8px 4px 8px 4px;min-height:54px">
          <div style="display:flex; align-items: center;">
            <mrin-logo style="height:36px;width:36px;margin-left:5px"></mrin-logo>
            <div class="sw-prod-title"> MrinDoc </div>
          </div>  
          <div style="margin: 0px 8px;">
            <input ref="specUrl" type="text" placeholder="Spec URL" class="sw-spec-url sw-dark sw-medium" v-model="specUrl" @keyup.enter="loadSpec(false)">
            <button class="sw-btn sw-primary"  style="border-radius: 0 2px 2px 0; padding-left:5px; padding-right:5px;" @click="loadSpec(false)">OPEN</button>
          </div>
          <button class="sw-btn sw-primary" @click="showLoadJsonPanel=true">Load JSON</button>


          <div style="flex:1"></div>  

          <div style="display:flex; flex-direction:column; margin-right:8px; align-items:flex-end;">
            <input style="width:100px;" type="text" placeholder="Search" class="sw-medium sw-dark" v-model="searchVal" @keyup="onSearchKeyUp">
          </div>  
          <div style="display:flex; flex-direction:column; margin-right:8px; align-items:flex-start;">
            <!--
            <el-switch 
              v-model="expandAll" 
              active-text="Expand All"  
              style="margin-bottom:2px;" 
              class="sw-dark"
              @change= "onExpandAll"
            > 
            </el-switch>
            -->

            <i style="color:#aaa; font-size:32px; cursor:pointer" class="el-icon-setting" @click="showSettingsPanel= !showSettingsPanel"></i>
            <!-- el-switch v-model="showPanel"  active-text="Preferences" class="sw-dark"> </el-switch -->
          </div>  
        </div>
      </div>

      <div v-if="isSpecLoaded" class="sw-page-container" ref="pageContainer">

        <!-- Doc Info Section -->
        <div class="sw-doc-info" v-if="parsedSpec.info">
          <div class="sw-doc-title">
            {{parsedSpec.info.title}} 
            <span v-if="parsedSpec.info.version" style="font-size:14px;font-weight:bold">{{parsedSpec.info.version}}</span>
          </div>  
          <div class="sw-markdown-block" v-if="docDescription"> 
            <span v-html="docDescription">  </span>  
          </div>  
          <div  v-if="parsedSpec.info.license && parsedSpec.info.license.name" style="font-size:12px;margin:8px 0 0 0;"> 
            {{parsedSpec.info.license.name}} 
            <a v-if="parsedSpec.info.license.url"  :href="parsedSpec.info.license.url"> {{parsedSpec.info.license.url}}</a></div>    
        </div>

        <!-- Doc Security Section -->
        <security-schemes  v-if="parsedSpec.securitySchemes" 
          :schemes="parsedSpec.securitySchemes"
          :authStatusText="authStatus"
        >

        </security-schemes>

        <!-- All the TAGS and End-Points inside them -->
        <div class="sw-tag-container" v-for="tag in parsedSpec.tags" v-show="tag.show" :key="tag.name">
          <div class="sw-tag-title">{{tag.name}}</div>
          <span v-if="tag.description" class="sw-markdown-block" v-html="$marked(tag.description)">  </span>   
          <end-point :paths="tag.paths" :parameters="tag.parameters" ></end-point> 
        </div>
        
      </div>
  </div>
</template>

<script>
import EndPoint from '@/components/EndPoint';
import MrinLogo from '@/components/Logo';
import VueSideoutPanel from 'vue-slideout-panel';
import SecuritySchemes from '@/components/SecuritySchemes';
import {parseSpec, debounce } from  '@/lib/utils';
import ProcessSpec from  '@/lib/parserUtils';
import store from '@/store';
import { Loading } from 'element-ui';
import marked from 'marked';

export default {
  data:function(){
    return{
      specUrl:"",
      searchVal :"",
      parsedSpec:{},
      isDevMode :false,
      selectedApiServer:"",
      isSpecLoaded:false,
      expandAll:false,
      loading:false,
      authStatus:"",
      docDescription:"",
      showSettingsPanel:false,
      showLoadJsonPanel:false,
      jsonSpecText:""
      
    }
  },
  methods:{
    loadJson(){
      let me = this;
      try{
        let jsonObj = JSON.parse( this.jsonSpecText);
        me.loading=true;
        ProcessSpec(jsonObj).then(function( spec ){
          me.loading=false;
          me.specUrl="";
          me.showLoadJsonPanel=false;
          me.afterSpecParsedAndValidated(spec);
        })
        .catch(function(err) {
          me.loading=false;
          me.$message({
            showClose: true,
            message: 'Oops, Error encountered while parsing the Spec',
            type: 'error'
          });
          console.error('Onoes! The API is invalid. ' + err.message);
          return false;
        });
      }
      catch{
        me.$message({
          showClose: true,
          message: 'Unable to parse the JSON Text',
          type: 'error'
        });

      }

    },

    loadSpec(isReloadingSpec=false){
      let me = this;
      me.loading=true;
      me.$nextTick(function(){
        ProcessSpec(me.specUrl).then(function(spec){
          me.loading=false;
          me.jsonSpecText="";
          if (spec===undefined || spec === null){
            me.$message({
              showClose: true,
              message: 'Network Error encountered while fetching the Spec',
              type: 'error'
            });
            return;
          }
          me.afterSpecParsedAndValidated(spec,isReloadingSpec);

        })
        .catch(function(err) {
          me.loading=false;
          me.$message({
            showClose: true,
            message: 'Oops, Error encountered while parsing the Spec',
            type: 'error'
          });
          console.error('Onoes! The API is invalid. ' + err.message);
          return false;
        });
      });
    },

    onSearchKeyUp:debounce(function(e) {
      var me = this;
      this.parsedSpec.tags.map(function(v){
        let cnt=0;

        for (let i = 0; i < v.paths.length; i++) {
          if (v.paths[i].path.toLowerCase().includes(me.searchVal.toLowerCase() )){
            v.paths[i].show=true;
            cnt++;
          }
          else{
            v.paths[i].show=false;
          }
        }
        v.show = (cnt > 0)
      })
    }, 500),

    afterSpecParsedAndValidated(spec, isReloadingSpec=false){
      let me = this;
      let serverUrl="";
      me.searchVal="";
      me.parsedSpec = spec;
      if (spec.info.description){
        me.docDescription = marked(spec.info.description);
      }
      if ( (spec.servers && spec.servers.length == 0 ) || (!spec.servers)   ){
        serverUrl = me.specUrl.substring(0, me.specUrl.indexOf("/", me.specUrl.indexOf("//")+2));
        if (spec.basePath){
          serverUrl = serverUrl +"/" + spec.basePath.replace(/^\/|\/$/g, '');
        }
        me.parsedSpec.servers = [{ 
          url: serverUrl ,
          description:"Auto generated Server URI"
        }];
      }
      me.isSpecLoaded=true;
      me.isDevMode=true;
      me.selectedApiServer = spec.servers[0].url;

      store.commit("specUrl", me.specUrl);
      store.commit("selectedApiServer", spec.servers[0].url);
      store.commit("oAuthTokenUrl", "");

      if (isReloadingSpec===false){
        store.commit("isDevMode", true);
        store.commit("reqToken", "");
        store.commit("reqTokenType", "");
        store.commit("reqSendTokenIn", "");
        store.commit("reqHeader", "");
      }



    },

    onExpandAll(val){
      if (this.parsedSpec.tags===undefined){
        return;
      }
      this.parsedSpec.tags.map(function(tag){
          tag.paths.map(function(path){
            path.expanded=val;
            path.expandedAtLeastOnce=true;
          })
      });
    },

    onActivateSecurityScheme(scheme){
      console.log("%o", scheme);
    }
  },

  /*
  // NO ACCESS to 'this'  
  beforeRouteEnter (to, from, next) {

    console.log("inside comp update route: %o", to.param);
    next();
  },
  */  


  beforeRouteUpdate (to, from, next) {
    if(to.path.startsWith("/load") && to.params.specUrl){
      this.authStatus="(Not Authenticated)";
      this.specUrl = to.params.specUrl;
      this.loadSpec(false);
    }
    next();
  },
  

  mounted(){
    if(this.$route.fullPath==="/reload"){
      console.log("in reload");
      this.specUrl = store.state.specUrl;
      store.commit("reqToken", localStorage.getItem("accessToken"));
      store.commit("reqTokenType", localStorage.getItem("tokenType"));
      if (this.specUrl){
        this.authStatus="(OAuth Applied)";
        this.loadSpec(true);
      }
    }
    else if(this.$route.fullPath.startsWith("/load") && this.$route.params.specUrl){
      this.authStatus="(Not Authenticated)";
      this.specUrl = this.$route.params.specUrl;
      this.loadSpec(false);
    }
    else{
      console.log("in else");
      this.authStatus="(Not Authenticated)";
    }
  },

  components: {
    EndPoint,
    MrinLogo,
    SecuritySchemes,
    VueSideoutPanel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";

.sw-side-panel-container{
  margin-top:16px;
  display:flex; 
  flex-direction:column; 
  height:calc(100% - 16px);
}

.sw-app-shell {
  position:fixed;
  top:0;
  height:100vh;
  width:100vw;
  min-width:760px;
  display:flex;
  flex-direction:column;
  align-items: stretch;
  overflow: auto;
  overflow-x:scroll;

    .sw-prod-title{
      font-size:24px; 
      color:$sw-primary-color; 
      margin:2px 8px;
    }
    .sw-doc-info{
      margin:24px 0 16px;
      .sw-doc-title{
        font-size:32px;
        color:$sw-blue-text;
        margin-bottom:5px;
      }
    }

    .sw-tag-title{
      font-size: 18px;
      color: #555;
      margin: 28px 0px 4px;
      text-transform: uppercase;
    }

    .sw-app-header-container{
      position: absolute;
      top:0;
      left:0;
      right:0;
      min-width:750px;
      display:flex;
      flex-direction:column;
      align-items: stretch;
      flex-wrap: nowrap;
      background-color: #333;
      z-index:2000;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.60);
    }
    .sw-page-container{
      margin-top:70px;
      padding:8px 32px 16px 32px;
      overflow:auto;
      overflow-x:scroll;
      display:flex;
      flex:1;
      flex-direction: column;
      height:100%;
    }
}


.sw-spec-url{
  width:260px; margin-right:-1px;
}

@media only screen and (max-width : 999px) {
  .sw-prod-title{
    display:none;
  }
  .sw-spec-url{
    width:150px; margin-right:-1px;
  }
}



</style>
