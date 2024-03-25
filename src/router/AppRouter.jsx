import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarRoutes } from '../app/';
import { AuthRoutes } from '../auth/';

export const AppRouter = () => {
  const authStatus = 'checking';

  return (
    <Routes>
      {authStatus === 'authenticated' ? (
        <Route path="/*" element={<CalendarRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
