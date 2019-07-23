import Vue from 'vue'
import Vuex from 'vuex'
import HomeModule from './module/home/home-module'
import PiginationModule from './module/common/pigination-module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
  },
  mutations: {
    set_userInfo(state: any, payload: any) {
      state.userInfo = payload;
    }
  },
  actions: {
    //
  },
  modules: {
    HomeModule,
    PiginationModule
  }
})
