import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client, ClientsSchema } from '../types/client';
import { getAllClients } from '../services/getAllClients';
import { addClient } from '../services/addClient';

const initialState: ClientsSchema = {
    clients:[],
    form:{
      name:'',
      phone:''
    },
    isLoading:false,
    error:undefined
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setName:(state, action) =>{
      state.form.name = action.payload;
    },
    setPhone:(state, action) =>{
      state.form.phone = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClients.pending, (state, payload) => {
        state.isLoading =true
      });
      builder.addCase(getAllClients.fulfilled, (state, action) => {
        state.error = undefined;
        state.isLoading =false;
        state.clients = action.payload;
      });
    builder.addCase(getAllClients.rejected, (state, payload) => {
      state.error = "Something went wrong";
      state.isLoading =false
    });
    builder.addCase(addClient.pending, (state, payload) => {
      state.isLoading =true
    });
    builder.addCase(addClient.fulfilled, (state, action) => {
      state.error = undefined;
      state.isLoading =false;
      state.clients.push(action.payload);
    });
  builder.addCase(addClient.rejected, (state, payload) => {
    state.error = "Something went wrong";
    state.isLoading =false
  });
  },
});

// Action creators are generated for each case reducer function
export const { actions: clientsActions } = clientsSlice;
export const { reducer: clientsReducer } = clientsSlice;
