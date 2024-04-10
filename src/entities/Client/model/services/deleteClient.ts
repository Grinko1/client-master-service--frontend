import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllClients } from "./getAllClients";


export const deleteClient = createAsyncThunk<void, number, ThunkConfig<string>>(
    'client/deleteClient',
    async (id, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.delete(`/api/clients/${id}`);
            console.log(response);
            dispatch(getAllClients())
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

