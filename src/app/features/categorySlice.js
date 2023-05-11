import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getAllCategories: (state, action) => {
      state.categories = action.payload;
      localStorage.setItem('categories', JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllCategories } = categorySlice.actions;

export default categorySlice.reducer;
