import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar, CalendarEvent, CalendarModal, FabDelete } from '../';
import { calendarLocalizer, getMessages } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { events, setActiceEvent, startLoadingEvents } = useCalendarStore();
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

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        localizer={calendarLocalizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={setActiceEvent}
        onView={onViewChange}
      />

      <FabDelete />

      <CalendarModal />
    </>
  );
};
