<template>

    <div>
      <div :class="'sw-collapse-wrapper ' + path.method + ' ' +(path.expanded?'sw-expanded':'sw-collapsed') " v-for="(path, index) in paths" v-if="path.show" :key="index">

        <!-- Collapse Head -->
        <div :class="'sw-collapse-header ' + path.method + ' ' +(path.expanded?'sw-expanded':'sw-collapsed') " @click="path.expanded = !path.expanded" >
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
            <request-parameters class="sw-request"  :method="path.method" :url="path.path" :parameters="path.parameters" :consumes="path.consumes"></request-parameters>
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
  //margin:8px 0;
  border: 1px solid transparent; 
  border-left-width: 5px;
  border-top-color: #eee;
  &.delete{ 
    &.sw-expanded{
      border: 1px solid $sw-red; 
      border-left-width: 5px;
    }
  }
  &.put{ 
    &.sw-expanded{
      border: 1px solid $sw-orange; 
      border-left-width: 5px;
    }

  }
  &.post{ 
    &.sw-expanded{
      border: 1px solid $sw-info; 
      border-left-width: 5px;
    }
 
  }
  &.get{ 
    &.sw-expanded{
      border: 1px solid $sw-green; 
      border-left-width: 5px;
    }

  }
}

.sw-collapse-header {
  display:flex;
  padding:8px 16px;
  align-items: baseline;
  cursor: pointer;
  border-left:5px solid transparent;

  &.sw-collapsed{
    border-left:5px solid transparent;
  }

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


  &.delete:hover{ 
    background-color: lighten($sw-red, 57%); 
    border-left:5px solid $sw-red;
    &.sw-expanded{
      border-left:5px solid transparent;
    }
    &.sw-collapsed{
      border-left:5px solid $sw-red;
    }
  }

  &.put:hover{ 
    background-color: lighten($sw-orange, 45%); 
    border-left:5px solid $sw-orange;
    &.sw-expanded{
      border-left:5px solid transparent;
    }
    &.sw-collapsed{
      border-left:5px solid $sw-orange;
    }
  }

  &.post:hover{ 
    background-color: lighten($sw-info, 37%); 
    border-left:5px solid $sw-info;
    &.sw-expanded{
      border-left:5px solid transparent;
    }
    &.sw-collapsed{
      border-left:5px solid $sw-info;
    }
  }
  &.get:hover{
    background-color: lighten($sw-green, 57%); 
    &.sw-expanded{
      border-left:5px solid transparent;
    }
    &.sw-collapsed{
      border-left:5px solid $sw-green;
    }
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
  margin-right:5px;
  &.delete{ 
    //background-color: $sw-red; 
    border: 2px solid $sw-red; 
    //color:#efefef;
  }
  &.put{ 
    //background-color: $sw-orange; 
    border: 2px solid $sw-orange; 
    color:#333;
  }
  &.post{ 
    //background-color: $sw-info; 
    border: 2px solid $sw-info; 
    color:#333;
  }
  &.get{ 
    //background-color: $sw-green; 
    border: 2px solid $sw-green; 
    color:#333;
  }
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
