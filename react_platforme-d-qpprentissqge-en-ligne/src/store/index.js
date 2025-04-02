import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import coursesReducer from './coursesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    courses: coursesReducer,
  },
});