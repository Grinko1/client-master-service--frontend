import { StateSchema } from "@/app/providers/StoreProvider";

const profileDataFromLocalStorage = localStorage.getItem("profile");
const profile = profileDataFromLocalStorage !== null ? JSON.parse(profileDataFromLocalStorage) : null;

export const getProfileData = (state: StateSchema) => {
    const profileFromState = state.loginForm?.profile;
    return profileFromState !== undefined && profileFromState !== null ? profileFromState : profile;
};