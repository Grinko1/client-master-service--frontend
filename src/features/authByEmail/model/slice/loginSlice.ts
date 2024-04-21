import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { login } from '../services/loginByEmail/loginByEmail';
import { roles } from '../../consts/consts';
import { signUpService } from '../services/signUp.ts/signUp';
import { logoutService } from '../services/logoutService';


const initialState: LoginSchema = {
  isLoading: false,
  userId: undefined,
  email: '',
  password: '',
  role: undefined,
  profile: {
    id: null,
    name: "",
    phone: "",
    description: ""
  }
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    setProfileId: (state, action) => {
      state.profile.id = action.payload
    },
    setProfileName: (state, action) => {
      state.profile.name = action.payload;
    },
    setProfilePhone: (state, action) => {
      state.profile.phone = action.payload;
    },
    setProfileDescription: (state, action) => {
      state.profile.description = action.payload
    },
    resetForm: (state) => {
      state.profile.id = null;
      state.profile.name = '',
        state.profile.phone = '',
        state.profile.description = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.role = roles.filter(r => r.id === action.payload.role)[0]
        if (action.payload.profile !== null) {
          state.profile.id = action.payload.profile.id
          state.profile.name = action.payload.profile.name
          state.profile.phone = action.payload.profile?.phone
          state.profile.description = action.payload.profile?.description
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signUpService.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(signUpService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload.userId
      })
      .addCase(signUpService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutService.fulfilled, (state, action) => {
        state.email = ''
        state.password = ''
        state.role = undefined
        state.profile = {
          id: null,
          name: "",
          phone: "",
          description: ""
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
