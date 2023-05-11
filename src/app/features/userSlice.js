import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginDataRedux: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginDataRedux, getAllUsers } = userSlice.actions;

export default userSlice.reducer;
