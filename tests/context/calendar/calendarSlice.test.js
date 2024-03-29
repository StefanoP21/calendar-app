import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/context/calendar/calendarSlice';
import {
  calendarWithActiveEvent,
  calendarWithEvents,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {
  test('debe de regresar el estado por defecto', () => {
    expect(calendarSlice.getInitialState()).toEqual(initialState);
  });

  test('onSetActiveEvent debe de agregar un activeEvent', () => {
    const state = calendarSlice.reducer(
      initialState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent debe de agregar un evento', () => {
    let state = calendarSlice.reducer(
      {
        ...initialState,
        isLoadingEvents: false,
      },
      onAddNewEvent(events[0])
    );
    state = calendarSlice.reducer(state, onAddNewEvent(events[1]));

    expect(state).toEqual(calendarWithEvents);
  });

  test('onUpdateEvent debe de actualizar un evento', () => {
    const state = calendarSlice.reducer(
      calendarWithEvents,
      onUpdateEvent({
        ...events[0],
        title: 'Updated title',
      })
    );

    expect(state.events[0].title).toBe('Updated title');
  });

  test('onDeleteEvent debe de eliminar un evento', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEvent,
      onDeleteEvent(events[0])
    );

    expect(state).toEqual({
      isLoadingEvents: false,
      events: [events[1]],
      activeEvent: null,
    });
  });

  test('onLoadEvents debe de cargar los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state).toEqual(calendarWithEvents);
  });

  test('onLogoutCalendar debe de limpiar el store', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEvent,
      onLogoutCalendar()
    );

    expect(state).toEqual(initialState);
  });
});
