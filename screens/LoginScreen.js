import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const BASE_URL = 'https://us-central1-chat-49f98.cloudfunctions.net';

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
        const CREATE_USER_URL = `${BASE_URL}/createUser`;
        const GENERATE_OTP_URL = `${BASE_URL}/requestOneTimePassword`;
        
        const userResponse = await axios.post(CREATE_USER_URL, { phone: mobile });
        
        if(!userResponse.uid && userResponse.error.code !== 'auth/uid-already-exists'){
            this.setState({
                error: userResponse.error.message
            });
            return;
        }
        
        const generateOtpResponse = await axios.post(GENERATE_OTP_URL, { phone: mobile });
        
        if(generateOtpResponse){
            this.props.navigation.navigate('otp', { mobile });
        }
        else{
            this.setState({
                error: generateOtpResponse.error.message
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