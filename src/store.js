import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const persistMutations=['lang','jwt']; // only these mutations will be persisted

export default new Vuex.Store({
  state: {
    lang:'en',
    baseUrl:'',
    scheme:"http"
  },

  mutations: {
    lang(state, payload) {
      state.lang = payload;
    },
    baseUrl(state, payload){
      state.baseUrl = payload;
    },
    scheme(state, payload){
      state.scheme = payload;
    }

  },
  
  actions: {

  }
})
