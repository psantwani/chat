import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, ScrollView, TextInput } from 'react-native';

class ChatScreen extends Component{

    state = {
        messages: []
    }

    async componentWillMount(){
        const FETCH_MESSAGES_URL = '';
        const response = await axios.get(FETCH_MESSAGES_URL, this.props.chatId);
        this.setState({
            messages: response
        })
    }

    renderMessages(){
        return _.map(this.state.messages, (message) => {
            return (
                <Text>
                    {message}
                </Text>
            )
        });
    }

    render(){
        <View>
            <ScrollView>
                {() => this.renderMessages}
            </ScrollView>
            <TextInput />
            <Button>SEND</Button>
        </View>
    }
}

export { ChatScreen }