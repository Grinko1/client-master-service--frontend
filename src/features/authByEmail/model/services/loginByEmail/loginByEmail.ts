import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '../../types/loginSchema';

interface LoginByEmailProps {
  email: string;
  password: string;
  role: string
}
interface LoginResponse {
  token: string,
  profile: Profile
}

export const login = createAsyncThunk<
  LoginResponse,
  LoginByEmailProps,
  ThunkConfig<string>
>(
  'login/LoginByEmailProps',
  async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;


    try {
      const response = await extra.api.post('/auth/sign-in', authData);
      if (!response.data) {
        throw new Error();
      }
      console.log("response /auth/sign-in", response);

      localStorage.setItem("TOKEN", `Bearer ${response.data.token}`);
      if (response.data.profile !== null) {
        localStorage.setItem("profile", JSON.stringify(response.data.profile))
      }

      dispatch(userActions.login(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
