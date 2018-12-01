<template>
  <el-table  style="width: 100%" :data="parameters">
    <el-table-column prop="name" label="Name" width="180">
      <template slot-scope="scope">
        <div class="sw-param-name"><span v-if="scope.row.required"  class="sw-param-req">*</span>{{scope.row.name}}</div>
        <div class="sw-param-type">{{scope.row.type}}</div>
      </template>
    </el-table-column>

    <el-table-column label="Value" width="180">
      <template slot-scope="scope">
        <el-select v-if="scope.row.enum.length>0" v-model="scope.row.example" style="width:100%" class="sw-small" >
          <el-option v-for="item in scope.row.enum" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <input v-else type="text" class="sw-medium" style="width:100%" v-model="scope.row.example">
      </template>
    </el-table-column>

    <el-table-column prop="description" label="Description">
      <template slot-scope="scope">
        <div class="sw-param-desc">{{ scope.row.enum.length?"Allowed: [ " + scope.row.enum.join(", ") + " ] ":"" }} {{scope.row.description }}</div>
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

