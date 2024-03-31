import { render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/app/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks';

jest.mock('../../../src/hooks/useCalendarStore', () => ({
  useCalendarStore: jest.fn(),
}));

describe('Pruebas en <FabDelete />', () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrar el componente por defecto', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);

    const btn = screen.getByRole('button');
    expect(btn.classList.contains('d-none')).toBe(true);
  });

  test('debe de mostrar el botón si hay un evento activo', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);

    const btn = screen.getByRole('button');
    expect(btn.classList.contains('d-none')).toBe(false);
  });

  test('startDeletingEvent debe de ser llamado si hay un evento activo', () => {
    useCalendarStore.mockReturnValue({
      activeEvent: { id: '123' },
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);

    const btn = screen.getByRole('button');
    btn.click();

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });

  test('startDeletingEvent no debe de ser llamado si no hay un evento activo', () => {
    useCalendarStore.mockReturnValue({
      activeEvent: null,
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);

    const btn = screen.getByRole('button');
    btn.click();

    expect(mockStartDeletingEvent).not.toHaveBeenCalled();
  });
});
