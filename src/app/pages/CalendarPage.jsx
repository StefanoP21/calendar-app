import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { NavBar, CalendarEvent } from '../';

import { calendarLocalizer, getMessages } from '../../helpers';

const events = [
  {
    title: 'My event',
    note: 'This is my event',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#0073ff',
    user: {
      _id: '123',
      name: 'John Doe',
    },
  },
];

export const CalendarPage = () => {
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

  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        localizer={calendarLocalizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
    </>
  );
};
