import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Visit, VisitDataForm } from "../types/visit";


export const addVisit = createAsyncThunk<Visit, VisitDataForm, ThunkConfig<string>>(
    'visit/addVisit',
    async (visit, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;


        try {
            const response = await extra.api.post<Visit>('/api/visits', visit);

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
