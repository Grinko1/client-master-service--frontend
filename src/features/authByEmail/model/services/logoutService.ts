import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { loginActions } from '../slice/loginSlice';



export const logoutService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'login/logoutService',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;


        try {
            // const response = await extra.api.post('/auth/sign-in', authData);
            // if (!response.data) {
            //     throw new Error();
            // }
            // console.log("response", response);

            localStorage.removeItem("TOKEN")
            localStorage.removeItem("email")
            localStorage.removeItem("role")
            dispatch(loginActions.logout());

        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
