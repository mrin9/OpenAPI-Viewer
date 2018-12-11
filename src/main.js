import Vue from 'vue'
import router from './router'
import store from './store'

//import i18n, {loadLang} from '@/lang/index';
import App from '@/App.vue';
//import ElementUI from 'element-ui';
//import locale from 'element-ui/lib/locale/lang/en'; //Its ok if this line shows error in VSCode

/*
import Button from 'element-ui/lib/button'
import Input from 'element-ui/lib/input'
import Switch from 'element-ui/lib/switch'
import Select from 'element-ui/lib/select'
import Tabs from 'element-ui/lib/tabs'
import TabPane from 'element-ui/lib/tab-pane'
import Tree from 'element-ui/lib/tree'
import Loading from 'element-ui/lib/loading'
import Message from 'element-ui/lib/message'
*/

import {
  Button,
  Input,
  Switch,
  Select,
  Tabs,
  TabPane,
  Option,
  Tree,
  Loading,
  Message
} from 'element-ui';


Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Option);
Vue.use(Tree);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;


//Vue.use(ElementUI,{locale});

const app = new Vue({
  router,
  store,
  //i18n,
  beforeCreate: function () {
    var me = this;

    //Load Language bundle (if not defined)
    /*
    if (this.$store.state.lang === undefined) {
      this.$store.commit('lang',"en");
    }
    */
    
    //loadLang(this.$store.state.lang);
  },
  render: createEle => createEle(App)
}).$mount('#app');