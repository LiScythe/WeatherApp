import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import theme from './theme';
import './index.css';
import { CssBaseline } from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/epicReduces';
import rootSaga from './redux/epicSaga';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
     <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
    </ThemeProvider>,
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();