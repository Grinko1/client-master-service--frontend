import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientDataProps } from '../types/client';
import { getProfileId, loginActions } from '@/features/authByEmail';



interface ClientData {
    id: number,
    name?: string,
    phone?: string,
    user_id?: number
}

export const updateClient = createAsyncThunk<Client, ClientData, ThunkConfig<string>>(
    'client/updateClient',
    async ({ id, name, phone }, thunkApi) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkApi;

        const currentUserId = getProfileId(getState());
        const userId = localStorage.getItem("userId")
        console.log(userId, name, phone);
        try {
            const response = await extra.api.patch<Client>(`/api/clients/${id}`, { id, name, phone, user_id: userId });
            console.log(response);
            if (currentUserId !== null && currentUserId === id) {
                localStorage.setItem("profile", JSON.stringify({ id, name, phone }))
                dispatch(loginActions.setProfileId(id))
                dispatch(loginActions.setProfileName(name))
                dispatch(loginActions.setProfilePhone(phone))
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

