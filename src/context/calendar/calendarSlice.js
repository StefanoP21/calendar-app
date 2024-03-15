import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvents = {
  title: 'My event',
  note: 'This is my event',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#0073ff',
  user: {
    _id: '123',
    name: 'John Doe',
  },
};

const initialState = {
  events: [tempEvents],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onActiveEvent } = calendarSlice.actions;
