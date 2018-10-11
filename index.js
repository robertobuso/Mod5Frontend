import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import App from './App.js';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './js/redux/reducer'

const store = createStore(reducer)

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('Mod5Frontend', () => WrappedApp
);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => WrappedApp);
