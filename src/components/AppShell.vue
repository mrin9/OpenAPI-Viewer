<template>
  <div id="sw-app-shell"  v-loading.fullscreen.lock="loading" class="sw-app-shell" >
      <div class="sw-app-header-container">
        
        <div class="sw-row" style="padding:8px 4px 8px 4px;min-height:54px">
          <div style="display:flex; align-items: center;">
            <mrin-logo style="height:36px;width:36px;margin-left:5px"></mrin-logo>
            <div class="sw-prod-title"> MrinDoc </div>
          </div>  
          <div style="margin: 0px 8px;">
            <input ref="specUrl" style="width:260px; margin-right:-1px" type="text" placeholder="Spec URL" class="sw-dark sw-medium" v-model="specUrl" @keyup.enter="onExplore">
            <button class="sw-btn sw-primary"  style="border-radius: 0 2px 2px 0; padding-left:5px; padding-right:5px;" @click="onExplore">OPEN</button>
          </div>
          <div style="display:flex; flex-direction:column; margin-right:8px; align-items:flex-end;">
            <input style="width:100px;" type="text" placeholder="Search" class="sw-medium sw-dark" v-model="searchVal" @keyup="onSearchKeyUp">
          </div>  
          <div style="flex:1"></div>  
          <div v-if="isDevMode" style="display:flex; width:200px; flex-direction:column; margin-right:8px; align-items:stretch;">
            <el-select 
              v-model="selectedApiServer" 
              size="medium" 
              placeholder="Select API Server" 
              class="sw-dark" 
              popper-class="sw-dark"
              @change= "$store.commit('selectedApiServer', selectedApiServer)"
            >
            <!--
              <el-option v-for="item in parsedSpec.servers" :key="item.url" :label="item.url" :value="item.url" >
                <div style="display:flex; flex-direction:column">
                  <span>{{ item.url }}</span>
                  <span style="color: #8492a6; font-size:12px; line-height:12px;">{{ item.description }} </span>
                </div>  
              </el-option>
            -->
              <el-option v-for="item in parsedSpec.servers" :key="item.url" :label="item.url" :value="item.url"></el-option>
            </el-select>
            <div style="display:flex;margin-top:2px;">
              <input style="margin-right:-1px" type="text" placeholder="Token" class="sw-dark sw-medium" @keyup.enter="onExplore">
              <button class="sw-btn sw-primary"  style="border-radius: 0 2px 2px 0; padding-left:5px; padding-right:5px;">SAVE</button>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; margin-right:8px; align-items:flex-start;">
            <el-switch 
              v-model="expandAll" 
              active-text="Expand All"  
              style="margin-bottom:2px;" 
              class="sw-dark"
              @change= "onExpandAll"
            > 
            </el-switch>
            <el-switch v-model="isDevMode" 
              active-text="Developer Mode"  
              class="sw-dark"
              @change= "$store.commit('isDevMode', isDevMode)"
            > 
            </el-switch>
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
        <div  v-if="parsedSpec.securitySchemes">
          <div class="sw-doc-title sw-blue-bold-small-text"> Security</div>
          <table style="margin-top:5px;" class="sw-table">
            <tr>
              <th style="width:70px"> Type     </th>  
              <th style="width:400px"> Authentication Procedure </th>  
              <th> Description </th>  
            </tr>  
            <tr v-for="(scheme,key) in parsedSpec.securitySchemes" :key="key">
              <td> {{scheme.type}}  </td>  
              <!-- If scheme is apiKey -->
              <td v-if="scheme.type==='apiKey'">
                Send <code>'{{scheme.name}}'</code> key in <b>{{scheme.in}}</b> 
              </td>  
              <!-- If scheme is oauth2 -->
              <td v-else-if="scheme.type==='oauth2'"> 
                <span v-for="(flow,flowName) in scheme.flows" :key="flowName">
                  <div v-if="flow.authorizationUrl"> <b>Auth URL:</b> {{flow.authorizationUrl}}</div>
                  <div v-if="flow.tokenUrl"> <b>Token URL: </b>{{flow.tokenUrl}}</div>
                  <div v-if="flow.refreshUrl"> <b>Refresh URL: </b>{{flow.refreshUrl}}</div>
                  <template v-if="flow.scopes">
                    <b>Scopes:</b>
                    <code v-for="(scope, scopeName) in flow.scopes" :key="scopeName"> 
                      {{scopeName}} - '{{scope}}', 
                    </code>
                  </template>  
                </span>  
              </td>  
              <td v-else> 
                
              </td>  

              <td class="sw-markdown-block"> 
                <span v-html="$marked(scheme.description?scheme.description:'')">  </span>   
              </td>  
            </tr>  

          </table>

        </div>



        <div class="sw-tag-container" v-for="tag in parsedSpec.tags" v-show="tag.show" :key="tag.name">
          <div class="sw-tag-title">{{tag.name}}</div>
          <span v-if="tag.description" class="sw-gray-small-text"> {{tag.description}} </span>
          <end-point :paths="tag.paths" :parameters="tag.parameters" ></end-point> 
        </div>
        
      </div>
  </div>
