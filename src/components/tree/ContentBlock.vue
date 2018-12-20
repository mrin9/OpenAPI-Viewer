<template>
  <div class="sw-content-block">
    <div v-if="parentDataType === 'object'">{{ currentKey }}:</div>
    <div :class="`sw-content sw-datatype-${displayFormat==='json'?dataType:text.substring(0,4)}`">{{ getText() }}</div>
    <div style="flex:1; min-width:15px;"></div>
    <div class='sw-descr' >
      <span style="width:100%; display: inline-block; overflow: hidden; text-overflow: ellipsis;">  
        {{getDescription()}} 
      </span>
    </div>
    <span v-if="getDescription()"
        @click="handleItemToggleDescr()" 
        style="cursor:pointer; color:cornflowerblue"> &#x21F2; 
    </span>

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
      getText () {
        if (this.displayFormat==='text'){
          return this.text.split("~|~")[0];
        }
        let output = this.text;
        if (this.dataType === 'string') output = `"${output}"`;
        if (this.notLastKey) output += ','
        return output;
      },

      getDescription () {
        if (this.displayFormat==='text'){
          let temp = this.text.split("~|~");
          return temp[1]?temp[1]:"";
        }
        return "";
      },

      handleItemToggleDescr(){
        console.log("item toggle");
        this.$emit('toggleDescription');
      }

    }
  }
</script>
