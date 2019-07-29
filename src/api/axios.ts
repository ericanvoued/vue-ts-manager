import axios from 'axios'

let baseUrl: any = ''
if(location.href.indexOf('localhost')>-1) {
  baseUrl = "";
}else {
  baseUrl = "https://zkouge.cc";
}


// axios 配置
axios.defaults.timeout = 60000
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers['Access-Control-Allow-Origin'] = 'https://zkouge.cc';
axios.defaults.headers['access-control-expose-headers'] = 'Authorization';
// http request 设置请求信息
axios.interceptors.request.use((config:any) => {
    if (sessionStorage.token && sessionStorage.token !== null) {
      config.headers.Authorization = sessionStorage.token // `token ${store.state.token}`
    }
    return config
  },(err:any) => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use((response:any) => {
  let res: any = response.data;
  // if(res.hasOwnProperty("data") && res.data.hasOwnProperty('message') && res.data.message.indexOf('重新登录') > -1) {
  //   sessionStorage.removeItem("userInfo");
  //   setTimeout(() => {
  //     location.reload();
  //   }, 150)
    
  //   return
  // }
    return response
  },(error:any) => {
    if (error.code === 'ECONNABORTED') {
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          break
        case 500:
        case 504:
          // this.$router.push({'path': '/error'})
          break
      }
    }
    return Promise.reject(error.response.data)
  })

export default axios
