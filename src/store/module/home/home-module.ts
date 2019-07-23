const HomeModule = {
  //   namespaced: true,
  state: {
    editableTabs2: [
    ],
    formParams: null,
    tabIndex: 2,
    editableTabsValue2: "1"
  },

  mutations: {
    set_formParams(state: any, payload: any) {
      state.formParams = payload;
    },
    // set_editableTabs2(state: any, payload: any) {
    //   state.editableTabs2 = payload;
    // },
    add_editableTabs(state: any, payload: any) {
      state.editableTabs2.map((item: any, index: any) => {
        if(item.title == payload.title) {
          state.editableTabsValue2 = item.name +'';
          return;
        }
      })
      state.tabIndex = parseInt(state.tabIndex) + 1;
      let newTabName: any = state.tabIndex + "";
      state.editableTabs2.push({
        ...payload,
        url: payload.url,
        title: payload.title,
        name: newTabName
      });
      state.editableTabsValue2 = newTabName;
    },
    remove_editableTabs(state: any, payload: any) {
      if (state.editableTabs2.length == 1) {
        return;
      }
      let tabs = state.editableTabs2;
      let activeName = state.editableTabsValue2;
      if (activeName === payload.targetName) {
        tabs.forEach((tab: any, index: any) => {
          if (tab.name === payload.targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      state.editableTabsValue2 = activeName;
      state.editableTabs2 = tabs.filter(
        (tab: any) => tab.name !== payload.targetName
      );
    }
  }
};
export default HomeModule;
