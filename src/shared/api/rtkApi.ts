import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("TOKEN") || '';
      console.log("rtkApi inside" ,token);
      
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
