import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const login = createAsyncThunk<
    string,
    LoginByEmailProps,
    ThunkConfig<string>
>(
  'login/LoginByEmailProps',
  async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

console.log(authData );

    try {
      const response = await extra.api.post('/auth/sign-in', authData);
      if (!response.data) {
        throw new Error();
      }
        console.log("response", response);
        
      localStorage.setItem("TOKEN", `Bearer ${response.data.token}`);
      dispatch(userActions.login(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
