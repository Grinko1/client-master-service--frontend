import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientForm } from '../types/client';

interface UpdateClientProps {
    id: number;
    form: ClientForm;

}

export const updateClient = createAsyncThunk<Client, UpdateClientProps, ThunkConfig<string>>(
    'client/updateClient',
    async ({ id, form }, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;
        form.id = id;
        console.log(form);

        try {
            const response = await extra.api.patch<Client>(`/api/clients/${id}`, form);
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

