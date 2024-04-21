import { createAsyncThunk } from "@reduxjs/toolkit";
import { Master, MasterDataProps } from "../types/master";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { loginActions } from "@/features/authByEmail";


interface MasterData {
    name?: string,
    description?: string,
    user_id?: number

}

export const addMaster = createAsyncThunk<Master, MasterData, ThunkConfig<string>>(
    'master/addMaster',
    async (master, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;
        const userId = Number(localStorage.getItem("userId"))
        master.user_id = userId
        console.log("send", master);

        try {
            const response = await extra.api.post<Master>('/api/masters', master);
            console.log("add client", response);

            if (userId === response.data.user_id) {
                localStorage.setItem("profile", JSON.stringify({ id: response.data.id, name: response.data.name, description: response.data.description }))
                dispatch(loginActions.setProfileId(response.data.id))
                dispatch(loginActions.setProfileName(response.data.name))
                dispatch(loginActions.setProfileDescription(response.data.description))
            }
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
