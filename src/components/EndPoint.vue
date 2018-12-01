<template>
  <div class="sw-end-point-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(path, index) in filterPaths" :key="index" :name="path.method+path.path" :class="path.method">
        <template slot="title">
          <div :class="'sw-method ' + path.method"> {{path.method}} </div> 
          <div :class="'sw-path ' + (path.depricated?' sw-depricated':'') "> {{path.path}} </div>
          <span style="color:orangered; margin:2px 0 0 5px;" v-if="path.depricated"> Depricated </span>
          <div style="min-width:60px; flex:1"></div>
          <div class="sw-summary in-title"> {{ path.summary || path.description}} </div>
        </template>

        <!-- Render the body only when it is expanded, that way it will do lazy rendering -->
        <template v-if="activeNames.indexOf(path.method+path.path) !== -1">
          <div class="sw-summary" style="max-height:reset">
            <div class="sw-title">{{ path.summary || path.description }} </div>
            <div style="margin-left:5px">{{ path.description}}</div>
          </div>  
          <div :style="'display:flex; margin-top:16px; flex-direction:'+layout ">
            <request-parameters class="sw-request" :parameters="path.parameters" :consumes="path.consumes" ></request-parameters>
            <response-types :responses="path.responses" :produces="path.produces" class="sw-response"></response-types>
          </div>

         </template> 
      </el-collapse-item>
    </el-collapse>
  </div>  
</template>

<script>
//import RequestParameters from '@/components/RequestParameters';
//import ResponseTypes from '@/components/ResponseTypes';
import { Multipane, MultipaneResizer } from 'vue-multipane';

export default {
  props: {
    paths: {
      type: Array,
      required: true,
      default: function () { return [] }
    },
    filter:{
      type: String,
      required: false,
      default:""
    }
  },
  watch: {
    // whenever filter(search box) changes, this function will run
    filter: function (newFilter, oldFilter) {
      if (newFilter){
        this.filterPaths = this.paths.filter(v => v.path.includes(newFilter));
      }
      else{
         this.filterPaths = this.paths.slice();
      }
    }
  },
  data:function(){
    return{
      layout:"column",
      filterPaths:this.paths.slice(),
      activeNames:[]
    }
  },

  methods:{

  },
  components:{
    // Lazy load the component
    Multipane, 
    MultipaneResizer,
    RequestParameters : () => import("@/components/RequestParameters"),
    ResponseTypes: () => import("@/components/ResponseTypes")
    //RequestParameters
    //ResponseTypes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";
.sw-path{
  font-family: monospace;
  display:block;
}
// Hide the summary when expanded and show in details section
.el-collapse-item__header.is-active{
  .sw-summary.in-title {  
    visibility: hidden;
  }
}
.el-collapse-item__header{
  .sw-summary{
    max-height: 45px;
  }
}
.el-collapse-item.is-active{
  &.delete{ 
    border: 1px solid $sw-red; 
    border-left-width: 3px;
  }
  &.put{ 
    border: 1px solid $sw-orange; 
    border-left-width: 3px;  
  }
  &.post{ 
    border: 1px solid $sw-info; border-left-width: 3px;
    border-left-width: 3px;  
  }
  &.get{ 
    border: 1px solid $sw-green; 
    border-left-width: 3px;  
  }
  
}

.sw-title{
  font-size:20px;
  margin:0 200px 0 0;
  padding:5px;
  white-space:nowrap;
  color:#333;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sw-summary{
  line-height: 15px;
  color:gray;
  margin:0 10px 0 0;
  font-weight:400;
  //max-height: 45px;
  overflow: hidden;
}
.sw-depricated{
  text-decoration: line-through $sw-red;
}

.sw-method{
  padding:2px 5px;
  margin:2px 5px;
  vertical-align: middle;
  height: 24px;
  line-height: 26px;
  min-width: 48px;
  border-radius: 2px;
  display:inline-block;
  font-size:12px;
  text-align: center;
  font-weight: bold;
  text-transform:uppercase;
  &.delete{ background-color: $sw-red; color:#efefef}
  &.put{ background-color: $sw-orange; }
  &.post{ background-color: $sw-info; }
  &.get{ background-color: $sw-green; }
}

.sw-request{
  //border:1px solid #ccc;
  flex:1;
  margin:5px;
  padding:5px;
  border-radius: 2px;
}
.sw-response{
  //border:1px solid #ccc;
  flex:1;
  margin:5px;
  padding:5px;
  border-radius: 2px;
}

</style>
