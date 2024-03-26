import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarRoutes, CheckingAuth } from '../app/';
import { AuthRoutes } from '../auth/';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<CalendarRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
