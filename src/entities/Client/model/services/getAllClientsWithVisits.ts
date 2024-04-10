import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Client } from '../types/client';




export const getAllClientsWithVisits = createAsyncThunk<Client[], void, ThunkConfig<string>>(
  'client/getAllClients',
  async (id, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;


    try {
      const response = await extra.api.get<Client[]>('/api/clients/visits');
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

