<template>

  <div> 
    <div class="sw-section-heading1" style="display: flex; align-items: center;"> 
      <i class="el-icon-upload2" style="font-sixe:16px;"></i> 
      <div style="margin-left:5px">REQUEST</div>
    </div>

    <!-- Path Params -->
    <div v-if="pathParams.length>0" class="sw-section-gap">
      <div class="sw-section-heading3 sw-gray-text"> PATH PARAMETERS</div>
      <parameter-inputs :parameters="pathParams"></parameter-inputs>
    </div>

    <!-- Query Params -->
    <div v-if="queryParams.length>0" class="sw-section-gap">
      <div class="sw-section-heading3 sw-gray-text"> QUERY PARAMETERS</div>
      <parameter-inputs :parameters="queryParams"></parameter-inputs>
    </div>

    <!-- Form Params -->
    <div v-if="formParams.length>0" class="sw-section-gap">
      <div class="sw-section-heading3 sw-gray-text"> FORM DATA PARAMETERS</div>
      <parameter-inputs :parameters="formParams" :showItputs="true"></parameter-inputs>
    </div>

    <!-- Body Param -->
    <div v-if="requestBody!== undefined && Object.keys(requestBody).length > 0" style="min-height:300px"  class="sw-section-gap">
      <div class="sw-section-heading3 sw-gray-text"> BODY PARAMETERS</div>

      <div class="sw-row" style="align-items:flex-end; padding:0 8px 2px 0;">
        <div class="sw-gray-small-text">
         {{requestBody.description }}
        </div>
        <div style="flex:1"></div>
        <div style="position:relative; top:35px; min-width:160px; z-index:1; display:flex;">
            <!-- If only one Mime Response show a label -->
            <span v-if="mimeReqCount == 1" class="sw-section-heading" style="line-height:26px;"> 
              {{ selectedMimeReqKey }}
            </span>
            <!-- If more than one Mime Response show a drop down -->
            <el-select v-else-if="mimeReqCount > 1" 
              v-model="selectedMimeReqKey" 
              size="medium" 
              popper-class="sw-small-height-options"
            >
              <el-option v-for="(mimeTypeObj, mimeTypeKey) in mimeRequestTypes " 
                :key   = "mimeTypeKey" 
                :label = "mimeTypeKey" 
                :value = "mimeTypeKey"
              > 
              </el-option>
            </el-select>
        </div>
      </div>  

      <el-tabs v-if="mimeRequestTypes[selectedMimeReqKey]" v-model="activeTab" class="sw-border" style="padding:8px;">
        <el-tab-pane label="Example" name="bodyParamExample">
          <el-input class="sw-editor sw-model-example-textarea" 
            type="textarea" 
            v-model="mimeRequestTypes[selectedMimeReqKey].examples[0]" 
            :autosize="{ minRows: 12 }"
          >
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="Model" name="bodyParamModel"> 
          <el-tree :data="mimeRequestTypes[selectedMimeReqKey].schemaTree" :props="defaultTreeProps" :default-expand-all="true">
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
    <div v-if="headerParams.length>0" class="sw-section-gap">
      <div class="sw-section-heading3 sw-gray-text"> HEADER PARAMETERS</div>
      <parameter-inputs :parameters="headerParams" :showItputs="true"></parameter-inputs>
    </div>

    <!-- Cookie Params -->
    <div v-if="cookieParams.length>0" class="sw-section-gap">
      <div class="sw-section-heading3 sw-gray-text"> COOKIE PARAMETERS</div>
      <parameter-inputs :parameters="cookieParams" :showItputs="true"></parameter-inputs>
    </div>

    <div v-if="$store.state.isDevMode" v-loading="loading" class="sw-make-request sw-light-border" style="margin: 8px 0 0 0">
      <div class="sw-row" style="margin: 2px 0;">
        <el-button type="primary" size="medium" @click="onTry"> TRY </el-button>
        <div style="flex:1"></div>
        <el-button type="plain" size="medium"> CLEAR </el-button>
        <el-button type="plain" size="medium"> COPY </el-button>
      </div>  
      <vue-json-pretty v-if="showJsonViewer" path="/" :data="jsonResponse.data" class="sw-live-response sw-light-border"></vue-json-pretty>
      <el-input class="sw-model-example-textarea" 
        v-if="showJsonViewer===false"
        type="textarea" 
        v-model="jsonRespText" 
        :autosize="{ minRows:10, maxRows:20 }"
      >
      </el-input>
      <!-- pre v-else class="sw-live-response"> {{ jsonRespText}} </pre -->
    </div>

  </div>


