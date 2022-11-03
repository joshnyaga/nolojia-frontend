import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};
export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = true;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = true;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});
export default userSlice.reducer;
export const { loginStart, loginSuccess, loginFailure, updateUser, logout } =
  userSlice.actions;
