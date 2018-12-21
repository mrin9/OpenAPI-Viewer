import Vue from 'vue'
import router from './router'
import store from './store'


import App from '@/App.vue';
import marked from 'marked';
import elementLocale from 'element-ui/lib/locale'
import elementLang from 'element-ui/lib/locale/lang/en'; //Its ok if this line shows error in VSCode

//import ElementUI from 'element-ui';
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
//import i18n, {loadLang} from '@/lang/index';

import {
  Switch,
  Select,
  Tabs,
  TabPane,
  Option,
  Loading,
  Message
} from 'element-ui';


Vue.config.productionTip = false

elementLocale.use(elementLang);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$marked = marked;

//Vue.use(ElementUI,{locale});

const app = new Vue({
  router,
  store,
  render: createEle => createEle(App)
}).$mount('#app');