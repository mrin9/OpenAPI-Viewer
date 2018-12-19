<template>
  <div class="sw-text-block">
    <div v-if="parentDataType === 'object'">{{ currentKey }}:</div>
    <div style="white-space: nowrap;" :class="`sw-datatype-${dataType}`">{{ textFormatter(text) }}</div>
    <div style="flex:1; min-width:5px;"></div>
    <div> This is a description This is a description some more </div>
  </div>
</template>

<script>
export default {
    props: {
      parentDataType: String, 
      dataType: String, // Current text data type
      text: String,
      notLastKey: Boolean,
      currentKey: [Number, String]
    },
    methods: {
      textFormatter (text) {
        let output = text
        if (this.dataType === 'string') output = `"${output}"`
        if (this.notLastKey) output += ','
        return output
      }
    }
  }
</script>
