import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Master } from "../types/master";




export const getAllMasters = createAsyncThunk<Master[], void, ThunkConfig<string>>(
    'client/getAllMasters',
    async (id, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.get<Master[]>('/api/masters/visits');
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
