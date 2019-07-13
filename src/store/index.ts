import Vue from 'vue'
import Vuex from 'vuex'
import HomeModule from './module/home/home-module'
import PiginationModule from './module/common/pigination-module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:'ooo'
  },
  mutations: {
    
  },
  actions: {
    //
  },
  modules: {
    HomeModule,
    PiginationModule
  }
})
