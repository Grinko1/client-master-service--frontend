import { StateSchema } from "@/app/providers/StoreProvider";


export const getVisitForm = (state: StateSchema) => state.visits.form;