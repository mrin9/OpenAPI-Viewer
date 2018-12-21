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
    <div v-if="requestBody!== undefined && Object.keys(requestBody).length > 0" class="sw-section-gap">
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

      <el-tabs v-if="mimeRequestTypes[selectedMimeReqKey]" v-model="requestBodyActiveTab" class="sw-no-tab-header-margin">
        <el-tab-pane label="Value" name="bodyParamExample">
          <textarea class="sw-mono-font"
          v-if = "mimeRequestTypes[selectedMimeReqKey].examples[0]" 
          v-model= "mimeRequestTypes[selectedMimeReqKey].examples[0].exampleValue" style="min-height:170px"/>
        </el-tab-pane>
        <el-tab-pane label="Model" name="bodyParamModel"> 
          <json-tree 
            path="/" 
            :data="mimeRequestTypes[selectedMimeReqKey].schemaTree"
            display-format="text"
          >
          </json-tree>
          <!--
          <el-tree :data= "mimeRequestTypes[selectedMimeReqKey].schemaTree" :props= "defaultTreeProps" :default-expand-all="true" class="sw-border" style="min-height:170px">
            <span class="sw-tree-node" slot-scope="{ node, data }">
              <span class="sw-fieldname">{{ node.label.label }}</span>
              <span class="sw-datatype">: {{ node.label.type }}</span>
              <span style="flex:1"></span>
              <span > {{ node.label.descr }}</span>
            </span>
          </el-tree>
          -->
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


    <!-- TRY out Button -->
    <div v-show="$store.state.isDevMode" v-loading="loading" class="sw-make-request">
      <div class="sw-row" style="margin: 2px 0;">
        <button class="sw-btn sw-primary" @click="onTry"> TRY </button>
        <div :class="'sw-response-status ' + responseStatusCssClass" v-if="responseStatusCode">
          {{responseStatusCode}} : {{responseStatusText}}
        </div>  
        <div style="flex:1"></div>
        <button class="sw-btn sw-plain" v-if="showTextViewer || showJsonViewer" style="margin-right:5px;" @click="onClearResponseData"> CLEAR </button>
        <button class="sw-btn sw-plain" v-if="showTextViewer || showJsonViewer" > COPY </button>
      </div> 
      <div class="sw-response-details" v-if="showTextViewer || showJsonViewer">
        <el-tabs v-model="responseDetailsActiveTab" class="sw-no-tab-header-margin">
          <!-- Response Data -->
          <el-tab-pane label="Response Text" name="responseData">
              <vue-json-pretty v-if="showJsonViewer" path="/" :data="jsonResponse.data" class="sw-live-response sw-light-border"></vue-json-pretty>
              <textarea :class="'sw-response-data sw-mono-font ' +  responseStatusCssClass"
                v-if="showTextViewer"
                v-model="jsonRespText" 
                style="min-height:175px"
              />
          </el-tab-pane>

          <!-- Response HEADERS -->
          <el-tab-pane label="Response Headers" name="responseHeader"> 
            <vue-json-pretty path="/" :data="responseHeaders" class="sw-light-border"></vue-json-pretty>
          </el-tab-pane>
        </el-tabs>
      </div>  

    </div>

  </div>


</template>

<script>
  import JsonTree from '@/components/tree/JsonTree';
  import { callEndPoint } from '@/lib/restUtils';
  import { schemaToModel, schemaToObj, generateExample, removeCircularReferences} from '@/lib/utils';
  import ParameterInputs from '@/components/ParameterInputs';

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
        requestBodyActiveTab:'bodyParamExample',
        responseDetailsActiveTab:"responseData",
        pathParams :[],
        queryParams:[],
        headerParams :[],
        formParams:[],
        cookieParams:[],
        mimeRequestTypes:{},
        mimeReqCount:0,
        selectedMimeReqKey:"",
        jsonRespText:"",
        jsonResponse:{
          "data":{},
          "headers":{},
        },
        showJsonViewer:false,
        showTextViewer:false,
        responseStatusCode:"",
        responseStatusText:"",
        responseHeaders:{},
        responseStatusCssClass:""
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
          me.responseStatusCode = resp.status;
          me.responseStatusText = resp.statusText;
          me.responseStatusCssClass="sw-2xx";
          me.responseHeaders = resp.headers;
          if (resp.request.responseText.length < 20000){
            me.showJsonViewer=true;
            me.showTextViewer=false;
            me.jsonResponse.data = resp.data;
          }
          else{
            me.showJsonViewer=false;
            me.showTextViewer=true;
            me.jsonRespText = JSON.stringify(resp.data, null, 2);
          }
          //me.jsonResponse.data = resp.data;
          //me.$set(me.jsonResponse.data,resp.data);
          me.loading=false;
        })
        .catch(function(err){
          me.loading=false;
          me.showJsonViewer=false;
          me.showTextViewer=true;
          if (err.response && err.response.status){
            me.responseStatusCode = err.response.status;
            me.responseStatusText = err.response.statusText;
            me.responseStatusCssClass="sw-4xx";
            me.responseHeaders = err.response.headers;
            me.jsonRespText = JSON.stringify(err.response.data, null, 2);
          }
          else{
             me.responseStatusCode = "ERROR";
             me.responseStatusText = err.message;
             me.responseStatusCssClass="sw-4xx";
          }


          /*
          me.$message({
            showClose: true,
            message: 'AJAX call failed',
            type: 'error'
          });
          */
          me.loading=false;
        })
        
      },

      onClearResponseData(){
        this.responseStatusCode="";
        this.responseStatusText="";
        this.responseHeaders={};
        this.jsonRespText="",
        this.jsonResponse={
          "data":{},
          "headers":{},
        };
        this.showJsonViewer=false;
        this.showTextViewer=false;
      }


    },


    mounted(){
      let me = this;
      let mimeReqCount=0;
      if (me.requestBody !== undefined && Object.keys(me.requestBody.content).length > 0){
        let content = me.requestBody.content;
        for(let mimeReq in content ) {
          let exampleType=""; // can be json, xml, plain
          let mimeReqObj = content[mimeReq];
          let reqSchemaTree="", reqExample="";
          //Remove Circular references from RequestBody json-schema 
          try {
              mimeReqObj.schema = JSON.parse(JSON.stringify(mimeReqObj.schema, removeCircularReferences()));
          }
          catch{
              console.error("Unable to resolve circular refs in schema", mimeReqObj.schema);
              return;
          }

          // Generate the Schema Model  in Element UI tree format
          // reqSchemaTree = schemaToElTree(mimeReqObj.schema, [] );
          reqSchemaTree = schemaToModel(mimeReqObj.schema,{});
          debugger;
          // Generate Example
          reqExample = generateExample(mimeReqObj.examples, mimeReqObj.example, mimeReqObj.schema, mimeReq, "text");

          //ALWAYS USE $set,  Else the new prop wont be recognized by vue
          me.$set(me.mimeRequestTypes, mimeReq, {
            "examples"   : reqExample,
            "schemaTree" : reqSchemaTree
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
      JsonTree
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
    padding: 0;
    margin-top:8px;
  }
  .sw-response-status{
    margin-left:5px;
    font-size:12px;
    font-weight:bold;
    &.sw-2xx {
      color:darken($sw-green,10%);
    }
    &.sw-3xx,&.sw-4xx{
      color:$sw-red;
    }
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

