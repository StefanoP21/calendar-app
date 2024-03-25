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
    } catch (error) {
      dispatch(onLogout('Usuario o contraseña incorrectos'));

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  };

  return {
    //* Propiedades
    status,
    user,
    errorMessage,

    //* Métodos
    startLogin,
  };
};