</template>

<script>
  import { callEndPoint } from '@/lib/restUtils';
  import { schemaToElTree, schemaToObj, test} from '@/lib/utils';
  import ParameterInputs from '@/components/ParameterInputs';
  import VueJsonPretty from 'vue-json-pretty';

  import store from '@/store';

  export default {
    props: {
      method    : {type: String},
      url       : {type: String},
      parameters: {
        type: [Array,String],
        default: function () { return [] }
      },
      requestBody:{
        type: Object
      }
    },

    data:function(){
      return {
        loading:false,
        defaultTreeProps: { children: 'children',label: 'label' },
        activeTab:'bodyParamExample',
        pathParams :[],
        queryParams:[],
        headerParams :[],
        formParams:[],
        cookieParams:[],
        jsonResponse:{
          "data":{},
          "headers":{},
        },
        mimeRequestTypes:{},
        mimeReqCount:0,
        selectedMimeReqKey:"",
        showJsonViewer:false,
        jsonRespText:"",
        
      }
    },

    methods:{

      onTry(){
        let me = this;
        let res="";
        me.loading=true;
        this.res = callEndPoint(
          this.method, 
          this.url, 
          this.pathParams, 
          this.queryParams, 
          this.selectedMimeReqKey, 
          this.mimeRequestTypes, 
          this.headerParams, 
          this.formParams, 
          this.cookieParams
        )
        .then(function(resp){
          if (resp.request.responseText.length < 10000){
            me.showJsonViewer=true;
            me.jsonResponse.data = resp.data;
          }
          else{
            me.showJsonViewer=false;
            me.jsonRespText = JSON.stringify(resp.data, null, 2);
          }
          //  me.jsonResponse.data = resp.data;
          //me.$set(me.jsonResponse.data,resp.data);
          me.loading=false;
        })
        .catch(function(err){
          me.$message({
            showClose: true,
            message: 'AJAX call failed',
            type: 'error'
          });
          me.loading=false;
        })
      }

    },

    mounted(){
      let me = this;
      let mimeReqCount=0;
      if (me.requestBody !== undefined && Object.keys(me.requestBody.content).length > 0){
        let content = me.requestBody.content;
        for(let mimeReq in content ) {
          let mimeReqObj = content[mimeReq];

          // Generate the Schema Model  in Element UI tree format
          let schemaTreeModel = schemaToElTree(mimeReqObj.schema, [] );

          // Store Schema Examples (if provided)
          let schemaExamples = [];
          if (mimeReqObj.examples){
            schemaExamples = mimeRespObj.examples;
          }
          if (mimeReqObj.example){
            schemaExamples.push(mimeRespObj.example);
          }
          if (schemaExamples.length==0 && ( mimeReq.toLowerCase().includes("json") || mimeReq=="*/*") ){
            // If schema examples are not provided then generate one from Schema (only JSON fomat)
            let generatedExample = JSON.stringify(schemaToObj(mimeReqObj.schema,{}),undefined,2);
              schemaExamples.push(generatedExample);
          }

          //Only use $set else the new prop wont be recognized by vue
          me.$set(me.mimeRequestTypes, mimeReq, {
            "examples"   : schemaExamples,
            "schemaTree" : schemaTreeModel
          });

          me.selectedMimeReqKey = mimeReq;
          me.mimeReqCount++;
        }
        
      }


      this.parameters.map(function(v){
        let arrName="";
        if (v.in==="path"){
          arrName = "pathParams";
        }
        else if (v.in==="query"){
          arrName = "queryParams"
        }
        else if (v.in==="header"){
          arrName = "headerParams"
        }
        else if (v.in==="cookie"){
          arrName = "cookieParams"
        }
        else if (v.in==="formData"){
          arrName = "formParams"
        }
        if (me[arrName]){
          me[arrName].push({
            "name":v.name,
            "required":v.required?v.required:false,
            "description":v.description?v.description:"",
            "schema":v.schema?v.schema:{"type":"string"},
            "example":v["x-example"]?v["x-example"]:"",
          })
        }
        else{
          console.error("Parameter Type is not defined in the vue component: %s", v.in);
        }

      })
    },
    components: {
      ParameterInputs,
      VueJsonPretty
    }
  }
</script>

<style scoped lang="scss">
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
  .sw-make-request{
    padding: 8px;
  }

  .sw-section-gap{
    margin-top:24px;  
  }
  .sw-live-response{
    max-height:400px;
    max-width:100%;
    overflow: scroll;
  }
  
</style>

