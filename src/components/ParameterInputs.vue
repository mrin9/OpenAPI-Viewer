<template>
  <el-table  style="width: 100%" :data="parameters">
    <el-table-column prop="name" label="Name" width="180">
      <template slot-scope="scope">
        <div class="sw-param-name"><span v-if="scope.row.required"  class="sw-param-req">*</span>{{scope.row.name}}</div>
        <div class="sw-param-type">{{scope.row.schema.type}}</div>
      </template>
    </el-table-column>

    <el-table-column label="Value" width="180">
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
        
        <input v-else type="text" class="sw-medium" style="width:100%" v-model="scope.row.example">
      </template>
    </el-table-column>

    <el-table-column prop="description" label="Description">
      <template slot-scope="scope">
        <div class="sw-gray-small-text" style="word-break: break-word;">
          <span v-if="scope.row.schema.enum"> 
            {{ scope.row.schema.pattern? "Pattern: " + scope.row.schema.pattern : "" }} 
          </span>
          <span>{{scope.row.description }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  
  export default {
    props: {
      parameters : {type:Array, default:[]},
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

