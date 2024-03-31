import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { authSlice } from '../../src/context';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import {
  initialState,
  notAuthenticatedState,
  authenticatedState,
} from '../fixtures/authStates';
import { testUserCredentials, testUser } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('Pruebas en useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('debe de regresar los valores por defecto', () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test('startLogin debe de realizar el login correctamente', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: 'authenticated',
      user: testUser,
      errorMessage: undefined,
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('startLogin debe de fallar la autenticación', async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: 'testError@gmail.com',
        password: '123456',
      });
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: expect.any(String),
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token-init-date')).toBeNull();

    waitFor(() => {
      expect(errorMessage).toBeUndefined();
    });
  });

  test('startRegister debe de crear un usuario correctamente', async () => {
    const newUser = {
      name: 'Test User 2',
      email: 'test@gmail.com',
      password: '123456',
    };

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '123',
        name: newUser.name,
        token: 'ABC123',
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: 'authenticated',
      user: { name: newUser.name, uid: '123' },
      errorMessage: undefined,
    });

    spy.mockRestore();
  });

  test('startRegister debe de fallar la creación', async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: expect.any(String),
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token-init-date')).toBeNull();
  });

  test('checkAuthToken debe de validar un token correctamente', async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
      await result.current.checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: 'authenticated',
      user: testUser,
      errorMessage: undefined,
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('checkAuthToken debe de fallar si no hay un token', async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;

    expect(localStorage.getItem('token')).toBeNull();
    expect({ status, user, errorMessage }).toEqual(notAuthenticatedState);
  });

  test('startLogout debe de cerrar la sesión', async () => {
    const mockStore = getMockStore({ ...authenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogout();
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual(notAuthenticatedState);
  });
});
