<template>

  <div > 
    <div> REQUEST</div>

    <!-- Path Params -->
    <div v-if="pathParams.length>0">
      <div class="sw-param-type-title"> PATH PARAMETERS</div>
      <parameter-inputs :parameters="pathParams"></parameter-inputs>
    </div>

    <!-- Query Params -->
    <div v-if="queryParams.length>0" >
      <div class="sw-param-type-title"> QUERY PARAMETERS</div>
      <parameter-inputs :parameters="queryParams"></parameter-inputs>
    </div>

    <!-- Form Params -->
    <div v-if="formParams.length>0" >
      <div class="sw-param-type-title"> FORM DATA PARAMETERS</div>
      <parameter-inputs :parameters="formParams"></parameter-inputs>
    </div>

    <!-- Body Param -->
    <div style="min-height:300px" v-if="bodyParams.length > 0 ">
      <div class="sw-param-type-title"> BODY PARAMETERS</div>

      <el-tabs v-model="activeTab" style="border:1px solid #ccc;padding:8px;">
        <el-tab-pane label="Example" name="bodyParamExample">
          <el-input class="sw-model-example-textarea" type="textarea" v-model="bodyParamText" :autosize="{ minRows: 12}"></el-input>
        </el-tab-pane>
        <el-tab-pane label="Model" name="bodyParamModel"> Model
          
          <el-tree :data="bodyParamData" :props="defaultTreeProps" :default-expand-all="true">
            <span class="sw-tree-node" slot-scope="{ node, data }">
              <span class="sw-fieldname">{{ node.label.label }}</span>
              <span class="sw-datatype">: {{ node.label.type }}</span>
              <span style="flex:1"></span>
              <span > {{ node.label.descr }}</span>
            </span>
          </el-tree>

        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- Header Params -->
    <div v-if="headerParams.length>0">
      <div class="sw-param-type-title"> HEADER PARAMETERS</div>
      <parameter-inputs :parameters="headerParams"></parameter-inputs>
    </div>

  </div>


</template>

<script>
  import { schemaToElTree, schemaToObj} from '@/lib/utils';
  import ParameterInputs from '@/components/ParameterInputs';

  export default {
    props: {
      parameters: {
        type: [Array,String],
        default: function () { return [] }
      },
      consumes:{
        type: [Array,String],
        default:""
      }
    },

    data:function(){
      return {
        defaultTreeProps: { children: 'children',label: 'label'},
        activeTab:'bodyParamExample',
        pathParams :[],
        queryParams:[],
        bodyParams :[],
        headerParams :[],
        formParams:[],
        cookieParams:[],
        bodyParamData:[],
        bodyParamText:"",
      }
    },
    methods:{
    },
    mounted(){
      var me = this;
      this.parameters.map(function(v){
        let arrName="";
        if (v.in==="path"){
          arrName = "pathParams";
        }
        else if (v.in==="query"){
          arrName = "queryParams"
        }
        else if (v.in==="body"){
          arrName = "bodyParams"

          if (v.schema){
            me.bodyParamData = schemaToElTree(v.schema,[]);
            me.bodyParamText = JSON.stringify(schemaToObj(v.schema,{}),undefined,2);
          }
        }
        else if (v.in==="header"){
          arrName = "headerParams"
        }
        else if (v.in==="formData"){
          arrName = "formParams"
        }

        if (me[arrName]){
          me[arrName].push({
            "name":v.name,
            "required":v.required?v.required:false,
            "type":v.type?v.type:"",
            "enum":v.enum?v.enum:[],
            "description":v.description?v.description:"",
            "schema":v.schema?v.schema:"",
            "example":v["x-example"]?v["x-example"]:"",
          })
        }
        else{
          console.error("Parameter Type is not defined in the vue component: %s", v.in);
        }

      })

    },
    components: {
      ParameterInputs
    }
  }
</script>

<style lang="scss">
@import "~@/assets/styles/_vars.scss";
  .sw-param-type-title{
    font-weight:bold; 
    margin-top:16px;
  }

  .sw-datatype{
    color:#aaa;
    display:inline-block;
    width:50px;
    margin-right:5px;
  }
  .sw-fieldname{
    display:inline-block;
  }
  .sw-tree-node{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: stretch;
    width: 100%;
  }
  
  textarea {
    font-family: monospace !important;
    font-size: 12px !important;
    border:none !important;
  }
  
</style>

