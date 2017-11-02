import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { FIREBASE_ROOT_URL } from '../lib/config';
import C from '../lib/constants';

class LoginScreen extends Component{

    state = {
        mobile: C.COUNTRY_CODE,
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
        const CREATE_USER_URL = `${FIREBASE_ROOT_URL}/createUser`;
        const GENERATE_OTP_URL = `${FIREBASE_ROOT_URL}/requestOneTimePassword`;
        
        try{
            await axios.post(CREATE_USER_URL, { phone: mobile });
        }
        catch(err){
            const { code, message } = err.response.data.error;
            if(code !== "auth/uid-already-exists"){
                this.setState({
                    error: message
                });
                return;
            }
        }

        try{
            await axios.post(GENERATE_OTP_URL, { phone: mobile });
            this.props.navigation.navigate('otp', { mobile });
        }
        catch(err){
            const { code, message } = err.response.data.error;
            this.setState({
                error: message
            });
            return;
        }

    }

    render(){
        const { mobile, disabledButton } = this.state;
        return(
            <View>
                <Text>We need to confirm your mobile number</Text>
                <TextInput 
                    value={ mobile }
                    keyboardType='numeric'
                    onChangeText= { text => this.onMobileTextChange(text) }
                />
                <Button 
                    title="GENERATE OTP"
                    disabled= { disabledButton }
                    onPress={ () => this.generateOTP() }
                />
            </View>
        );
    }
}

export { LoginScreen }