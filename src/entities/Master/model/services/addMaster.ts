import { createAsyncThunk } from "@reduxjs/toolkit";
import { Master, MasterDataProps } from "../types/master";
import { ThunkConfig } from "@/app/providers/StoreProvider";


export const addMaster = createAsyncThunk<Master, MasterDataProps, ThunkConfig<string>>(
    'master/addMaster',
    async (master, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.post<Master>('/api/masters', master);

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
