import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvents = {
  _id: new Date().getTime(),
  title: 'Cumpleaños de mi mamá',
  notes: 'Comprar el pastel y las velas',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#0073ff',
  user: {
    _id: '123',
    name: 'Stefano',
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
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },

    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event._id === payload._id ? payload : event
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } =
  calendarSlice.actions;
