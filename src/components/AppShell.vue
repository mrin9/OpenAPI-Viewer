<template>
  <div id="sw-app-shell" class="sw-app-shell" >
    <div class="sw-main-container" v-loading.fullscreen.lock="loading" >
        <div class="sw-app-header-container" ref="headerContainer">
          
          <div class="sw-row" style="padding:16px 4px 8px 4px">
            <div style="width:200px; display:flex">
              <mrin-logo style="height:36px;width:36px;margin-left:5px"></mrin-logo>
              <div style="font-size:20px; color:orange; margin:2px 8px"> API Viewer </div>
            </div>  
            <div style="margin: 2px 8px;">
              <input ref='specUrl' style="width:400px; margin-right:5px" type="text" placeholder="Spec URL" class="sw-dark sw-medium" v-model="specUrl" @keyup.enter="onExplore">
              <el-button style="width:105px" type="primary" size="medium" @click="onExplore">EXPLORE</el-button>
            </div>
            <div style="flex:1"></div>
            <input style="width:150px; margin-right:20px" type="text" placeholder="Search" class="sw-medium sw-dark" v-model="searchVal" @keyup="onSearchKeyUp">
          </div>


          <div v-if="isSpecLoaded" class="sw-row" style="min-height:26px; padding:8px 4px; background-color:#444">
            <el-switch v-model="isDevMode" 
              active-text="Developer Mode"  
              style="width:200px; margin:0 3px;" 
              class="sw-dark"
              @change= "$store.commit('isDevMode', isDevMode)"
            > 
            </el-switch>
              
            <el-select v-if="isDevMode" 
              v-model="selectedApiServer" 
              size="medium" 
              placeholder="Select API Server" 
              style="width:400px;margin-right:5px" 
              class="sw-dark" 
              popper-class="sw-dark sw-double-height-options"
              @change= "$store.commit('selectedApiServer', selectedApiServer)"
            >
              <el-option v-for="item in parsedSpec.servers" :key="item.url" :label="item.url" :value="item.url" >
                <div style="display:flex; flex-direction:column">
                  <span>{{ item.url }}</span>
                  <span style="color: #8492a6; font-size:12px; line-height:12px;">{{ item.description }} </span>
                </div>  
              </el-option>
            </el-select>
            <el-button v-if="isDevMode" style="width:105px" type="primary" size="medium" @click="onExplore">AUTHORIZE</el-button>
            <div style="flex:1"></div>
            <el-switch 
              v-model="expandAll" 
              active-text="Expand All"  
              style="width:200px; margin:0 3px;" 
              class="sw-dark"
              @change= "onExpandAll"
            > 
            </el-switch>
          </div>  
        </div>


        <div class="sw-page-container" ref="pageContainer">
          <div class="sw-tag-container" v-for="tag in parsedSpec.tags" v-show="tag.show" :key="tag.name">
            <div class="sw-tag-title">{{tag.name}}</div>
            <end-point :paths="tag.paths" :parameters="tag.parameters" ></end-point> 
          </div>
          
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

export default {

  data:function(){
    return{
      //specUrl: "https://petstore.swagger.io/v2/swagger.json",
      //specUrl   : "http://10.21.83.83:8080/api/swagger.json",
      specUrl  : "https://raw.githubusercontent.com/APIs-guru/unofficial_openapi_specs/master/github.com/v3/swagger.yaml",
      //specUrl: "https://fakerestapi.azurewebsites.net/swagger/docs/v1",
      //specUrl: "https://api.apis.guru/v2/specs/twilio.com/2010-04-01/swagger.json",  //xml responses

      searchVal :"",
      parsedSpec:{},
      isDevMode :false,
      selectedApiServer:"",
      isSpecLoaded:false,
      expandAll:false,
      loading:false,
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

          if ( (spec.server && spec.server.length == 0 ) || (!spec.server)   ){
            serverUrl = me.specUrl.substring(0, me.specUrl.indexOf("/", me.specUrl.indexOf("//")+2));

            if (spec.basePath){
              serverUrl = serverUrl +"/" + spec.basePath.replace(/^\/|\/$/g, '');
              me.parsedSpec.servers = [{ 
                url: serverUrl ,
                description:"Auto generated Server URI"
              }];
            }
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
      console.log("Expanded", val);
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
  height:100%;
  display:flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content:stretch;
  .sw-main-container{
    display:flex;
    flex:1;
    order:1;
    //background:$sw-light-bg1;
    flex-direction:column;
    align-items: stretch;
    padding:0;
    margin: 0;
    height:100%;
    overflow:hidden;

    .sw-tag-title{
      font-size: 18px;
      color: #555;
      margin: 28px 0px 4px;
      text-transform: uppercase;
    }

    .sw-app-header-container{
      position: fixed;
      top:0;
      width:100%;
      display:flex;
      flex-direction:column;
      align-items: stretch;
      flex-wrap: nowrap;
      background-color: #333;
      overflow: hidden;
      z-index:2000;
    }
    .sw-page-container{
      margin-top:90px;
      padding:8px 16px 16px 16px;
      overflow:auto;
      display:flex;
      flex:1;
      flex-direction: column;
      height:100%;
    }
    .shadow {
      box-shadow: 0 5px 4px -4px #ccc
    }
  }

}

</style>
