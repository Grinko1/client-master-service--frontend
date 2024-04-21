import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';



export const logoutService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'login/logoutService',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;


        try {

            localStorage.removeItem("TOKEN")
            localStorage.removeItem("email")
            localStorage.removeItem("role")
            localStorage.removeItem("profile")
            localStorage.removeItem("userId")

        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

