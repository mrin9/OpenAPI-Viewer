<template>

  <div class="sw-request"> 
    <div> RESPONSE</div>
    <div style="min-height:300px; height:100%">
      <div v-for="(value, key) in responses" :key=key>
        <div class="sw-param-type-title"> {{key}} - {{value.description}} </div>
        <el-tabs v-if="responses[key].schema" v-model="activeTab[key]" style="border:1px solid #ccc;padding:8px;">
          <el-tab-pane label="Example" name="bodyParamExample">
            <el-input class="sw-model-example-textarea" type="textarea" v-model="responseExampleText[key]" :autosize="{ minRows: 12}"></el-input>
          </el-tab-pane>
          <el-tab-pane label="Model" name="bodyParamModel">Model
            <el-tree :data="responseModelData[key]" :props="defaultTreeProps" :default-expand-all="true">
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
    </div>
  </div>


</template>

<script>
  import{schemaToElTree, schemaToObj} from '@/lib/utils'


  export default {
    props: {
      responses: {
        type: [Array,String, Object],
        default: function () { return {} }
      },
      produces:{
        type: [Array,String],
        default:""
      }
    },

    data:function(){
      return {
        defaultTreeProps: { children: 'children',label: 'label'},
        activeTab          :{},
        responseModelData  :{},
        responseExampleText:{},

        //responseModelData:[],
        //responseExampleText:"",
      }
    },
    methods:{
    },
    mounted(){
      var me = this;
      for(let key in me.responses){
        if (me.responses[key].schema ){
          me.activeTab[key]='bodyParamExample',
          me.responseModelData[key]   = schemaToElTree(me.responses[key].schema,[]);
          me.responseExampleText[key] = JSON.stringify(schemaToObj(me.responses[key].schema,{}),undefined,2); 
        }
      }
      
    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";
  .sw-param-type-title{
    font-weight:bold; 
    margin-top:16px;
  }
  .sw-param-name{
    font-family: monospace;
    margin:0; 
    color:#333;
    text-align:right;
    line-height: 12px;
  }
  .sw-param-type{
    font-family: monospace;
    margin:0; 
    color:#aaa;
    text-align:right;
    line-height: 12px;
  }
  .sw-param-desc{
    color:#777;
    line-height: 12px;
    word-break: break-word;
  }
  .sw-param-req{
    color:orangered;
    font-size: 16px;
    vertical-align: middle;
  }
  .sw-tree-node{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: stretch;
    width: 100%;
  }

</style>

