import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Visit } from "../types/visit";




export const getClientVisits = createAsyncThunk<Visit[], number, ThunkConfig<string>>(
    'visit/getClientVisits',
    async (clientId, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.get<Visit[]>(`/api/visits/client/${clientId}`);
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
