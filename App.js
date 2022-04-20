/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';

import HomeNavigation from './navigation/HomeNavigation';

import { Provider as PaperProvider } from 'react-native-paper';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <PaperProvider>
      <HomeNavigation
        screenProps={{
          //pass any object you need for ex
          testing: true,
        }}
      />
        </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    color: 'red',
  },
});
