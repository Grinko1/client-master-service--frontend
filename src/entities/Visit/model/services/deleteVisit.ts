import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVisits } from "./getAllVisits";



export const deleteVisit = createAsyncThunk<void, number, ThunkConfig<string>>(
    'visit/deleteVisit',
    async (id, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.delete(`/api/visits/${id}`);
            console.log(response);
            dispatch(getAllVisits())
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
