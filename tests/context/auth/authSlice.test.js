import { authSlice } from '../../../src/context/auth/authSlice';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {
  test('debe de regresar el estado por defecto', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('onChecking debe de cambiar el status a checking', () => {
    const state = authSlice.reducer(
      notAuthenticatedState,
      authSlice.actions.onChecking()
    );
    expect(state.status).toBe('checking');
  });

  test('onLogin debe de realizar el login', () => {
    const state = authSlice.reducer(
      initialState,
      authSlice.actions.onLogin(testUserCredentials)
    );
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('onLogout debe de realizar el logout', () => {
    const state = authSlice.reducer(
      authenticatedState,
      authSlice.actions.onLogout()
    );
    expect(state).toEqual(notAuthenticatedState);
  });

  test('debe de mostrar un mensaje de error', () => {
    const errorMessage = 'Error en el logout';
    const state = authSlice.reducer(
      initialState,
      authSlice.actions.onLogout(errorMessage)
    );
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage,
    });
  });

  test('clearError debe de limpiar el mensaje de error', () => {
    const state = authSlice.reducer(
      {
        status: 'not-authenticated',
        user: {},
        errorMessage: 'Error en el logout',
      },
      authSlice.actions.clearError()
    );
    expect(state.errorMessage).toBeUndefined();
  });
});
