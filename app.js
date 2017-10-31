import _ from 'lodash';
import React, { Component } from "react";
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { 
    WelcomeScreen, 
    LoginScreen,
    ChatListScreen,
    ChatScreen,
    ContactListScreen,
    ProfileScreen,
    OTPScreen
} from './screens';

class App extends Component{  
    
    render(){

        const MainNavigator = TabNavigator({
            welcome: { screen: WelcomeScreen },
            login: { screen: StackNavigator({
                    login: LoginScreen,
                    otp: OTPScreen
                }) 
            },
            main: {
                screen: TabNavigator({
                    chats: { 
                        screen: StackNavigator({
                            chats: ChatListScreen,
                            chat: ChatScreen
                        }) 
                    },
                    contacts: { screen: ContactListScreen },
                    profile: { ProfileScreen }
                })
            }
        }, {
            lazy: true
        });

        return(
            <View>
                <MainNavigator />
            </View>
        )
    }
}