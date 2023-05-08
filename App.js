import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigate from './stackNavigate';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/redux/epicReduces';
import rootSaga from './src/redux/epicSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigate/>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
