import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import categorySlice from './features/categorySlice';
import courseSlice from './features/courseSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    categories: categorySlice,
    courses: courseSlice,
  },
});
