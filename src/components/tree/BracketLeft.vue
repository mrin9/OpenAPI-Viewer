<template>
  <div>
    <slot></slot>
    <span
      v-show="dataVisiable"
      class="sw-tree-bracket-left"
      @click.stop="toggleBrackets">
      {{ Array.isArray(data) ? '[' : '{' }}
    </span>
    <span
      v-show="!dataVisiable"
      class="sw-tree-bracket-left"
      @click.stop="toggleBrackets">
      {{ doubleBracketsGenerator(data) }}
    </span>
  </div>

</template>

<script>
  import BracketsMixin from '@/components/tree/BracketMixin';

  export default {
    mixins: [BracketsMixin],
    props: {
      showLength: Boolean
    },
    methods:{
      // Double bracket content generator
      doubleBracketsGenerator (data) {
        const isArray = Array.isArray(data)
        let brackets = isArray ? '[...]' : '{...}'
        if (this.showLength) {
          // If the length is displayed, it looks like [...] // 3 items
          const text = isArray
            ? `${data.length} items`
            : `${Object.keys(data).length} keys`
          brackets += ` // ${text}`
        }
        return this.bracketsFormatter(brackets)
      }
    }
  }
</script>
