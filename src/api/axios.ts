import axios from 'axios'

// axios 配置
axios.defaults.timeout = 10000
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
