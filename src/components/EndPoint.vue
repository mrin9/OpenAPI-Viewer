<template>

    <div>
      <div 
        v-for= "(fullPath, index) in paths" 
        v-if = "fullPath.show" :key="index"
        :class="'sw-endpoint-wrapper ' + fullPath.method + ' ' + (fullPath.expanded?'sw-expanded':'sw-collapsed') " 
      >

        <!-- EndPoint Head -->
        <div 
          :class="'sw-endpoint-head ' + fullPath.method + ' ' +(fullPath.expanded?'sw-expanded':'sw-collapsed') " 
          @click="fullPath.expanded = !fullPath.expanded" 
        >
          <div :class="'sw-method ' + fullPath.method"> {{fullPath.method}} </div> 
          <div :class="'sw-path ' + (fullPath.depricated?' sw-depricated':'') "> {{fullPath.path}} </div>
          <span style="color:orangered; margin:2px 0 0 5px;" v-if="fullPath.depricated"> Depricated </span>
          <div style="min-width:60px; flex:1"></div>
          <div class="sw-end-point-descr"> {{ fullPath.summary }} </div>
        </div>

        <!-- EndPoint Body -->
        <div v-if="fullPath.expanded" :class="'sw-endpoint-body '+fullPath.method">
          <div class="sw-end-point-summary">
            <div class="sw-end-point-title">{{fullPath.summary}} </div>
            <div class="sw-end-point-descr" v-if="fullPath.summary !== fullPath.description">{{fullPath.description}}</div>
          </div>  
          <div :style="'display:flex; margin-top:16px; flex-direction:'+layout ">
            <!--
            <request-parameters class="sw-request"  :method="path.method" :url="path.path" :common-parameters="path.parameters" :parameters="path.parameters" :consumes="path.consumes"></request-parameters>
            -->
            <response-types class="sw-response" :responses="fullPath.responses" ></response-types>
          </div>
        </div>
      </div>  
    </div>

</template>

<script>

export default {
  props: {
    paths: {
      type: Array,
      required: true,
      default: function () { return [] }
    }
  },
  data:function(){
    return{
      layout:"row",
      activeNames:[]
    }
  },
  
  components:{
    // Lazy load the component
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

.sw-endpoint-wrapper {
  //margin:8px 0;
  border: 1px solid transparent; 
  border-left-width: 5px;
  border-top-color: #eee;

  &.put:hover,
  &.put.sw-expanded{
    border: 1px solid $sw-orange; 
    border-left-width: 5px;
  }

  &.post:hover,
  &.post.sw-expanded{
    border: 1px solid $sw-info; 
    border-left-width: 5px;
  }
 
  &.get:hover,
  &.get.sw-expanded{
    border: 1px solid $sw-green; 
    border-left-width: 5px;
  }

  &.delete:hover,
  &.delete.sw-expanded{
    border: 1px solid $sw-red; 
    border-left-width: 5px;
  }

}

.sw-endpoint-head {
  display:flex;
  padding:8px 16px;
  align-items: baseline;
  cursor: pointer;
  border-left:5px solid transparent;

  &.delete.sw-expanded{ 
    background-color: lighten($sw-red, 57%); 
  }
  &.put.sw-expanded{ 
    background-color: lighten($sw-orange, 45%); 
  }
  &.post.sw-expanded{ 
    background-color: lighten($sw-info, 37%); 
  }
  &.get.sw-expanded{
    background-color: lighten($sw-green, 57%); 
  }
}

.sw-endpoint-body {
  padding:16px 8px;
  &.delete{ border-top: 1px solid $sw-red;}
  &.put{ border-top: 1px solid $sw-orange;}
  &.post{border-top: 1px solid $sw-info;  }
  &.get{ border-top: 1px solid $sw-green; }
}

.sw-path{
  font-family: monospace;
  display: flex;
  align-items: center;
}

.sw-end-point-descr{
  font-size: 12px;
  font-weight:400;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.sw-end-point-summary{
  padding:8px;
  .sw-end-point-title{
    font-size:20px;
    white-space:nowrap;
    color:#333;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sw-end-point-descr{
    margin-top:5px;
    color:gray;
  }

}

.sw-depricated{
  text-decoration: line-through $sw-red;
}

.sw-method{
  padding:2px 5px;
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
  margin-right:5px;
  &.delete{ 
    border: 2px solid $sw-red; 
  }
  &.put{ 
    border: 2px solid $sw-orange; 
    color:#333;
  }
  &.post{ 
    border: 2px solid $sw-info; 
    color:#333;
  }
  &.get{ 
    border: 2px solid $sw-green; 
    color:#333;
  }
}

.sw-response,
.sw-request{
  flex:1;
  margin:5px;
  padding:5px;
  border-radius: 2px;
}

</style>
