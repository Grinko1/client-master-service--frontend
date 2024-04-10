import { StateSchema } from "@/app/providers/StoreProvider";

export const getClientsWithVisits = (state: StateSchema) => state.clientsWithVisits.clients;
export const getClientsWithVisitsLoading = (state: StateSchema) => state.clientsWithVisits.isLoading;
export const getClientsWithVisitsError = (state: StateSchema) => state.clientsWithVisits.error;
