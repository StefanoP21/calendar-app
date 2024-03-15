import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar, CalendarEvent, CalendarModal } from '../';
import { calendarLocalizer, getMessages } from '../../helpers';
import { useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  const {
    events,
    lastView,
    eventStyleGetter,
    onDoubleClick,
    setActiceEvent,
    onViewChange,
  } = useCalendarStore();

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

      <CalendarModal />
    </>
  );
};
