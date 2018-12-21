<template>
  <div class="sw-content-block">
    <div class="sw-content-key" v-if="parentDataType === 'object'">{{ currentKey }}:</div>
    <div :class="`sw-content sw-datatype-${displayFormat==='json'?dataType:text.substring(0,4)}`">{{ getText() }}</div>
    <div style="flex:1; min-width:15px;"></div>
    <div ref="descrDiv" :class="`sw-descr ${descrClass}`" >
        {{description}} 
    </div>
    <span class="sw-descr-expander" v-if="description" @click="handleItemToggleDescr()"> 
       {{ descrClass==='sw-descr-collapsed'? '\u2935' : '\u2934' }}
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
    data () {
      return {
        description: this.getDescription(),
        descrClass:'sw-descr-collapsed',
        showDescrExpander:true
      }
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
        if (this.descrClass ==="sw-descr-collapsed"){
          this.descrClass ="sw-descr-expanded";
        }
        else{
          this.descrClass ="sw-descr-collapsed";
        }
        this.$emit('toggleDescription');
      }
    },
  }
</script>
