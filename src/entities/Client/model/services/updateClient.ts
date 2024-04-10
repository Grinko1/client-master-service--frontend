import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientDataProps } from '../types/client';



export const updateClient = createAsyncThunk<Client, ClientDataProps, ThunkConfig<string>>(
    'client/updateClient',
    async ({ id, name, phone }, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.patch<Client>(`/api/clients/${id}`, { id, name, phone });
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

