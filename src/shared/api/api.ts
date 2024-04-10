import axios from 'axios';
import { TOKEN } from '@/shared/const/localstorage';

export const $api = axios.create({
  // baseURL: __API__,
  baseURL:"http://localhost:8080",
  headers: {
    'Content-Type': 'application/json'
  }
});

$api.interceptors.request.use((config) => {
  // if (config.headers) {
  //   config.headers.Authorization = localStorage.getItem(TOKEN) || '';
  // }
  // return config;
  const token = localStorage.getItem("TOKEN");
  if (token) {
    if(config.headers){
      console.log(token, " inside interseptors");
      
      config.headers.Authorization = token;
    }
    
  }
  return config;
});
