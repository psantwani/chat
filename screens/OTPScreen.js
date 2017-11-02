import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { FIREBASE_ROOT_URL } from '../services';
import C from '../lib/constants';

class OTPScreen extends Component {

    state = {
        otp: '',
        disabledButton: true,
        error: null
    }

    onOTPInputChange(text){
        this.setState({ otp: text });
        if(text.length === 4){
            this.setState({ disabledButton: false });
        }
        else{
            this.setState({ disabledButton: true });
        }
    }

    async confirmOTP() {
        const { otp } = this.state;
        const CONFIRM_OTP_URL = `${FIREBASE_ROOT_URL}/verifyOneTimePassword`;
        let response = null;

        try{
            response = await axios.post(CONFIRM_OTP_URL, { phone: this.props.navigation.state.params.mobile, code: otp });
        }
        catch(err){
            const { code, message } = err.response.data.error;
            this.setState({
                error: message
            });
            return;
        }
        
        try{
            AsyncStorage.setItem(C.TOKEN_NAME, response.data.token);
        }
        catch(err){
            console.log(err);
            return;
        }
        
        this.props.navigation.navigate('chats');
    }

    render() {
        return (
            <View>
                <Text>Enter the 4 digit OTP</Text>
                <TextInput
                    value={this.state.otp}
                    keyboardType='numeric'
                    onChangeText={ text => this.onOTPInputChange(text) }
                />
                <Button
                    title="CONFIRM OTP"
                    disabled={this.state.disabledButton}
                    onPress={() => this.confirmOTP()}
                />
            </View>
        );
    }
}

export { OTPScreen }