import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const persistMutations=['lang','jwt']; // only these mutations will be persisted

export default new Vuex.Store({
  state: {
    lang:'en',
  },
  mutations: {
    lang(state, payload) {
      state.lang = payload
    }
  },
  actions: {

  }
})
