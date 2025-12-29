import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService, LoginPayload } from "../../api/services/auth.service";
import { authToken } from "../../api/http/authToken";
import { currentUser, UserInfo } from "../../utils/currentUser";
import { getApiErrorMessage } from "../../utils/error";

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: currentUser.get(),
  token: authToken.get(),
  isLoading: false,
  error: null,
  isAuthenticated: !!authToken.get(),
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);
      if (response?.token) {
        authToken.set(response.token);
        const user = { email: payload.username };
        currentUser.set(user);
        return { token: response.token, user };
      }
      return rejectWithValue("No token received");
    } catch (err: any) {
      return rejectWithValue(getApiErrorMessage(err, "Login failed"));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      authToken.remove();
      currentUser.remove();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
