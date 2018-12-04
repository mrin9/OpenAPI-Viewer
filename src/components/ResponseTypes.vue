<template>

  <div class="sw-request"> 
    <div> RESPONSE</div>

    <!-- For Each Status Responses -->
    <div v-for="( statusRespObj, statusRespCode) in responsesLocalCopy" :key=statusRespCode>
        <div class="sw-row">
          <div> {{statusRespCode}} - {{ statusRespObj.description }} {{selectedMimeValue}}</div>

          <div style="flex:1"></div>
          <el-select v-model="selectedMimeValue" >
            <el-option v-for="(mimeTypeObj, mimeTypeKey) in mimeResponsesForEachStatus[statusRespCode] " 
              :key   = "mimeTypeKey" 
              :label = "mimeTypeKey" 
              :value = "mimeTypeKey"
            > 
            </el-option>
          </el-select>
        </div>
        
        <div class="sw-row">
          <el-tabs style="flex:1" v-model="activeTabForEachRespStatus[statusRespCode]">
            <el-tab-pane label="Example" name="exampleTab">
              <el-input
                v-if="selectedMimeValue && mimeResponsesForEachStatus[statusRespCode][selectedMimeValue]"
                class="sw-model-example-textarea" 
                type="textarea"
                v-model="mimeResponsesForEachStatus[statusRespCode][selectedMimeValue].examples[0]" 
                :autosize="{ minRows: 12}"
                >
              </el-input>
            </el-tab-pane>
            <el-tab-pane label="Model" name="schemaTab" style="min-height:265px; border:1px solid #ccc;padding:8px">
              <el-tree 
                v-if="selectedMimeValue && mimeResponsesForEachStatus[statusRespCode][selectedMimeValue]"
                :data="selectedMimeValue && mimeResponsesForEachStatus[statusRespCode][selectedMimeValue].schemaTree" 
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

        <div class="sw-row">
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
        selectedMimeValue:"",

        selectedExample:"",
        selectedSchemaTree:[]


      }
    },
    methods:{


    },

    mounted(){
      let me = this;
      
      for(let statusCode in me.responsesLocalCopy) {
        
        let allMimeResp={};
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
        }
        me.activeTabForEachRespStatus[statusCode] = "exampleTab"; // set the default tab to example for each response status
        me.mimeResponsesForEachStatus[statusCode] = allMimeResp;
       
      }


    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";
</style>

