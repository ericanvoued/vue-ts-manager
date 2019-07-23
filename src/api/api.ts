import axios from "./axios";
const baseUrl = "https://zkouge.cc/merchant";
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

   public depositlist(obj: any) {
    let params: any = {
      url: `/merchant/depositlist?begin_time=${obj.begin_time}&end_time=&{obj.end_time}&listtype=${obj.listtype}`,
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
