import { rtkApi } from '@/shared/api/rtkApi';
import { LoginData } from '../model/types/user';


// interface SetJsonSettingsArg {
//   userId: string;

// }

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
    //   query: ({ userId }) => ({
    //     url: '/users/' + userId,
    //     method: 'PATCH',
    //     body: {  },
    //   }),
    // }),
    login: build.mutation<LoginData, string>({
      query: (data) => ({
        url: '/users/',
        method: 'POST',
        body:{data}
      }),
    }),
  }),
});


export const loginUser = userApi.endpoints.login.initiate;
