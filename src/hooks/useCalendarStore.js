import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUiStore } from './useUiStore';
import { onSetActiveEvent } from '../context';

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

  const onSelect = (e) => {
    dispatch(onSetActiveEvent(e));
  };

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    lastView,

    //* Métodos
    eventStyleGetter,
    onDoubleClick,
    onSelect,
    onViewChange,
  };
};
