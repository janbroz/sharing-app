import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import HomeScreen from './HomeScreen'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },

}, {
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component{
  render(){
    return <AppContainer/>
  }
}