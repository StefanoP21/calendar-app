import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './context';

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
