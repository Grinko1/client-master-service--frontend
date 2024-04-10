import { StateSchema } from "@/app/providers/StoreProvider";

export const getClientsList = (state: StateSchema) => state.clients.clients;
export const getClientsListLoading = (state: StateSchema) => state.clients.isLoading;
export const getClientsListError = (state: StateSchema) => state.clients.error;
