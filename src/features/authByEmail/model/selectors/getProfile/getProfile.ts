import { StateSchema } from "@/app/providers/StoreProvider";

const profileDataFromLocalStorage = localStorage.getItem("profile");

const profile = profileDataFromLocalStorage !== null ? JSON.parse(profileDataFromLocalStorage) : null;
console.log(profile);
export const getProfileData = (state: StateSchema) => {
    const profileFromState = state.loginForm?.profile;
    return profileFromState !== undefined && profileFromState !== null ? profileFromState : profile;
};




// const profileStr = localStorage.getItem("profile") || ''
// let profile: Profile | null = null;


// if (profileStr) {
//     try {
//         profile = JSON.parse(profileStr);
//     } catch (error) {
//         console.error("Error parsing profile:", error);
//     }
// }

export const getProfileId = (state: StateSchema) => state.loginForm.profile.id || profile?.id;
export const getProfileName = (state: StateSchema) => state.loginForm.profile.name || profile?.name;
export const getProfilePhone = (state: StateSchema) => state.loginForm.profile.phone || profile?.phone;
export const getProfileDescription = (state: StateSchema) => state.loginForm.profile.description || profile?.description;