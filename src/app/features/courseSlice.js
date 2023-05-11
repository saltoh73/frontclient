import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    getAllCourses: (state, action) => {
      state.courses = action.payload;
      localStorage.setItem('courses', JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllCourses } = courseSlice.actions;

export default courseSlice.reducer;
