import { createAsyncThunk } from "@reduxjs/toolkit";
import { Master, MasterDataProps } from "../types/master";
import { ThunkConfig } from "@/app/providers/StoreProvider";

interface MasterData {
    id: number,
    name?: string,
    description?: string

}


export const updateMaster = createAsyncThunk<Master, MasterData, ThunkConfig<string>>(
    'master/updateMaster',
    async ({ id, name, description }, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.patch<Master>(`/api/masters/${id}`, { id, name, description });
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