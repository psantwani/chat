import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

class LoginScreen extends Component{

    state = {
        mobile: '+91',
        disabledButton: true,
        error: null
    }

    onMobileTextChange(text){
        this.setState({ mobile: text });
        if(text.length === 13){
            this.setState({ disabledButton: false });
        }
        else{
            this.setState({ disabledButton: true });
        }
    }

    async generateOTP(){
        const { mobile, error } = this.state;
        const GENERATE_OTP_URL = '';
        const response = await axios.post(GENERATE_OTP_URL, { mobile });
        
        if(response.status === 200){
            this.props.navigation.navigate('otp', { mobile });
        }
        else{
            this.setState({
                error: response.error
            });
        }
    }

    render(){
        const { mobile, disabledButton } = this.state;
        return(
            <View>
                <Text>We need to confirm your mobile number</Text>
                <TextInput 
                    value={ mobile }
                    onChangeText= { text => this.onMobileTextChange(text) }
                />
                <Button 
                    title="GENERATE OTP"
                    disabled={ disabledButton }
                    onPress={ () => this.generateOTP }
                />
            </View>
        );
    }
}

export { LoginScreen }