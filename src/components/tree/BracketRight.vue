<template>
  <div v-show="dataVisiable">
    <span
      class="sw-tree-node"
      @click.stop="toggleBrackets">
      {{ bracketsFormatter(Array.isArray(data) ? ']' : '}') }}
    </span>
  </div>

</template>

<script>
  import BracketsMixin from '@/components/tree/BracketMixin';

  export default {
    mixins: [BracketsMixin]
  }
</script>
