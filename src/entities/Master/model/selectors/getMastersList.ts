import { StateSchema } from "@/app/providers/StoreProvider";


export const getMastersList = (state: StateSchema) => state.masters.masters;
