import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Visit } from "../types/visit";




export const getMasterVisits = createAsyncThunk<Visit[], number, ThunkConfig<string>>(
    'visit/getMasterVisits',
    async (masterId, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.get<Visit[]>(`/api/visits/master/${masterId}`);
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
