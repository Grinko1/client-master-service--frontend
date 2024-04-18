import { StateSchema } from "@/app/providers/StoreProvider";
import { Profile, Role } from "@/features/authByEmail/model/types/loginSchema";

const profileStr = localStorage.getItem("profile") || ''
let profile: Profile | null = null;


if (profileStr) {
    try {
        profile = JSON.parse(profileStr);
    } catch (error) {
        console.error("Error parsing profile:", error);
    }
}

export const getProfileId = (state: StateSchema) => state.profile.id || profile?.id;
export const getProfileName = (state: StateSchema) => state.profile.name || profile?.name;
export const getProfilePhone = (state: StateSchema) => state.profile.phone || profile?.phone;
export const getProfileDescription = (state: StateSchema) => state.profile.description || profile?.description;