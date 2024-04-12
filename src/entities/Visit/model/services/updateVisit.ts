import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Visit, VisitDataForm } from "../types/visit";



export const updateVisit = createAsyncThunk<Visit, VisitDataForm, ThunkConfig<string>>(
    'visit/updateVisit',
    async (visit, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;
        console.log("updateVisit", visit.time);

        try {
            const response = await extra.api.patch<Visit>(`/api/visits/${visit.id}`, visit);
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