import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface TokenResponse {
  refresh: string;
  access: string;
  user: User;
}


interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest{
  email: string;
  password: string;
  role: string;
  first_name: string;
  last_name?: string;
}



interface AuthState {
  loading: boolean;
  error: string | null;
  auth: TokenResponse | null

}

const initialState: AuthState = {
  loading: false,
  error: null,
  auth: null
};

export const login = createAsyncThunk<
  TokenResponse, 
  LoginRequest, 
  { rejectValue: string }
>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
   
    try {
        const response = await axios.request({
          baseURL: `http://localhost:8000/user/login/`,
          timeout: 10000,
          data: payload,
          method: "POST",
        });
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.token);
        localStorage.setItem('userDetails', JSON.stringify(response.data.user));
        return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Invalid Credentials"
      );
    }
  }
);

export const register = createAsyncThunk<
  TokenResponse, 
  RegisterRequest, 
  { rejectValue: string }
>(
  "auth/register",
  async ( payload, { rejectWithValue }) => {
   
    try {
        
        const response = await axios.request({
          baseURL: `http://localhost:8000/user/register/`,
          timeout: 10000,
          data: payload,
          method: "POST",
        });

        return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Email Already Exist"
      );
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.auth = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<TokenResponse>) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid Credentials";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<TokenResponse>) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Email Already Exists";
      })
     
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
