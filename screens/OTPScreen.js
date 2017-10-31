import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

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
        const CONFIRM_OTP_URL = '';
        const response = await axios.get(CONFIRM_OTP_URL, this.props.mobile);

        if(response.status === 200){
            if( otp === response.otp ){
                AsyncStorage.setItem('login_token', 'Secret value'); //should be in try/catch too.
                this.props.navigation.navigate('main', {user: response._id});
            }
            else{
                this.setState({
                    error: 'Incorrect OTP entered.'
                })
            }
        }     
        else{
            this.setState({
                error: response.error
            });
        }

        return;
    }

    render() {
        return (
            <View>
                <Text>Enter the 4 digit OTP</Text>
                <TextInput
                    value={this.state.otp}
                    onChangeText={ text => this.onOTPInputChange(text) }
                />
                <Button
                    title="CONFIRM OTP"
                    disabled={disabledButton}
                    onPress={() => this.confirmOTP}
                />
            </View>
        );
    }
}

export { OTPScreen }