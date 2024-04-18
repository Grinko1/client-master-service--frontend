import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client, ClientsSchema } from '../types/client';
import { getAllClients } from '../services/getAllClients';
import { addClient } from '../services/addClient';
import { updateClient } from '../services/updateClient';
import { deleteClient } from '../services/deleteClient';

const initialState: ClientsSchema = {
  clients: [],
  form: {
    id: null,
    name: '',
    phone: ''
  },

  isLoading: false,
  error: undefined
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.form.id = action.payload
    },
    setName: (state, action) => {
      state.form.name = action.payload;
    },
    setPhone: (state, action) => {
      state.form.phone = action.payload;
    },
    resetForm: (state) => {
      state.form.id = null;
      state.form.name = '',
        state.form.phone = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClients.pending, (state, payload) => {
      state.isLoading = true
    });
    builder.addCase(getAllClients.fulfilled, (state, action) => {
      state.error = undefined;
      state.isLoading = false;
      state.clients = action.payload;
    });
    builder.addCase(getAllClients.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false
    });
    builder.addCase(addClient.pending, (state, payload) => {
      state.isLoading = true
    });
    builder.addCase(addClient.fulfilled, (state, action) => {
      state.error = undefined;
      state.isLoading = false;
      state.clients.push(action.payload);
    });
    builder.addCase(addClient.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false
    });
    builder.addCase(updateClient.pending, (state, payload) => {
      state.isLoading = true
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.error = undefined;
      state.isLoading = false;
      state.form.id = action.payload.id
      state.form.name = action.payload.name
      state.form.phone = action.payload.phone
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false
    });
    builder.addCase(deleteClient.pending, (state, payload) => {
      state.isLoading = true
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state.error = undefined;
      state.isLoading = false;
    });
    builder.addCase(deleteClient.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: clientsActions } = clientsSlice;
export const { reducer: clientsReducer } = clientsSlice;
