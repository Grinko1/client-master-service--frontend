import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Client, ClientDataProps } from '@/entities/Client/model/types/client';
import { addClient } from '@/entities/Client/model/services/addClient';
import { Visit, VisitDataForm } from '@/entities/Visit/model/types/visit';

export interface AppointmentDataProps {
    client: ClientDataProps,
    visit: VisitDataForm
}


export const addAppointment = createAsyncThunk<Client, AppointmentDataProps, ThunkConfig<string>>(
    'appointment/addAppointment',
    async (data, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.post<Client>('/api/visits', data.client);

            //
            data.visit.clientId = response.data.id;
            console.log(response.data.id);
            const response2 = await extra.api.post<Visit>('/api/visits', data.visit);

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
