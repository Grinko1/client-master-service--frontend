import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientForm } from '../types/client';


export const addClient = createAsyncThunk<Client, ClientForm, ThunkConfig<string>>(
  'client/addClient',
  async ( client,thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    
    try {
    const response = await extra.api.post<Client>('/api/clients', client);
            console.log(response);
            
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

