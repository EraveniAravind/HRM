import React from 'react';
import AllRoutes from './routes/Routes';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AllRoutes />
    </SnackbarProvider>
  );
};

export default App;
