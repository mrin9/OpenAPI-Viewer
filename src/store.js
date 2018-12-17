import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const persistMutations=['lang','specUrl','reqToken', 'reqTokenType','reqHeader','reqSendTokenIn','oAuthTokenUrl']; // only these mutations will be persisted
const vuexLocal = new VuexPersistence({
  key:'mrindoc',
  storage: window.localStorage,
  filter: function(mutation){
    return persistMutations.indexOf(mutation.type)>=0 ? true:false;
  }
})




export default new Vuex.Store({
  state: {
    lang:'en',
    specUrl:"",
    isDevMode:false,
    selectedApiServer:"",
    reqHeader:"",
    reqToken:"",
    reqTokenType:"",    // can be api, basic or bearer
    reqSendTokenIn:"",  // can be header, querystring or cookies
    oAuthClientId:"",
    oAuthClientSecret:"",
    oAuthTokenUrl:"",

  },

  mutations: {
    lang(state, payload)     { state.lang = payload; },
    specUrl(state, payload)  { state.specUrl = payload; },
    isDevMode(state, payload){ state.isDevMode = payload; },
    reqToken(state, payload)       { state.reqToken = payload; },
    reqTokenType(state, payload)   { state.reqTokenType = payload;  },
    reqHeader(state, payload)      { state.reqHeader = payload;  },
    reqSendTokenIn(state, payload) { state.reqSendTokenIn = payload; },
    oAuthClientId(state, payload)     { state.oAuthClientId = payload; },
    oAuthClientSecret(state, payload) { state.oAuthClientSecret = payload; },
    oAuthTokenUrl(state, payload)     { state.oAuthTokenUrl = payload; },
    selectedApiServer(state, payload) { state.selectedApiServer = payload; }

  },
  plugins: [new VuexPersistence().plugin]
  
})
