<template>
  <div
    class="sw-tree"
    :style="{
      'background-color': treeContentBackground,
      'position': currentDeep > 1 ? '' : 'relative'
    }"
    @click.stop="handleClick($event)"
    @mouseover.stop="handleMouseover"
    @mouseout.stop="handleMouseout">

    <template v-if="Array.isArray(data) || isObject(data)">
      <!-- 左闭合 -->
      <bracket-left
        :visible.sync="visible"
        :data="data"
        :show-length="showLength"
        :not-last-key="notLastKey">
        <span v-if="currentDeep > 1 && !Array.isArray(parentData)">{{ currentKey }}:</span>
      </bracket-left>

      <!-- Data content, 
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
          :path-checked="pathChecked"
          :path-selectable="pathSelectable"
          :selectable-type="selectableType"
          :current-key="key"
          :current-deep="currentDeep + 1"
          @click="handleItemClick">
        </json-tree>
      </div>

      <!-- 右闭合 -->
      <bracket-right
        :visible.sync="visible"
        :data="data"
        :not-last-key="notLastKey">
      </bracket-right>
    </template>

    <simple-text
      v-else
      :parentDataType="getDataType(parentData)"
      :dataType="getDataType(data)"
      :text="data + ''"
      :notLastKey="notLastKey"
      :currentKey="currentKey">
    </simple-text>
  </div>
</template>

<script>
  import SimpleText from '@/components/tree/SimpleText';
  import BracketLeft from '@/components/tree/BracketLeft';
  import BracketRight from '@/components/tree/BracketRight';

  export default {
    name: 'json-tree',
    components: {
      SimpleText,
      BracketLeft,
      BracketRight
    },
    props: {
      /* 外部可用 START */
      // 当前树的数据
      data: {},
      // 定义树的深度, 大于该深度的子树将不被展开
      deep: {
        type: Number,
        default: Infinity
      },
      // 是否显示数组|对象的长度
      showLength: {
        type: Boolean,
        default: false
      },
      // 数据层级顶级路径
      path: {
        type: String,
        default: 'root'
      },
      // 定义数据层级支持的选中方式, 默认无该功能
      selectableType: {
        type: String,
        default: '' // both, checkbox, tree
      },
      // 定义已选中的数据层级
      pathChecked: {
        type: Array,
        default: () => []
      },
      // 定义某个数据层级是否支持选中操作
      pathSelectable: {
        type: Function,
        default: () => true
      },
      /* 外部可用 END */
      // 当前树的父级数据
      parentData: {},
      // 当前树的深度, 以根节点作为0开始, 所以第一层树的深度为1, 递归逐次递增
      currentDeep: {
        type: Number,
        default: 1
      },
      // 当前树的数据 data 为数组时 currentKey 表示索引, 为对象时表示键名
      currentKey: [Number, String]
    },
    data () {
      return {
        visible: this.currentDeep <= this.deep,
        treeContentBackground: 'transparent',
        checkboxVal: this.pathChecked.includes(this.path) // 复选框的值
      }
    },
    computed: {
      // 获取当前 data 中最后一项的 key 或 索引, 便于界面判断是否添加 ","
      lastKey () {
        if (Array.isArray(this.parentData)) {
          return this.parentData.length - 1
        } else if (this.isObject(this.parentData)) {
          let arr = Object.keys(this.parentData)
          return arr[arr.length - 1]
        }
      },
      // 是否不是最后一项
      notLastKey () {
        return this.currentKey !== this.lastKey
      },
      // 当前的树是否支持选中功能
      selectable () {
        return this.pathSelectable(this.path, this.data)
      },
      // 存在复选框
      existCheckbox () {
        return this.selectableType === 'both' || this.selectableType === 'checkbox'
      },
      // 存在mouseover
      existMouseover () {
        return this.selectableType === 'both' || this.selectableType === 'tree'
      }
    },
    methods: {
      /**
       * 触发组件的 click 事件
       * @param  {Boolean} changed 复选框值是否已改变(如果来自复选框 change 事件则已改变)
       */
      handleClick (e, changed = false) {

        // Since the checkbox also depends on this function, it is excluded by changed
        if (!changed && !this.existMouseover || !this.selectable) return
        //changed || (this.checkboxVal = !this.checkboxVal)
        this.$emit('click', this.path, this.data, this.checkboxVal)
      },
      // Handles the click event fired by the subtree and passes it to the top
      handleItemClick (path, data, checked) {
        this.$emit('click', path, data, checked)
      },
      handleMouseover () {
        this.existMouseover && this.selectable && (this.treeContentBackground = '#eee')
      },
      
      handleMouseout () {
        this.existMouseover && this.selectable && (this.treeContentBackground = 'transparent')
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
  .sw-tree-node {
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
  .sw-text-block{
    display:flex; 
    width:100%; 
    &:hover{
      background:#eee;
    }
  }
}

</style>

