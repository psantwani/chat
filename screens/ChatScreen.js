import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, ScrollView, TextInput } from 'react-native';
import KeyboardHandler from "../components/KeyboardHandler";

class ChatScreen extends Component{

    static navigationOptions = {
        title: 'Taylor Swift',
    }

    state = {
        messages: []
    }

    dummy(){
        return [
            {user: "A", message: "Hi."},
            {user: "B", message: "Kya bolta hai."},
            {user: "A", message: "Match dekhne chalte hai?"},
            {user: "B", message: "Salary nahi aaya abhi tak, bhai"},            
        ];
    }

    async componentWillMount(){
        /**
        const FETCH_MESSAGES_URL = '';
        const response = await axios.get(FETCH_MESSAGES_URL, this.props.chatId);
         */

        const response = this.dummy(); // TODO: Remove this later.
        this.setState({
            messages: response
        })
    }

    renderMessages(){
        return _.map(this.state.messages, ({user, message}, index) => {
            return (
                <Text 
                    key={index}
                >
                    {message}
                </Text>
            )
        });
    }

    render(){
        return(
            <KeyboardHandler ref='kh'>
                <View style={styles.viewStyle}>
                    <ScrollView>
                        {this.renderMessages()}
                    </ScrollView>
                    <TextInput ref='message'
                        onFocus={()=>this.refs.kh.inputFocused(this,'message')}
                    />
                    <Button>SEND</Button>
                </View>
            </KeyboardHandler>
        );
    }
}

styles = {
    viewStyle: {
        flex: 1,
        flexDirection: 'column'
    }
}

export { ChatScreen }