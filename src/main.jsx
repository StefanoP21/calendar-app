import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { CalendarApp } from './CalendarApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <CalendarApp />
    </ChakraProvider>
  </React.StrictMode>
);
