import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Visit } from "../types/visit";




export const getAllVisits = createAsyncThunk<Visit[], void, ThunkConfig<string>>(
    'visit/getAllVisits',
    async (id, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.get<Visit[]>('/api/visits');
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
