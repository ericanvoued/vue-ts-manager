import axios from './axios';

const baseUrl='/api';

export const findFormVersion=(obj)=>{
  return axios({
    url: `${baseUrl}/form/app/findFormVersion.do`,
    method: 'POST',
    dataType: 'json',
    data: obj
  })
}

export const xx=(obj)=>{
  return axios({
    url: `${baseUrl}/form/app/findFormVersion.do`,
    method: 'POST',
    dataType: 'json',
    data: obj
  })
}