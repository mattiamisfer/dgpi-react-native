/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
 StyleSheet,View,Text
} from 'react-native';

import BottomNavigation from  '../navigation/BottomNavigation';

export default function App() {
return <BottomNavigation/>;
}

const styles = StyleSheet.create({
Text: {
  fontFamily:'Raleway-BoldItalic'
}
});