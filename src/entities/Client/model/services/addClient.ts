import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientDataProps } from '../types/client';


export const addClient = createAsyncThunk<Client, ClientDataProps, ThunkConfig<string>>(
  'client/addClient',
  async (client, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;


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

