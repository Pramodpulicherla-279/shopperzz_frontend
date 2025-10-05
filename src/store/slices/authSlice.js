import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null, // This will store an object like { name: '...' }
  isAuthenticated: false, // Corrected typo from isAuthencated
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload.token;
      // The payload from LoginScreen is { user: 'The Users Name' }
      // We store it as an object in the state for better structure.
      state.user = action.payload.user ;
      state.isAuthenticated = true; // Corrected typo
      state.error = null;
    },
    signOut: (state) => { // Corrected to be a standard reducer function
      state.token = null;
      state.user = null; // Clear user data on sign out
      state.isAuthenticated = false;
      state.error = null;
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { signIn, signOut, authError } = authSlice.actions;
export default authSlice.reducer;