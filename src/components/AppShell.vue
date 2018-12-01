<template>
  <div id="sw-app-shell" class="sw-app-shell" >
    <div class="sw-main-container" >
        <div class="sw-app-header-container" ref="headerContainer">
          <mrin-logo style="height:36px;width:36px;margin-left:5px"></mrin-logo>
          <div style="font-size:20px; color:orange; margin:2px 8px"> API Viewer </div>
          <div style="margin: 2px 8px;">
            <input ref='specUrl' style="width:400px; margin-right:5px" type="text" placeholder="Spec URL" class="sw-medium" v-model="specUrl" @keyup.enter="onExplore">
            <el-button type="primary" size="medium" @click="onExplore">EXPLORE</el-button>
          </div>
          <div style="flex:1"></div>
          <input style="width:150px; margin-right:20px" type="text" placeholder="Search" class="sw-medium sw-dark" v-model="searchVal" @keyup="onSearchKeyUp">
        </div>
        <div class="sw-page-container" ref="pageContainer">

          <div class="sw-tag-container" v-for="tag in tags" v-if="tag.show" :key="tag.name">
            <div style="font-size:16px;font-weight:bold; color:#ccc; margin:6px 0 12px;">{{tag.name}}</div>
            <end-point2 :paths="tag.paths"></end-point2> 
          </div>
          
        </div>
    </div>
  </div>
</template>

<script>
import EndPoint from '@/components/EndPoint';
import EndPoint2 from '@/components/EndPoint2';

import {parseSpec, debounce } from  '@/lib/utils';
import MrinLogo from '@/components/Logo';

export default {

  data:function(){
    return{
      //specUrl: "https://petstore.swagger.io/v2/swagger.json",
      specUrl: 'https://raw.githubusercontent.com/APIs-guru/unofficial_openapi_specs/master/github.com/v3/swagger.yaml',
      searchVal:"",
      tagContainers:{}, // Each key is a container(tag-name) and the valu in it decides to show or hide a container 
      tags:[],
      group:{
        name:"Head",
        body:"Body",
        open:true
      }
    }
  },
  methods:{
    pageScroll:function(){
      if (this.$refs.pageContainer.scrollTop > 16){
        this.$refs.headerContainer.classList.add("shadow")
      }
      else{
        this.$refs.headerContainer.classList.remove("shadow")
      }
    },

    onExplore(){
      let me = this;
      parseSpec(me.specUrl).then(function(tags){
        me.searchVal="";
        me.tags = tags;
      })
      .catch(function(err) {
        me.$message.error('Oops, The API Speci invalid.');
        console.error('Onoes! The API is invalid. ' + err.message);
        return false;
      });


    },

    onSearchKeyUp:debounce(function(e) {
      var me = this;
      this.tags.map(function(v){
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
    EndPoint2,
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
    padding:0;
    margin: 0;
    height:100%;
    overflow:hidden;
    .sw-app-header-container{
      position: fixed;
      top:0;
      display:flex;
      z-index:2000;
      width:100%;
      background-color: #333;
      flex-direction:row;
      justify-content: left;
      align-items: center;
      flex-wrap: nowrap;
      overflow: hidden;
      padding:8px;
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

    .sw-tag-container{
      border:solid 1px lightgray;
      border-radius: 2px;
      padding:8px;
      margin:16px 8px;
      background-color: #fff;
    }

    .shadow {
      box-shadow: 0 5px 4px -4px #ccc
    }
  }

}

</style>
