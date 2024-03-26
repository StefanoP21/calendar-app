import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../context';
import { calendarApi } from '../api';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiceEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //* Update event or add new event
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      const { data } = await calendarApi.post('/events/new', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      console.log({ data });
      const events = data.events.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      console.log({ events });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiceEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
