import axios from 'axios';


export const $api = axios.create({
  // baseURL: __API__,
  baseURL: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json'
  }
});

$api.interceptors.request.use((config) => {
  if (config.url && config.url.endsWith('/auth/sign-in') || config.url && config.url.endsWith('/auth/sign-up')) {
    return config;
  }

  const token = localStorage.getItem("TOKEN");
  if (token) {
    if (config.headers) {
      console.log(token, " inside interseptors");

      config.headers.Authorization = token;
    }

  }
  return config;
});
