import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  TOKEN } from '@/shared/const/localstorage';
import { UserSchema } from '../types/user';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = undefined;
      localStorage.removeItem(TOKEN);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(initAuthData.fulfilled, (state, { payload }: PayloadAction<string>) => {
    //   state.token = payload;
    //   state._inited = true;
    // });
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
