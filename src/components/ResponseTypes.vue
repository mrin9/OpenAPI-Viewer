<template>

  <div> 
    <div class="sw-section-heading1" style="display: flex; align-items: center;"> 
      <i class="el-icon-download" style="font-sixe:16px;"></i> 
      <div style="margin-left:5px">RESPONSE</div>
    </div>

    <!-- For Each Status Responses -->
    <div v-for="( statusRespObj, statusRespCode) in responsesLocalCopy" :key=statusRespCode>
        <div class="sw-row" style="margin-top:16px; align-items:flex-end">
          
          <div> 
            <span class="sw-section-heading2"> {{statusRespCode}} </span> 
            <span class="sw-gray-small-text"> : {{statusRespObj.description}} 
            </span>
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
            <el-tab-pane label="Example" name="exampleTab">
              <el-input
                v-if="selectedMimeValueForEachStatus[statusRespCode]"
                class="sw-model-example-textarea" 
                type="textarea"
                v-model="mimeResponsesForEachStatus[statusRespCode][selectedMimeValueForEachStatus[statusRespCode]].examples[0]" 
                :autosize="{ minRows: 12}"
                >
              </el-input>
            </el-tab-pane>
            <el-tab-pane label="Model" name="schemaTab" style="min-height:265px; padding:8px">
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

        <div class="sw-row" v-if="statusRespObj.headers">
          Response Headers : <br/> 
          <div v-for="( headerObj, headerName) in statusRespObj.headers" :key=headerName>
            {{headerObj.description}}
          </div> <br/>
        </div>  

    </div> <!-- End For -->
  </div>


</template>

<script>
  import{schemaToElTree, schemaToObj} from '@/lib/utils'


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
          let schemaTreeModel = schemaToElTree(mimeRespObj.schema, [] );

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
            let generatedExample = JSON.stringify(schemaToObj(mimeRespObj.schema,{}),undefined,2);
              schemaExamples.push(generatedExample);
          }
          allMimeResp[mimeResp]={
            "examples"  : schemaExamples,
            "schemaTree": schemaTreeModel
          }
          me.selectedMimeValue=mimeResp;
          me.selectedMimeValueForEachStatus[statusCode] = mimeResp;
          mimeRespCount++;
        }
        me.activeTabForEachRespStatus[statusCode] = "exampleTab"; // set the default tab to example for each response status
        me.mimeResponsesForEachStatus[statusCode] = allMimeResp;
        me.mimeRespCountForEachStatus[statusCode] = mimeRespCount;
          
       
      }


    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";
</style>

