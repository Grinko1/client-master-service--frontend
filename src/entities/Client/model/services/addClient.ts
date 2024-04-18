import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientDataProps } from '../types/client';
interface ClientData {
  name?: string,
  phone?: string,
  userId?: number
}

export const addClient = createAsyncThunk<Client, ClientData, ThunkConfig<string>>(
  'client/addClient',
  async (client, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;
    const userId = Number(localStorage.getItem("userId"))
    client.userId = userId
    console.log("userId", userId);
    console.log("client", client);

    try {
      const response = await extra.api.post<Client>('/api/clients', client);

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

