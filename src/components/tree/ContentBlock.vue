<template>
  <div class="sw-content-block">
    <div v-if="parentDataType === 'object'">{{ currentKey }}:</div>
    <div :class="`sw-content sw-datatype-${displayFormat==='json'?dataType:text.substring(0,4)}`">{{ textFormatter(text) }}</div>
    <div style="flex:1; min-width:15px;"></div>
    <div class='sw-descr sw-gray-small-text'>  {{text}} </div>
  </div>
</template>

<script>
export default {
    props: {
      parentDataType: String, 
      dataType: String, // Current text data type
      text: String,
      notLastKey: Boolean,
      currentKey: [Number, String],
      displayFormat: {type:String, default:'json'},
    },
    methods: {
      textFormatter (text) {
        if (this.displayFormat==='text'){
          return text;
        }
        let output = text;
        if (this.dataType === 'string') output = `"${output}"`;
        if (this.notLastKey) output += ','
        return output;
      }
    }
  }
</script>
