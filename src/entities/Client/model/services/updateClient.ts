import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Client, ClientDataProps } from '../types/client';
import { getClientId } from '../selectors/getClientForm/getClientForm';
import { clientsActions } from '../slices/clientsSlice';
import { getProfileId } from '@/entities/Profile/model/selectors/getProfile';
import { profileActions } from '@/entities/Profile';


interface ClientData {
    id: number,
    name?: string,
    phone?: string,
    userId?: number
}

export const updateClient = createAsyncThunk<Client, ClientData, ThunkConfig<string>>(
    'client/updateClient',
    async ({ id, name, phone }, thunkApi) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkApi;

        const currentUserId = getProfileId(getState());
        const userId = localStorage.getItem("userId")
        try {
            const response = await extra.api.patch<Client>(`/api/clients/${id}`, { id, name, phone, userId });
            console.log(response);
            if (currentUserId !== null && currentUserId === id) {
                localStorage.setItem("profile", JSON.stringify({ id, name, phone }))
                dispatch(profileActions.setId(id))
                dispatch(profileActions.setName(name))
                dispatch(profileActions.setPhone(phone))
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

