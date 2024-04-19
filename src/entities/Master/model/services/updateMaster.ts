import { createAsyncThunk } from "@reduxjs/toolkit";
import { Master, MasterDataProps } from "../types/master";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getProfileId } from "@/entities/Profile/model/selectors/getProfile";
import { profileActions } from "@/entities/Profile";

interface MasterData {
    id: number,
    name?: string,
    description?: string,
    user_id?: number

}


export const updateMaster = createAsyncThunk<Master, MasterData, ThunkConfig<string>>(
    'master/updateMaster',
    async ({ id, name, description }, thunkApi) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkApi;

        const currentUserId = getProfileId(getState());
        const userId = localStorage.getItem("userId")
        try {
            const response = await extra.api.patch<Master>(`/api/masters/${id}`, { id, name, description, user_id: userId });
            console.log(response);
            if (currentUserId !== null && currentUserId === id) {
                localStorage.setItem("profile", JSON.stringify({ id, name, description }))
                dispatch(profileActions.setId(id))
                dispatch(profileActions.setName(name))
                dispatch(profileActions.setDescription(description))
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