import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../constants';
import Home from './home';
import Messages from './messages';
import More from './more';
import Profile from './profile';

const tabBarOptions = {
  animationEnabled: false,
  initialRouteName: 'Home',
  lazy: true,
  lazyLoad: true,
  swipeEnabled: false,
  tabBarOptions: {
    activeBackgroundColor: '#fff',
    activeTintColor: '#FF5B5B',
    inactiveBackgroundColor: '#fff',
    inactiveTintColor: 'gray',
    showIcon: true,
    showLabel: false,
    style: Constants.BaseStyle.TAB_GROUP_STYLE,
  },
  tabBarPosition: 'bottom',
};

/* eslint-disable */
const routes = {
  Home: {
    screen: Home,
    navigationOptions: () => ({
      tabBarIcon: ({ focused }) => (
        <FontAwesome5Icon color={focused ? Constants.Colors.PURPLE : Constants.Colors.GRAY} name="home" size={25} />
      ),
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => (
        <FontAwesome5Icon color={focused ? Constants.Colors.PURPLE : Constants.Colors.GRAY} name="user" size={25} />        
      ),
    }),
  },
  Messages: {
    screen: Messages,
    navigationOptions: () => ({
      tabBarIcon: ({ focused }) => (
        <FontAwesome5Icon color={focused ? Constants.Colors.PURPLE : Constants.Colors.GRAY} name="rocketchat" size={25} />        
      ),
    }),
  },
  More: {
    screen: More,
    navigationOptions: () => ({
      tabBarIcon: ({ focused }) => (
        <Feather color={focused ? Constants.Colors.PURPLE : Constants.Colors.GRAY} name="more-horizontal" size={25} />        
      ),
    }),
  },
};

const Dashboard = createBottomTabNavigator(routes, tabBarOptions);

export default createAppContainer(Dashboard);
