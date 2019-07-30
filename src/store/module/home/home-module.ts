import { ApiList } from "../../../api/api";
import store from '@/store';
let apiList = new ApiList();


const HomeModule = {
  //   namespaced: true,
  state: {
    tableList: [],
    editableTabs2: [],
    formParams: null,
    tabIndex: 2,
    loading: false,
    editableTabsValue2: "1",
    addbackcardflag: false,
  },

  mutations: {
    set_addbackcardflag(state: any, payload: any){
      state.addbackcardflag = payload;
    },
    set_tableLoading(state: any, payload: any) {
      state.loading = payload;
    },
    set_tableList(state: any, payload: any) {
      state.tableList = payload;
    },
    set_formParams(state: any, payload: any) {
      state.formParams = payload;
    },
    add_editableTabs(state: any, payload: any) {
      state.editableTabs2.map((item: any, index: any) => {
        if (item.title == payload.title) {
          state.editableTabsValue2 = item.name + "";
          return;
        }
      });
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
  },

  actions: {
    getTableList(context: any, payload: any) {
      context.commit("set_tableList", []);
      context.commit('set_tableLoading', true);
      apiList.depositlist(payload.url, payload.params).then((data: any) => {
        console.log(data.data.data)
        if(payload.url == '/merchant/statistics?') {
          data.data.map((item: any) => {
            Object.keys(item).map((key: any) => {
              if(context.state.formParams.hasOwnProperty(key)) {
                item[key] = context.state.formParams[key][item[key]]
              }
            })
          })
        }else {
          data.data.data.map((item: any) => {
            Object.keys(item).map((key: any) => {
              if(context.state.formParams.hasOwnProperty(key)) {
                console.log(key)
                item[key] = context.state.formParams[key][item[key]]
              }
            })
          })
        }
        
        context.commit('set_tableLoading', false);
        if(window.location.href.indexOf(encodeURI('商户流量统计'))>-1) {
          context.commit("set_tableList", data.data);
        }else {
          context.commit("set_tableList", data.data.data);
          store.dispatch("total_action", data.data.total);
        }
      });
    }
  }
};
export default HomeModule;
