import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '../../types/loginSchema';
import { roles } from '@/features/authByEmail/consts/consts';
import { profileActions } from '@/entities/Profile';

interface LoginByEmailProps {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string,
  profile: Profile
  role: string
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
      const role = roles.filter(r => r.id === response.data.role)

      localStorage.setItem("role", JSON.stringify(role[0] || role))

      localStorage.setItem("TOKEN", `Bearer ${response.data.token}`);
      localStorage.setItem("userId", response.data.userId);
      if (response.data.profile !== null) {
        localStorage.setItem("profile", JSON.stringify(response.data.profile))
        dispatch(profileActions.setId(response.data.profile.id))
        dispatch(profileActions.setName(response.data.profile.name))
        dispatch(profileActions.setPhone(response.data.profile.phone))
      }

      dispatch(userActions.login(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
