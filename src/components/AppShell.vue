<template>
  <div id="sw-app-shell" class="sw-app-shell" >
    <div class="sw-main-container" >
        <div class="sw-app-header-container" ref="headerContainer">
          
          <div class="sw-row" style="padding:16px 4px 8px 4px">
            <mrin-logo style="height:36px;width:36px;margin-left:5px"></mrin-logo>
            <div style="font-size:20px; color:orange; margin:2px 8px"> API Viewer </div>
            <div style="margin: 2px 8px;">
              <input ref='specUrl' style="width:400px; margin-right:5px" type="text" placeholder="Spec URL" class="sw-medium" v-model="specUrl" @keyup.enter="onExplore">
              <el-button type="primary" size="medium" @click="onExplore">EXPLORE</el-button>
            </div>
            <div style="flex:1"></div>
            <input style="width:150px; margin-right:20px" type="text" placeholder="Search" class="sw-medium sw-dark" v-model="searchVal" @keyup="onSearchKeyUp">
          </div>
          <div class="sw-row" style="padding:8px 4px; background-color:#444">
            <el-switch v-model="isDevMode" active-text="Developer Mode" class="sw-dark"> </el-switch>
          </div>  


        </div>


        <div class="sw-page-container" ref="pageContainer">

          <div class="sw-tag-container" v-for="tag in parsedSpec.tags" v-if="tag.show" :key="tag.name">
            <div style="font-size:16px;font-weight:bold; color:#ccc; margin:16px 0 4px 0;">{{tag.name}}</div>
            <end-point :paths="tag.paths"></end-point> 
          </div>
          
        </div>
    </div>
  </div>
</template>

<script>
import EndPoint from '@/components/EndPoint';
import {parseSpec, debounce } from  '@/lib/utils';
import MrinLogo from '@/components/Logo';
import store from '@/store';

export default {

  data:function(){
    return{
      //specUrl: "https://petstore.swagger.io/v2/swagger.json",
      specUrl   : "http://10.21.83.83:8080/api/swagger.json",
      //specUrl  : "https://raw.githubusercontent.com/APIs-guru/unofficial_openapi_specs/master/github.com/v3/swagger.yaml",
      searchVal :"",
      tagContainers:{}, // Each key is a container(tag-name) and the valu in it decides to show or hide a container 
      parsedSpec:{},
      isDevMode :true
    }
  },
  methods:{

    onExplore(){
      let me = this;
      parseSpec(me.specUrl).then(function(spec){
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

      })
      .catch(function(err) {
        me.$message.error('Oops, The API Speci invalid.');
        console.error('Onoes! The API is invalid. ' + err.message);
        return false;
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

    onSearch(){}

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
    background:$sw-light-bg1;
    flex-direction:column;
    align-items: stretch;
    padding:0;
    margin: 0;
    height:100%;
    overflow:hidden;
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
      margin-top:45px;
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
