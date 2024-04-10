import { createSlice } from "@reduxjs/toolkit";
import { MastersSchema } from "../types/master";
import { getAllMasters } from "../services/getAllMasters";
import { addMaster } from "../services/addMaster";
import { updateMaster } from "../services/updateMaster";
import { deleteMaster } from "../services/deleteMaster";


const initialState: MastersSchema = {
    masters: [],
    form: {
        id: null,
        name: '',
        description: ''
    },
    isLoading: false,
    error: undefined
};

export const mastersSlice = createSlice({
    name: 'masters',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.form.id = action.payload
        },
        setName: (state, action) => {
            state.form.name = action.payload;
        },
        setDescription: (state, action) => {
            state.form.description = action.payload;
        },
        resetForm: (state) => {
            state.form.id = null;
            state.form.name = '',
                state.form.description = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMasters.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(getAllMasters.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;
            state.masters = action.payload;
        });
        builder.addCase(getAllMasters.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });
        builder.addCase(addMaster.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(addMaster.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;
            state.masters.push(action.payload);
        });
        builder.addCase(addMaster.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });
        builder.addCase(updateMaster.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(updateMaster.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;

        });
        builder.addCase(updateMaster.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });
        builder.addCase(deleteMaster.pending, (state, payload) => {
            state.isLoading = true
        });
        builder.addCase(deleteMaster.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;

        });
        builder.addCase(deleteMaster.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        });

    },
});

// Action creators are generated for each case reducer function
export const { actions: mastersActions } = mastersSlice;
export const { reducer: mastersReducer } = mastersSlice;
