
import { createSlice } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";



const initialState: ProfileSchema = {

    id: null,
    name: '',
    phone: '',
    description: ""
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        resetForm: (state) => {
            state.id = null;
            state.name = '',
                state.phone = '',
                state.description = ''
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(addAppointment.pending, (state, payload) => {
        //     state.isLoading = true
        // });
        // builder.addCase(addAppointment.fulfilled, (state, action) => {
        //     state.error = undefined;
        //     state.isLoading = false;

        // });
        // builder.addCase(addAppointment.rejected, (state, action) => {
        //     state.error = action.payload;
        //     state.isLoading = false
        // });


    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
