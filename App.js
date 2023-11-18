import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux";
import {Provider as PaperProvider} from 'react-native-paper'
import AppContainer from './src';
import store from './src/store/store';


export default class App extends React.Component {
render() {
    return (
      <Provider store={store}>
        <PaperProvider>
      <AppContainer/>
        </PaperProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
