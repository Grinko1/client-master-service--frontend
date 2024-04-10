import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMasters } from "./getAllMasters";



export const deleteMaster = createAsyncThunk<void, number, ThunkConfig<string>>(
    'master/deleteMaster',
    async (id, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.delete(`/api/masters/${id}`);
            console.log(response);
            dispatch(getAllMasters())
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
