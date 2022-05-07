import React from 'react';

import './index.css';

import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

import { Provider } from 'react-redux';
import store from './redux/store';

import Routes from './components/routes';

const muiTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3c7daa',
    },
    secondary: {
      main: '#95251e',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <Routes />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
