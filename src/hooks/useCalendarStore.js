import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUiStore } from './useUiStore';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../context';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.bgColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (e) => {
    openDateModal();
  };

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  };

  const setActiceEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      dispatch(onAddNewEvent({ _id: new Date().getTime(), ...calendarEvent }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    lastView,
    hasEventSelected: !!activeEvent,

    //* Métodos
    eventStyleGetter,
    onDoubleClick,
    onViewChange,
    setActiceEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
