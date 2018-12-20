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
          <el-tabs style="flex:1; width:100%" v-model="activeTabForEachRespStatus[statusRespCode]">
            <el-tab-pane label="Example" name="exampleTab" class="sw-tab-pane">
              <json-tree 
                v-if="selectedMimeValueForEachStatus[statusRespCode] && mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].examples[0].exampleType==='json'"
                path="/" 
                :data="mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].examples[0].exampleValue"
                @click="showPath"
              >
              </json-tree>
              <textarea 
                v-else-if="selectedMimeValueForEachStatus[statusRespCode]" 
                class="sw-mono-font" 
                v-model="mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].examples[0].exampleValue" 
                style="min-height:150px"
              />
            </el-tab-pane>
            <el-tab-pane label="Model" name="schemaTab" class="sw-tab-pane">
              <button class="sw-btn sw-primary" @click="showDescrInModel = !showDescrInModel">Toggle Description</button> {{showDescrInModel}}
              <json-tree 
                v-if="selectedMimeValueForEachStatus[statusRespCode] && mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].schemaTree"
                path="/" 
                :data="mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].schemaTree"
                display-format="text"
                :show-description='showDescrInModel'
              >
              </json-tree>
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
  import{schemaToModel, schemaToElTree, schemaToObj, generateExample, removeCircularReferences} from '@/lib/utils';
  //import VueJsonPretty from 'vue-json-pretty';
  import ParameterInputs from '@/components/ParameterInputs';
  import JsonTree from '@/components/tree/JsonTree';

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
        headersForEachRespStatus     :{},
        showDescrInModel:true,
      }
    },
    methods:{
      showPath(path, data){
        console.log(path, data);
      }

    },

    mounted(){
      let me = this;
      
      for(let statusCode in me.responsesLocalCopy) {
        let allMimeResp={};
        let mimeRespCount=0;
        for(let mimeResp in me.responsesLocalCopy[statusCode].content ) {
          let mimeRespObj = me.responsesLocalCopy[statusCode].content[mimeResp];
          //Remove Circular references from schema 
          try {
              mimeRespObj.schema = JSON.parse(JSON.stringify(mimeRespObj.schema, removeCircularReferences()));
          }
          catch{
              console.error("Unable to resolve circular refs in schema", schema);
              return;
          }
          let schemaTree = schemaToModel(mimeRespObj.schema,{});
          // Generate Example
          let respExample = generateExample(mimeRespObj.examples, mimeRespObj.example, mimeRespObj.schema, mimeResp, "json");
          allMimeResp[mimeResp] = {
            "examples"  : respExample,
            "schemaTree": schemaTree
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
      //VueJsonPretty,
      JsonTree,
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

