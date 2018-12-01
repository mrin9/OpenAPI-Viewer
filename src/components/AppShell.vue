<template>
  <div id="sw-app-shell" class="sw-app-shell" >
    <div class="sw-main-container" >
        <div class="sw-app-header-container" ref="headerContainer">
          <mrin-logo style="height:36px;width:36px;margin-left:5px"></mrin-logo>
          <div style="font-size:20px; color:orange; margin:2px 8px"> API Viewer </div>
          <div style="margin: 2px 8px;">
            <input style="width:400px; margin-right:5px" type="text" placeholder="Spec URL" class="sw-medium" v-model="specUrl" @keyup.enter="onExplore">
            <el-button type="primary" size="medium" @click="onExplore">EXPLORE</el-button>
          </div>
          <div style="flex:1"></div>
          <!--
          <app-header :label="$t('m.product_name')"  style="display:inline-block" @explore="onExplore"></app-header>
          -->
          <input style="width:150px; margin-right:5px" type="text" placeholder="Search" class="sw-medium sw-dark" v-model="searchVal" @keyup="onSearchKeyUp">
        </div>
        <div class="sw-page-container" ref="pageContainer">

          <div class="sw-tag-container" v-for="tag in tags" :key="tag.name">
            <div style="font-size:16px;font-weight:bold; color:#ccc; margin:6px 0 12px;"> {{tag.name}}</div>
            <end-point :paths="tag.paths" :filter="filterVal" ></end-point> 
          </div>
          
        </div>
    </div>
  </div>
</template>

<script>
import EndPoint from '@/components/EndPoint';
import {parseSpec, debounce } from  '@/lib/utils';
import MrinLogo from '@/components/Logo';

export default {

  data:function(){
    return{
      specUrl: "https://petstore.swagger.io/v2/swagger.json",
      //specUrl: 'https://raw.githubusercontent.com/APIs-guru/unofficial_openapi_specs/master/github.com/v3/swagger.yaml',
      searchVal:"",
      filterVal:"",  // searchVal is copied into filterVal after a delay to avoid firing filter rapidly
      tags:[]
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
        console.log(tags);
        me.$data.tags = tags;
      })
      .catch(function(err) {
        me.$message.error('Oops, The API Speci invalid.');
        console.error('Onoes! The API is invalid. ' + err.message);
        return false;
      });;
    },

    onSearchKeyUp:debounce(function(e) {
      this.filterVal = this.searchVal;
    }, 500),

    onSearch(){}

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
    padding:0;
    margin: 0;
    height:100%;
    overflow:hidden;
    .sw-app-header-container{
      display:flex;
      width:100%;
      background-color: #333;
      flex-direction:row;
      justify-content: left;
      align-items: center;
      flex-wrap: nowrap;
      overflow: hidden;
      padding:8px;
      position: fixed;
      top:0;
    }
    .sw-page-container{
      margin-top:5px;
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
