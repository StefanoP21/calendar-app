export const events = [
  {
    id: '1',
    title: 'Birthday',
    start: new Date(2021, 10, 1, 10, 0),
    end: new Date(2021, 10, 1, 12, 0),
    notes: 'Buy a cake',
  },
  {
    id: '2',
    title: 'Meeting',
    start: new Date(2021, 10, 2, 10, 0),
    end: new Date(2021, 10, 2, 12, 0),
    notes: 'Prepare the presentation',
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEvents = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEvent = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
