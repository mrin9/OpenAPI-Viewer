<template>

  <div> 
    <div class="sw-section-heading1" style="display: flex; align-items: center;"> 
      <i class="el-icon-download" style="font-sixe:16px;"></i> 
      <div style="margin-left:5px">RESPONSE</div>
    </div>

    <!-- For Each Status Responses -->
    <div v-for="(statusRespObj, statusRespCode) in responsesLocalCopy" :key=statusRespCode class="sw-response-status">
        <div class="sw-row">
          <div> 
            <span class="sw-section-heading2"> {{statusRespCode}} </span> 
            <span class="sw-small-text"> : {{statusRespObj.description}} </span>
          </div>
          <div style="flex:1"></div>
          <div style="position:relative; top:25px; min-width:160px; z-index:1; display:flex;">
              <!-- If only one Mime Response show a label -->
              <span v-if="mimeRespCountForEachStatus[statusRespCode] == 1" class="sw-section-heading" style="line-height:26px;"> 
                {{ selectedMimeValueForEachStatus[statusRespCode] }}
              </span>

              <!-- If more than one Mime Response show a drop down -->
              <el-select 
                v-else-if="mimeRespCountForEachStatus[statusRespCode] > 1"
                v-model="selectedMimeValueForEachStatus[statusRespCode]" 
                size="medium"
                popper-class="sw-small-height-options"
              >
                <el-option v-for="(mimeTypeObj, mimeTypeKey) in mimeResponsesForEachStatus[statusRespCode] " 
                  :key   = "mimeTypeKey" 
                  :label = "mimeTypeKey" 
                  :value = "mimeTypeKey"
                > 
                </el-option>
              </el-select>
          </div>
        </div>
        
        <div class="sw-row" v-if="statusRespObj.content">
          <el-tabs style="flex:1" v-model="activeTabForEachRespStatus[statusRespCode]">
            <el-tab-pane label="Example" name="exampleTab" class="sw-tab-pane">
              <vue-json-pretty 
                v-if=" selectedMimeValueForEachStatus[statusRespCode] && selectedMimeValueForEachStatus[statusRespCode].includes('json')  "
                path="root" 
                :data="mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].examples[0]"
              >
              </vue-json-pretty>
              <el-input
                v-else-if="selectedMimeValueForEachStatus[statusRespCode]"
                class="sw-mono-font" 
                type="textarea"
                v-model="mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].examples[0]" 
                :autosize="{ minRows:12}"
                >
              </el-input>
            </el-tab-pane>
            <el-tab-pane v-if=" 1==2" label="Model" name="schemaTab" class="sw-tab-pane">
              <el-tree 
                v-if="selectedMimeValueForEachStatus[statusRespCode]"
                :data="mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].schemaTree" 
                :props="defaultTreeProps" 
                :default-expand-all="true"
              >
                <span class="sw-tree-node" slot-scope="{ node, data }">
                  <span class="sw-fieldname">{{ node.label.label }}</span>
                  <span class="sw-datatype">: {{ node.label.type }}</span>
                  <span style="flex:1"></span>
                  <span> {{ node.label.descr }} </span>
                </span>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div v-if="statusRespObj.headers">
          <div class="sw-section-heading3 sw-gray-text"> Response Headers</div>
          <parameter-inputs :parameters="headersForEachRespStatus[statusRespCode]" :showInputs="false"></parameter-inputs>
        </div>  
    </div> <!-- End For -->
  </div>


</template>

<script>
  import{schemaToElTree, schemaToObj} from '@/lib/utils';
  import VueJsonPretty from 'vue-json-pretty';
  import ParameterInputs from '@/components/ParameterInputs';

  export default {
    props: {
      responses: {
        type: [Array,String, Object],
        default: function () { return {} }
      }
    },

    data:function(){
      return {
        responsesLocalCopy :this.responses,
        defaultTreeProps: { children: 'children',label: 'label'},
        activeTabForEachRespStatus   :{},
        mimeResponsesForEachStatus   :{}, 
        selectedMimeValueForEachStatus:{},
        mimeRespCountForEachStatus   :{},
        headersForEachRespStatus     :{}
      }
    },
    methods:{
      

    },

    mounted(){
      let me = this;
      
      for(let statusCode in me.responsesLocalCopy) {
        let allMimeResp={};
        let mimeRespCount=0;
        for(let mimeResp in me.responsesLocalCopy[statusCode].content ) {
          let mimeRespObj = me.responsesLocalCopy[statusCode].content[mimeResp];
          // Generate the Schema Model  in Element UI tree format
          //let schemaTreeModel = schemaToElTree(mimeRespObj.schema, [] );
          // Store Schema Examples (if provided)
          let schemaExamples = [];
          if (mimeRespObj.examples){
            schemaExamples = mimeRespObj.examples;
          }
          if (mimeRespObj.example){
            schemaExamples.push(mimeRespObj.example);
          }
          if (schemaExamples.length==0){
            // If schema examples are not provided then generate one from Schema (only JSON fomat)
            if (mimeResp.toLowerCase().includes("json")){
              //let generatedExample = JSON.stringify(schemaToObj(mimeRespObj.schema,{}),undefined,2);
              let generatedExample = schemaToObj(mimeRespObj.schema,{});
              schemaExamples.push(generatedExample);
            }
            else if(mimeResp.toLowerCase().includes("xml")){
              schemaExamples.push('<?xml version="1.0" encoding="UTF-8"?> Unable to generate schema' );
            }
            else{
              schemaExamples.push(' ');
            }
          }
          allMimeResp[mimeResp]={
            "examples"  : schemaExamples,
            //"schemaTree": schemaTreeModel
          }
          me.selectedMimeValue=mimeResp;
          me.$set(me.selectedMimeValueForEachStatus,statusCode, mimeResp); // !important use me.$set only
          mimeRespCount++;
          
        }
        // Headers for each response status
        let tempHeaders=[];
        for (let key in me.responsesLocalCopy[statusCode].headers){
          tempHeaders.push ( { "name":key, ...me.responsesLocalCopy[statusCode].headers[key]} );
        }
        me.$set(me.headersForEachRespStatus,statusCode,tempHeaders);
        me.activeTabForEachRespStatus[statusCode] = "exampleTab"; // set the default tab to example for each response status
        me.mimeResponsesForEachStatus[statusCode] = allMimeResp;
        me.mimeRespCountForEachStatus[statusCode] = mimeRespCount;
      }

    },

    components: {
      VueJsonPretty,
      ParameterInputs
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";
.sw-tab-pane{
  min-height:230px; 
  padding:8px;
}

.sw-response-status {
  margin-top:24px; 
  align-items:flex-end;
  & + .sw-response-status{
    padding-top:16px;
    border-top:1px solid #777;
  }
}
</style>

