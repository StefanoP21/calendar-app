import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../context';
import { calendarApi } from '../api';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiceEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //* Update event
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        Swal.fire('Evento actualizado', calendarEvent.title, 'success');
        return;
      }
      //* Add new event
      const { data } = await calendarApi.post('/events/new', calendarEvent);
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user: { _id: user.uid, name: user.name },
        })
      );
      Swal.fire('Evento creado', calendarEvent.title, 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error la guardar', error.response.data?.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      Swal.fire('Evento eliminado', activeEvent.title, 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = data.events.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      dispatch(onLoadEvents(events));
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
