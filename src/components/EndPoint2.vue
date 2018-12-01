<template>

    <div>
      <div :class="'sw-collapse-wrapper ' + path.method" v-for="(path, index) in paths" v-if="path.show" :key="index">

        <!-- Collapse Head -->
        <div :class="'sw-collapse-header ' + path.method" @click="path.expanded = !path.expanded" >
          <div :class="'sw-method ' + path.method"> {{path.method}} </div> 
          <div :class="'sw-path ' + (path.depricated?' sw-depricated':'') "> {{path.path}} </div>
          <span style="color:orangered; margin:2px 0 0 5px;" v-if="path.depricated"> Depricated </span>
          <div style="min-width:60px; flex:1"></div>
          <div class="sw-end-point-descr"> {{ path.summary }} </div>
        </div>

        <!-- Collapse Body -->
        <div v-if="path.expanded" :class="'sw-collapse-body '+path.method">
          <div class="sw-end-point-summary">
            <div class="sw-end-point-title">{{path.summary}} </div>
            <div class="sw-end-point-descr" v-if="path.summary !== path.description">{{path.description}}</div>
          </div>  
          <div :style="'display:flex; margin-top:16px; flex-direction:'+layout ">
            <request-parameters class="sw-request" :parameters="path.parameters" :consumes="path.consumes" ></request-parameters>
            <response-types :responses="path.responses" :produces="path.produces" class="sw-response"></response-types>
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
  mounted(){

    let me = this;
    // If Path summary is missing, create it from the descripttion
    /*
    this.paths.map(function(path){
      if (!path.summary && path.description){
        if (path.description.length > 100){
          let charIndex = -1;
          charIndex = path.description.indexOf("\n");
          if (charIndex === -1 || charIndex > 100){
            charIndex = path.description.indexOf(". ");
          }
          if (charIndex === -1 || charIndex > 100){
            charIndex = path.description.indexOf(".");
          }

          if (charIndex === -1 || charIndex > 100){
            path.summary = path.description;
          }
          else{
            path.summary = path.description.substr(0, charIndex);
          }
        }
        else{
          path.summary = path.description;
        }
      }
    });
    */
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

.sw-collapse-wrapper {
  margin:8px 0;
  &.delete{ 
    border: 1px solid $sw-red; 
    border-left-width: 5px;
  }
  &.put{ 
    border: 1px solid $sw-orange; 
    border-left-width: 5px;  
  }
  &.post{ 
    border: 1px solid $sw-info; border-left-width: 3px;
    border-left-width: 5px;  
  }
  &.get{ 
    border: 1px solid $sw-green; 
    border-left-width: 5px;  
  }
}

.sw-collapse-header{
  display:flex;
  padding:8px 16px;
  align-items: baseline;
  cursor: pointer;
  &.delete{ 
    background-color: lighten($sw-red, 57%); 
    color:$sw-red;
  }
  &.put{ 
    background-color: lighten($sw-orange, 45%); 
    color:darken($sw-orange,15%);
  }
  &.post{ 
    background-color: lighten($sw-info, 37%); 
    color:darken($sw-info,15%);
  }
  &.get{ 
    background-color: lighten($sw-green, 57%); 
     color:darken($sw-green,15%);
  }
}
.sw-collapse-body{
  padding:16px 8px;
  &.delete{ border-top: 1px solid $sw-red;}
  &.put{ border-top: 1px solid $sw-orange;}
  &.post{border-top: 1px solid $sw-info;}
  &.get{ border-top: 1px solid $sw-green;}

  
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
  &.delete{ background-color: $sw-red; color:#efefef;}
  &.put{ background-color: $sw-orange; color:#333;}
  &.post{ background-color: $sw-info; color:#333;}
  &.get{ background-color: $sw-green; color:#333;}
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
