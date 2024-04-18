import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { login } from '../services/loginByEmail/loginByEmail';
import { roles } from '../../consts/consts';
import { signUpService } from '../services/signUp.ts/signUp';


const initialState: LoginSchema = {
  isLoading: false,
  userId: undefined,
  email: '',
  password: '',
  role: roles[1],
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
    logout: (state) => {
      state.email = ''
      state.password = ''
      state.role = undefined
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
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
