import { MemoryRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/app/pages/CalendarPage', () => ({
  CalendarPage: () => <div>CalendarRoutes</div>,
}));

describe('Pruebas en <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrar la pantalla de carga y llamar a checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: 'checking',
    });

    render(<AppRouter />);

    expect(screen.getByText('Verificando sesión...')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test('debe de mostrar la pantalla de login', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: 'not-authenticated',
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Iniciar sesión' })
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('debe de mostrar la pantalla de registro', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: 'not-authenticated',
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    const registerLink = screen.getByRole('link');

    act(() => {
      registerLink.click();
    });

    expect(screen.getByRole('heading', { name: 'Crear cuenta' })).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('debe de mostrar el calendario si estamos auténticados', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: 'authenticated',
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('CalendarRoutes')).toBeTruthy();
  });
});
