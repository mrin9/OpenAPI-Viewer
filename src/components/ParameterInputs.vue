<template>
  <table style="width: 100%" class="sw-table">


    <tr v-for="(param, index) in parameters" :key="index">

      <!-- Field Name Column-->  
      <td style="min-width:80px">
        <div class="sw-param-name"><span v-if="param.required"  class="sw-param-req">*</span>{{param.name}}</div>
        <div class="sw-param-type" v-html="getTypeInfoHtml(param.schema)"></div>
      </td>  

      <!-- Field Input Column-->  
      <td style="min-width:100px">

        <!-- if Type is enum then show a select -->  
        <el-select v-if="param.schema.type==='string' && param.schema.enum " 
          v-model="param.example" 
          style="width:100%" 
          popper-class="sw-small-height-options"
          size="medium" 
        >
          <el-option v-for="item in param.schema.enum" :key="item" :label="item.toString()" :value="item"></el-option>
        </el-select>

        <!-- if Type is Array then show a select if array items are of enum type (with multiselect options)--> 
        <template v-else-if="param.schema.type==='array' && param.schema.items " >
          <el-select v-if="param.schema.items.type==='string' && param.schema.items.enum" 
            v-model="param.example" 
            multiple
            style="width:100%" 
            popper-class="sw-small-height-options"
            size="medium" 
          >
            <el-option v-for="item in param.schema.items.enum" :key="item" :label="item.toString()" :value="item"></el-option>
          </el-select>
          <textarea v-else class="sw-mono-font" v-model="param.example" style="min-height:42px"/>
        </template> 
        
        <!-- For all other types, show a textbox-->  
        <input v-else type="text" class="sw-medium" style="width:100%" v-model="param.example">
      </td>  

      <!-- Field Desciption Column-->  
      <td>
        <div class="sw-markdown-block" style="word-break: break-word;">
          <span v-html="$marked(param.description?param.description:'')">  </span>   
          <span v-if="param.schema.enum"> 
            {{ param.schema.pattern? "Pattern: " + param.schema.pattern : "" }} 
          </span>
        </div>
      </td>  
    </tr>  
  </table>
</template>

<script>
  import {getTypeInfo} from '@/lib/utils';

  export default {
    props: {
      parameters : {type:Array, default:()=>[]},
      showInputs : {type:Boolean, default:true},
    },
    data(){
      return{
        parametersLocal: this.parameters
      }
    },
    methods:{
      getTypeInfoHtml(schema){
        return getTypeInfo(schema);
      }
      
    }

  }
</script>

<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";

  .sw-param-req{
    color:orangered;
    font-size: 16px;
    vertical-align: middle;
  }
  .sw-param-name{
    font-family: monospace;
    margin:0; 
    color:#333;
    text-align:right;
    line-height: 12px;
  }
  .sw-param-type{
    margin:0; 
    color:#aaa;
    text-align:right;
    line-height: 12px;
  }
  
</style>

