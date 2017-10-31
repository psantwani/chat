import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import ChatLisItem from '../components/ChatListItem';

class ChatListScreen extends Component{

    state = {
        chats: []
    }

    async componentWillMount(){
        const ACTIVE_CHATS_URL = '';
        const response = await axios.get(ACTIVE_CHATS_URL, {_id: this.props.user});
        this.setState({
            chats: response
        })
    }

    onChatSelect(chatId){
        this.props.navigation.navigate('chat', {chatId});
    }

    renderList(){
        return _.map(this.state.chats, (chat) => {
            return (
                <ChatLisItem 
                    item={chat}
                    onChatSelect={() => this.onChatSelect(chat.chatId)}
                />
            )
        })
    }

    render(){
        <ScrollView>
            <Text>Welcome to ChatList screen.</Text>
        </ScrollView>
    }
}

export { ChatListScreen }