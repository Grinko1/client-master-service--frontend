import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { loginActions } from '../slice/loginSlice';
import { Dispatch } from 'react';



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
            // dispatch(loginActions.logout());

        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

// export const logoutService = () => {
//     return (dispatch: Dispatch<any>) => {
//         try {
//             localStorage.removeItem("TOKEN")
//             localStorage.removeItem("email")
//             localStorage.removeItem("role")
//             localStorage.removeItem("profile")
//             dispatch(loginActions.logout());
//         } catch (e) {
//             console.log(e);
//         }
//     };
// };