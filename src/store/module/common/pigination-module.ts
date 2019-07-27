const PaginationModule = {
    // namespaced: false,
  state: {
    page:1,
    total:10,
  },

  mutations: {
    go_page_mua(state: any, payload: number){
      state.page = payload
    },
    total_mua(state: any, payload: number){
      state.total = payload
    }
  },
  actions:{
    go_page_action({ commit }: any, payload:number) {
      commit('go_page_mua',payload)
    },
    total_action({ commit }: any, payload:number){
      commit('total_mua',payload)
    }
  }
};
export default PaginationModule;
