import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingEvents: true,
  events: [],
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

    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },

    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.find((e) => e.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarSlice.actions;
