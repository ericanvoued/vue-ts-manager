const HomeModule = {
  //   namespaced: true,
  state: {
    editableTabs2: [
      {
        title: "订单列表",
        name: "1",
        url: "/home/table/1/订单管理/订单列表"
      }
    ],
    tabIndex: 2,
    editableTabsValue2: "1"
  },

  mutations: {
    add_editableTabs(state: any, payload: any) {
      state.tabIndex = parseInt(state.tabIndex) + 1;
      let newTabName = state.tabIndex + "";
      state.editableTabs2.push({
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
