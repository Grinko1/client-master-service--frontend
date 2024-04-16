import { createSlice } from "@reduxjs/toolkit";
import { addAppointment } from "../services/addAppointment";
import { Appointment } from "../types/appointment";



const initialState: Appointment = {

    form: {
        date: "",
        time: "",
        masterId: null,
        clientId: null
    },
    isLoading: false,
    error: undefined
};

export const mastersSlice = createSlice({
    name: 'masters',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.form.date = action.payload
        },
        setTime: (state, action) => {
            state.form.time = action.payload;
        },
        setMasterId: (state, action) => {
            state.form.masterId = action.payload;
        },
        resetForm: (state) => {
            state.form.date = "";
            state.form.time = '',
                state.form.masterId = null,
                state.form.clientId = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addAppointment.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(addAppointment.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;

        });
        builder.addCase(addAppointment.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });


    },
});

// Action creators are generated for each case reducer function
export const { actions: mastersActions } = mastersSlice;
export const { reducer: mastersReducer } = mastersSlice;
