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

   public userInfo(obj: any) {
    let params: any = {
      url: `/merchant/user/info`,
      method: "POST",
      dataType: "json",
      data: obj
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
