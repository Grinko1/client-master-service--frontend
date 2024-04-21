import { ThunkConfig } from "@/app/providers/StoreProvider";
import { loginUser } from "@/entities/User/api/userApi";
import { LoginData } from "@/entities/User/model/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLoginRole } from "../../selectors/getLoginRole/getLoginRole";
import { getLoginEmail } from "../../selectors/getLoginEmail/getLoginEmail";
import { getProfileData, getProfileDescription, getProfileId, getProfileName, getProfilePhone } from "../../selectors/getProfile/getProfile";
import { loginActions } from "../../slice/loginSlice";


export const initAuthData = createAsyncThunk<void, void, ThunkConfig<string>>(
    'login/initAuthData',
    async (user, thunkApi) => {
        const { rejectWithValue, dispatch, getState } = thunkApi;

        const token = localStorage.getItem("TOKEN");
        const email = getLoginEmail(getState());
        const role = getLoginRole(getState())
        const profileId = getProfileId(getState())
        const profileName = getProfileName(getState())
        const profilePhone = getProfilePhone(getState())
        const profileDescription = getProfileDescription(getState())

        console.log("init service", email, role, profileId, profileName, profilePhone, profileDescription);
        // if (!token) {
        //   return rejectWithValue('');
        // }
        try {
            dispatch(loginActions.setEmail(email))
            dispatch(loginActions.setRole(role))
            dispatch(loginActions.setProfileId(profileId))
            dispatch(loginActions.setProfileName(profileName))
            dispatch(loginActions.setProfilePhone(profilePhone))
            dispatch(loginActions.setProfileDescription(profileDescription))
            dispatch(loginActions.setInited())


        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);
