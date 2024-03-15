import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice } from './';
import { uiSlice } from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
});
