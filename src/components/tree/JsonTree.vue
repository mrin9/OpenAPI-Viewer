<template>
  <div
    :class="`sw-tree ${showDescr?'sw-show-descr':'sw-hide-descr'} sw-format-${displayFormat}`"
    :style="{
      'background-color': treeContentBackground,
      'position': currentDeep > 1 ? '' : 'relative'
    }"
    @click.stop="handleClick($event)"
  >
    <template v-if="Array.isArray(data) || isObject(data)">
      <!-- Left Closed -->
      <bracket-left :visible.sync="visible" :data="data" :show-length="showLength" :not-last-key="notLastKey">
        <span v-if="currentDeep > 1 && !Array.isArray(parentData)">{{ currentKey }}:</span>
      </bracket-left>

      <!-- 
        Data content, 
        1. when object, key represents the key name, 
        2. when array,  key represents index 
      -->
      <div v-for="(item, key) in data" v-show="visible" class="sw-tree-content" :key="key">
        <json-tree
          :parent-data="data"
          :data="item"
          :deep="deep"
          :show-length="showLength"
          :path="path + (Array.isArray(data) ? `[${key}]` : `.${key}`)"
          :allow-interaction="allowInteraction"
          :current-key="key"
          :display-format="displayFormat"
          :current-deep="currentDeep + 1"
          @click="handleItemClick">
        </json-tree>
      </div>

      <!-- Right closed -->
      <bracket-right :visible.sync="visible" :data="data" :not-last-key="notLastKey"> </bracket-right>
    </template>

    <content-block
      v-else
      :parentDataType="getDataType(parentData)"
      :dataType="getDataType(data)"
      :text="data + ''"
      :notLastKey="notLastKey"
      :displayFormat="displayFormat"
      :currentKey="currentKey">
    </content-block>
  </div>
</template>

<script>
  import ContentBlock from '@/components/tree/ContentBlock';
  import BracketLeft from '@/components/tree/BracketLeft';
  import BracketRight from '@/components/tree/BracketRight';

  export default {
    name: 'json-tree',
    components: {
      ContentBlock,
      BracketLeft,
      BracketRight
    },
    props: {
      // Current tree data
      data: {},

      // Defining the depth of the tree, subtrees larger than the depth will not be expanded
      deep: {type:Number, default:Infinity},

      // Whether to display the length of the array | object
      showLength: {type:Boolean, default:false},
      
      // Data level top level path
      path: {type: String, default: 'root'},

      allowInteraction: {type:Boolean, default:true},

      // Parent data of current node
      parentData: {},
      
      // The depth of the current tree starts with the root node as 0, so the depth of the first layer tree is 1, and the recursion is incremented succ
      currentDeep: {type: Number, default: 1},

      //  1. when object, currentKey represents the key name, 
      //  2. when array,  currentKey represents index 
      currentKey: [Number, String],

      //Display Format can be 'json' or 'text'
      displayFormat: {type:String, default:'json'},

    },
    data () {
      return {
        visible: this.currentDeep <= this.deep,
        treeContentBackground: 'transparent',
        showDescr:true
      }
    },

    computed: {
      // to determine whether to add ","
      lastKey () {
        if (Array.isArray(this.parentData)) {
          return this.parentData.length - 1
        } 
        else if (this.isObject(this.parentData)) {
          let arr = Object.keys(this.parentData)
          return arr[arr.length - 1]
        }
      },
      notLastKey () {
        return this.currentKey !== this.lastKey
      }

    },
    methods: {

      // Trigger component's click event
      handleClick (e) {
        if (this.allowInteraction){
          this.$emit('click', this.path, this.data);
        }
      },

      // Handles the click event fired by the subtree and passes it to the top
      handleItemClick (path, data) {
        this.$emit('click', path, data)
      },
      
      isObject (value) {
        return this.getDataType(value) === 'object'
      },

      getDataType (value) {
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
      }
    },
    watch: {
      deep (newVal) {
        this.visible = this.currentDeep <= newVal
      }
    }
  }
</script>

<style lang="scss">
@import "~@/assets/styles/_vars.scss";

.sw-tree {
  font-family: $sw-font-mono;
  font-size: 12px;
  .sw-tree-content {
    padding-left: 1em; 
    border-left:  1px dotted #ccc;
  }

  .sw-tree-bracket-left,
  .sw-tree-bracket-right{
    cursor: pointer;
    padding: 0 20px 0 0;
    &:hover {
      color: $sw-primary-color;
      background: #efefef;
    }
  }

  .sw-datatype {
    &-null{
      color: $sw-soft-red;
    }
    &-bool,
    &-numb,
    &-inte,
    &-number, 
    &-boolean{
      color: $sw-info;
    }
    &-stri,
    &-string{
      color: darken($sw-green,5%);
    }
    &-enum{
      color:$sw-orange;
    }
  }

  .sw-content-block{
    .sw-content-key{
      white-space: nowrap;
    }
    .sw-content{
      white-space: nowrap;
    }
    .sw-content.sw-datatype-enum{
      white-space:normal;
      padding-top:0;
      min-width:150px;
    }

    display:flex;
    align-items:stretch;
    width:100%; 
    &:hover{
      background:#efefef;
    }
  }

  .sw-descr{
    min-width:100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width:100%; 
    display: inline-block; 
    overflow: hidden;
    color: $sw-gray-text;
    text-align: right;
    &.sw-descr-collapsed{
      white-space: nowrap;
    }
    &.sw-descr-expanded{
      white-space:normal;
    }
    
  }
  .sw-show-descr .sw-descr{
    display:block;
  }
  .sw-hide-descr .sw-descr{
    display:none;
  }
  .sw-descr-expanded + .sw-descr-expander{
    border-left:2px solid #ccc;
  }
  .sw-descr-expander {
    padding:0 5px;
    margin-left:5px;
    cursor:pointer; 
    color:orange;
    &:hover{
      color:orangered;
    }
  }

}

</style>

