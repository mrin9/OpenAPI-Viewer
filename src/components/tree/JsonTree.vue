<template>
  <div
    class="sw-tree"
    :style="{
      'background-color': treeContentBackground,
      'position': currentDeep > 1 ? '' : 'relative'
    }"
    @click.stop="handleClick($event)">

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
      deep: {type: Number,default: Infinity},

      // Whether to display the length of the array | object
      showLength: { type: Boolean,default: false},
      
      // Data level top level path
      path: {type: String, default: 'root'},

      allowInteraction: { type: Boolean, default:true},

      // Parent data of current node
      parentData: {},
      
      // The depth of the current tree starts with the root node as 0, so the depth of the first layer tree is 1, and the recursion is incremented succ
      currentDeep: {type: Number, default: 1},

      //  1. when object, currentKey represents the key name, 
      //  2. when array,  currentKey represents index 
      currentKey: [Number, String]
    },
    data () {
      return {
        visible: this.currentDeep <= this.deep,
        treeContentBackground: 'transparent',
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
  font-family: "roboto-mono", "Monaco", "Menlo", "Consolas", "Bitstream Vera Sans Mono", monospace;
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
      color: #20a0ff;
      background: #efefef;
    }
  }

  .sw-datatype {
    &-null{
      color: #ff4949;
    }
    &-number, 
    &-boolean{
      color: #1d8ce0;
    }
    &-string{
      color: #13ce66;
    }
  }
  .sw-content-block{
    display:flex; 
    width:100%; 
    &:hover{
      background:#eee;
    }
  }
}

</style>

