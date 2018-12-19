export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    data: {
      required: true
    },
    notLastKey: Boolean
  },
  computed: {
    dataVisiable: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    //Toggle brackets to expand | close
    toggleBrackets () {
      this.dataVisiable = !this.dataVisiable
    },
    // if not the last item, automatically add a comma
    bracketsFormatter (brackets) {
      return this.notLastKey ? `${brackets},` : brackets
    }
  }
}