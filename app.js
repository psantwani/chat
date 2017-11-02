import _ from "lodash";
import firebase from 'firebase';
import React, { Component } from "react";
import { Platform, StatusBar, View } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import { FIREBASE_CONFIG } from './lib/config';
import {
  WelcomeScreen,
  LoginScreen,
  ChatListScreen,
  ChatScreen,
  ContactListScreen,
  ProfileScreen,
  OTPScreen
} from "./screens";

export default class App extends Component {

  componentWillMount() {    
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        login: {
          screen: StackNavigator({
            login: { screen: LoginScreen },
            otp: { screen: OTPScreen }
          })
        },
        main: {
          screen: TabNavigator(
            {
              chats: {
                screen: StackNavigator({
                  list: { screen: ChatListScreen },
                  active: { screen: ChatScreen }
                })
              },
              contacts: { screen: ContactListScreen },
              profile: { screen: ProfileScreen }
            },
            {
              initialRouteName: "chats"
            }
          )
        }
      },
      {
        navigationOptions: {
          tabBar: { visible: false }
        },
        lazy: true        
      }
    );

    return (        
        <MainNavigator />        
    );
  }
}
