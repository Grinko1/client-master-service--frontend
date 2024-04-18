import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface SignUpProps {
    email: string;
    password: string;
    role: string
}
interface SignUpResponse {
    token: string,
    userId: number
}

export const signUpService = createAsyncThunk<
    SignUpResponse,
    SignUpProps,
    ThunkConfig<string>
>(
    'login/signup',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;


        try {
            const response = await extra.api.post('/auth/sign-up', authData);
            if (!response.data) {
                throw new Error();
            }
            console.log("response /auth/sign-up", response);

            localStorage.setItem("TOKEN", `Bearer ${response.data.token}`);
            localStorage.setItem("userId", response.data.userId);

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