</template>

<script>
import EndPoint from '@/components/EndPoint';
import {parseSpec, debounce } from  '@/lib/utils';
import ProcessSpec from  '@/lib/parserUtils';
import MrinLogo from '@/components/Logo';
import store from '@/store';
import { Loading } from 'element-ui';
import marked from 'marked';

export default {

  data:function(){
    return{
      //specUrl:"http://developer.twinehealth.com/swagger.json",
      //specUrl: "https://petstore.swagger.io/v2/swagger.json",
      //specUrl: "http://10.21.83.83:8080/api/swagger.json",
      specUrl: "https://raw.githubusercontent.com/APIs-guru/unofficial_openapi_specs/master/github.com/v3/swagger.yaml",
      //specUrl: "https://fakerestapi.azurewebsites.net/swagger/docs/v1",
      //specUrl: "https://api.apis.guru/v2/specs/twilio.com/2010-04-01/swagger.json",  //xml responses
      //specUrl:"https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/uspto.yaml", // OpenAPI 3 with examples
      //specUrl:"https://api.apis.guru/v2/specs/stackexchange.com/2.0/swagger.json",

      searchVal :"",
      parsedSpec:{},
      isDevMode :false,
      selectedApiServer:"",
      isSpecLoaded:false,
      expandAll:false,
      loading:false,
      docDescription:""
    }
  },
  methods:{

    onExplore(){
      let me = this;
      me.loading=true;
      me.$nextTick(function(){
        ProcessSpec(me.specUrl).then(function( spec ){
          let serverUrl="";
          me.searchVal="";
          me.parsedSpec = spec;
          if (spec.info.description){
            me.docDescription = marked(spec.info.description);
          }
          if ( (spec.server && spec.server.length == 0 ) || (!spec.server)   ){
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
          store.commit("isDevMode", true);
          store.commit("selectedApiServer", spec.servers[0].url);
          setTimeout(()=>me.loading=false,(spec.totalPathCount*8) )

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

    onExpandAll( val){
      if (this.parsedSpec.tags===undefined){
        return;
      }
      this.parsedSpec.tags.map(function(tag){
          tag.paths.map(function(path){
            path.expanded=val;
          })
      });
      
    }

  },
  mounted(){
    this.$refs.specUrl.focus();
  },

  components: {
    EndPoint,
    MrinLogo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";

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
    }
    .sw-page-container{
      margin-top:70px;
      padding:8px 16px 16px 16px;
      overflow:auto;
      display:flex;
      flex:1;
      flex-direction: column;
      height:100%;
    }
}

@media only screen and (max-width : 999px) {
  .sw-prod-title{
    display:none;
  }
}



</style>
