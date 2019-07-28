import axios from "./axios";
// const baseUrl = "https://zkouge.cc/merchant";

export class ApiList {

  public login(obj: any) {
    let params: any = {
      url: `/merchant/login`,
      method: "POST",
      dataType: "json",
      data: obj
    };
    return axios(params);
  }
  //注册
  public register(obj: any) {
    let params: any = {
      url: `/merchant/register`,
      method: "POST",
      dataType: "json",
      data: obj
    };
    return axios(params);
  }
  // public logOut(obj: any) {
  //   let params: any = {
  //     url: `/merchant/logout`,
  //     method: "POST",
  //     dataType: "json",
  //     data: obj
  //   };
  //   return axios(params);
  // }

   public depositlist(url: any, obj: any) {
     Object.keys(obj).map((item: any) => {
       url += item + '=' + obj[item] + '&'
     })
    let params: any = {
      url: url,
      // url: `/merchant/depositlist?begin_time=${obj.begin_time}&end_time=&{obj.end_time}&listtype=${obj.listtype}`,
      // url: `/merchant/depositlist?` + qs.stringfy(obj),
      method: "GET",
    }
      return axios(params);  
  }

  public getUserInfo() {
    
  }

  public statistics(obj: any) {
    let params: any = {
      url: `/merchant/statistics?totime=${obj.totime}`,
      method: "GET",
    }
      return axios(params);
      
  }
}
// username  password code
// export const login = obj => {

// };
// export const userInfo = obj => {

// };

// export const xx = obj => {
//   return axios({
//     url: `${baseUrl}/form/app/findFormVersion.do`,
//     method: "POST",
//     dataType: "json",
//     data: obj
//   });
// };

// export default {
//   login,
//   userInfo,
// }
