import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'; //Its ok if this line shows error in VSCode
import i18n, {loadLang} from '@/lang/index';
import App from '@/App.vue';

Vue.config.productionTip = false
Vue.use(ElementUI,{locale});

const app = new Vue({
  router,
  store,
  i18n,
  beforeCreate: function () {
    var me = this;

    //Load Language bundle (if not defined)
    if (this.$store.state.lang === undefined) {
      this.$store.commit('lang',"en");
    }
    
    loadLang(this.$store.state.lang);
    //Set the header Item
    if (this.$store.state.currentHeaderItem === undefined) {
      //this.$store.commit('currentHeaderItem',TopNav.items[0]);
    }
  },
  render: createEle => createEle(App)
}).$mount('#app');