import axios from "./axios";


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

  public logOut(obj: any) {
    let params: any = {
      url: `/merchant/logout`,
      method: "POST",
      dataType: "json",
      data: obj
    };
    return axios(params);
  }

  public getUserInfo() {
    // Object.keys(obj).map((item: any) => {
    //   url += item + '=' + obj[item] + '&'
    // })
    let params: any = {
      url: `/merchant/userquery`,
      method: "GET",
    }
     return axios(params);  
  }

   public depositlist(url: any, obj: any) {
     Object.keys(obj).map((item: any) => {
       url += item + '=' + obj[item] + '&'
     })
    let params: any = {
      url: url,
      method: "GET",
    }
      return axios(params);  
  }


  public statistics(obj: any) {
    let params: any = {
      url: `/merchant/statistics?totime=${obj.totime}`,
      method: "GET",
    }
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
  //下发卡列表
  public getcardList(obj: any) {
    let params: any = {
      url: `/merchant/withdrawbank`,
      method: "GET",      
    };
    return axios(params);
  }
  //查看余额
  public seeBalance(obj: any) {
    let params: any = {
      url: `/merchant/balance`,
      method: "GET",      
    };
    return axios(params);
  }
  //提现下发
  public withdraw(obj: any) {
    let params: any = {
      url: `/merchant/withdraw`,
      method: "POST",
      dataType: "json",
      data: obj     
    };
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
