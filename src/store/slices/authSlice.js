import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.userToken = action.payload.token;
      state.isLoading = false;
    },
    signOut: (state) => {
      state.userToken = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
