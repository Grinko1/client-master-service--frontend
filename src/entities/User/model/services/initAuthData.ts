import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { TOKEN } from '@/shared/const/localstorage';
import { LoginData } from '../types/user';
import { loginUser } from '../../api/userApi';

export const initAuthData = createAsyncThunk<LoginData , string, ThunkConfig<string>>(
  'user/initAuthData',
  async (user, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const token = localStorage.getItem(TOKEN);
    // if (!token) {
    //   return rejectWithValue('');
    // }
    try {
      const response = await dispatch(loginUser(user)).unwrap();
      console.log(response);
      

      if (!response) {
        return rejectWithValue('');
      }
      localStorage.setItem(
        TOKEN,
        response.email
      );
      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue('');
    }
  },
);
