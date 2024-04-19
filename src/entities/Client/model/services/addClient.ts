import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientDataProps } from '../types/client';
import { getProfileId } from '@/entities/Profile/model/selectors/getProfile';
import { profileActions } from '@/entities/Profile';
interface ClientData {
  name?: string,
  phone?: string,
  user_id?: number
}

export const addClient = createAsyncThunk<Client, ClientData, ThunkConfig<string>>(
  'client/addClient',
  async (client, thunkApi) => {
    const { extra, rejectWithValue, dispatch, getState } = thunkApi;
    const userId = Number(localStorage.getItem("userId"))
    client.user_id = userId
    console.log("userId", userId);
    console.log("send", client);

    try {
      const response = await extra.api.post<Client>('/api/clients', client);
      console.log("add client", response);

      if (userId === response.data.user_id) {
        localStorage.setItem("profile", JSON.stringify({ id: response.data.id, name: response.data.name, phone: response.data.phone }))
        dispatch(profileActions.setId(response.data.id))
        dispatch(profileActions.setName(response.data.name))
        dispatch(profileActions.setPhone(response.data.phone))
      }
      if (!response) {
        return rejectWithValue('Something went wrong');
      }
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Something went wrong');
    }
  },
);

