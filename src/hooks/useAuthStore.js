import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearError, onChecking, onLogin, onLogout } from '../context';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch ({ response }) {
      let errorMessage = 'Error en el servidor';

      if (response.data.msg) {
        errorMessage = response.data.msg;
      } else if (response.data.errors) {
        const errorKeys = Object.keys(response.data.errors);
        if (errorKeys.length > 0) {
          errorMessage = response.data.errors[errorKeys[0]].msg;
        }
      }

      dispatch(onLogout(errorMessage));

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch ({ response }) {
      let errorMessage = 'Error en el servidor';

      if (response.data.msg) {
        errorMessage = response.data.msg;
      } else if (response.data.errors) {
        const errorKeys = Object.keys(response.data.errors);
        if (errorKeys.length > 0) {
          errorMessage = response.data.errors[errorKeys[0]].msg;
        }
      }

      dispatch(onLogout(errorMessage));

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogout());
      return;
    }

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    status,
    user,
    errorMessage,

    //* Métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
