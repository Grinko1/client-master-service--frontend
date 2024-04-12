import { StateSchema } from "@/app/providers/StoreProvider";


export const getVisitsList = (state: StateSchema) => state.visits.visits;
export const getVisitError = (state: StateSchema) => state.visits.error;
export const getVisitIsLoading = (state: StateSchema) => state.visits.isLoading;
