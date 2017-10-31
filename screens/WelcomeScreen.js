import { AppLoading } from 'expo';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from "react-native-elements";

class WelcomeScreen extends Component{

    state = {
        token: null
    }

    async componentWillMount(){
        let token = await AsyncStorage.getItem('login_token');

        if(token){
            this.props.navigation.navigate('main');
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