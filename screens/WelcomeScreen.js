import _ from 'lodash';
import { AppLoading } from 'expo';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from "react-native-elements";

class WelcomeScreen extends Component{

    state = {
        token: null
    }

    async componentWillMount(){
        
        await AsyncStorage.setItem('login_token', 'Piyush'); //TODO: Remove this later.

        let token = await AsyncStorage.getItem('login_token');

        if(token){
            this.props.navigation.navigate('chats');
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    render(){
        if(_.isNull(this.state.token)){
            return <AppLoading />
        }
        
        return (<View>
            <Text>Welcome to Chat</Text>
            <Button
                title="LOGIN"
                onPress={ () => this.props.navigation.navigate('login') }
            />
        </View>);
    }
}

export { WelcomeScreen }