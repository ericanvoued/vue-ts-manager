const PaginationModule = {
    // namespaced: false,
  state: {
    page:1,
    total:1000,
  },

  mutations: {
    go_page_mua(state: any, payload: number){
      state.total = payload
    }
  },
  actions:{
    go_page_action({ commit }: any, payload:number) {
      commit('go_page_mua',payload)
    }
  }
};
export default PaginationModule;
