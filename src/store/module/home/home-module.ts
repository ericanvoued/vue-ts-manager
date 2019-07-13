const home = {
    namespaced:true,
     state: {
        list: ['kkk']
    },
    
     mutations: {
        set_xxx(state: any, payload: any) {
            console.log(payload)
        }
    }
}
export default home
