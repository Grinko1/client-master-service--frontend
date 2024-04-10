import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientWithVisits, ClientsWithVisitsSchema } from '../types/client';
import { getAllClientsWithVisits } from '../services/getAllClientsWithVisits';


const initialState: ClientsWithVisitsSchema = {
    clients:[],
    form:{
      name:'',
      phone:''
    },
    isLoading:false,
    error:undefined
};

export const clientsWithVisitsSlice = createSlice({
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
    builder.addCase(getAllClientsWithVisits.pending, (state, payload) => {
        state.isLoading =true
      });
      builder.addCase(getAllClientsWithVisits.fulfilled, (state, action) => {
        state.error = undefined;
        state.isLoading =false;
        state.clients = action.payload;
      });
    builder.addCase(getAllClientsWithVisits.rejected, (state, payload) => {
      state.error = "Something went wrong";
      state.isLoading =false
    });

  },
});

// Action creators are generated for each case reducer function
export const { actions: clientsVisitsActions } = clientsWithVisitsSlice;
export const { reducer: clientsVisitsReducer } = clientsWithVisitsSlice;
