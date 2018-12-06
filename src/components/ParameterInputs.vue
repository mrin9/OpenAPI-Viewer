<template>
  <el-table  style="width: 100%" :data="parameters" class="sw-hide-table-headers">
    <el-table-column prop="name" label="Name" width="180">
      <template slot-scope="scope">
        <div class="sw-param-name"><span v-if="scope.row.required"  class="sw-param-req">*</span>{{scope.row.name}}</div>
        <div class="sw-param-type">{{scope.row.schema.type}}</div>
      </template>
    </el-table-column>

    <el-table-column v-if="showInputs" label="Value" width="180">
      <template slot-scope="scope">

        <!-- if Type is enum then show a select -->  
        <el-select v-if="scope.row.schema.type==='string' && scope.row.schema.enum " 
          v-model="scope.row.example" 
          style="width:100%" 
          popper-class="sw-small-height-options"
          size="medium" 
        >
          <el-option v-for="item in scope.row.schema.enum" :key="item" :label="item" :value="item"></el-option>
        </el-select>

        <!-- if Type is Array then show a select if array items are of enum type (with multiselect options)-->  
        <template v-else-if="scope.row.schema.type==='array' && scope.row.schema.items " >
          <el-select v-if="scope.row.schema.items.type==='string' && scope.row.schema.items.enum" 
            v-model="scope.row.example" 
            multiple
            style="width:100%" 
            popper-class="sw-small-height-options"
            size="medium" 
          >
            <el-option v-for="item in scope.row.schema.items.enum" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <!-- If array items are not enum, show a textarea -->
          <el-input v-else
            class="sw-editor sw-model-example-textarea" 
            type="textarea" 
            v-model="scope.row.example" 
            :autosize="{ minRows:3 }"
          >
          </el-input>
        </template> 

        <!-- For all other types, show a textbox-->  
        <input v-else type="text" class="sw-medium" style="width:100%" v-model="scope.row.example">
      </template>
    </el-table-column>

    <el-table-column prop="description" label="Description">
      <template slot-scope="scope">
        <div class="sw-gray-small-text" style="word-break: break-word;">
          <span>{{scope.row.description }}</span>
          <span v-if="scope.row.schema.enum"> 
            {{ scope.row.schema.pattern? "Pattern: " + scope.row.schema.pattern : "" }} 
          </span>

        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  
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
    font-family: monospace;
    margin:0; 
    color:#aaa;
    text-align:right;
    line-height: 12px;
  }
  
</style>

