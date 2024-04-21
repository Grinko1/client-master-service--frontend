import { createSlice } from "@reduxjs/toolkit";
import { VisitsSchema } from "../types/visit";
import { getAllVisits } from "../services/getAllVisits";
import { addVisit } from "../services/addVisit";
import { updateVisit } from "../services/updateVisit";
import { deleteVisit } from "../services/deleteVisit";
import { getClientVisits } from "../services/getClientVisits";
import { getMasterVisits } from "../services/getMasterVisits";


const initialState: VisitsSchema = {
    visits: [],
    form: {
        id: null,
        date: '',
        time: '',
        clientId: null,
        masterId: null
    },
    isLoading: false,
    error: undefined
};

export const visitsSlice = createSlice({
    name: 'visits',
    initialState,
    reducers: {
        setForm: (state, action) => {
            state.form = action.payload
        },
        setDate: (state, action) => {
            state.form.date = action.payload;
        },
        setTime: (state, action) => {
            state.form.time = action.payload;
        },
        setMasterId: (state, action) => {
            state.form.masterId = action.payload;
        },
        setClientId: (state, action) => {
            state.form.clientId = action.payload;
        },
        resetForm: (state) => {
            state.form.id = null;
            state.form.date = '',
                state.form.time = '',
                state.form.clientId = null,
                state.form.masterId = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVisits.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(getAllVisits.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;
            state.visits = action.payload;
        });
        builder.addCase(getAllVisits.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });
        builder.addCase(getClientVisits.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(getClientVisits.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;
            state.visits = action.payload;
        });
        builder.addCase(getClientVisits.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });
        builder.addCase(getMasterVisits.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(getMasterVisits.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;
            state.visits = action.payload;
        });
        builder.addCase(getMasterVisits.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });

        builder.addCase(addVisit.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(addVisit.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;
            state.visits.push(action.payload);
        });
        builder.addCase(addVisit.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });

        builder.addCase(updateVisit.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(updateVisit.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;

        });
        builder.addCase(updateVisit.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });

        builder.addCase(deleteVisit.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(deleteVisit.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;

        });
        builder.addCase(deleteVisit.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });

    },
});

// Action creators are generated for each case reducer function
export const { actions: visitsActions } = visitsSlice;
export const { reducer: visitsReducer } = visitsSlice;
