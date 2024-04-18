import { StateSchema } from "@/app/providers/StoreProvider";


export const getClientId = (state: StateSchema) => state.clients.form.id
export const getClientName = (state: StateSchema) => state.clients.form.name
export const getClientNPhone = (state: StateSchema) => state.clients.form.phone
export const getClientsListLoading = (state: StateSchema) => state.clients.isLoading;
export const getClientsListError = (state: StateSchema) => state.clients.error;