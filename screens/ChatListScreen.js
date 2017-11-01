import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import ChatLisItem from '../components/ChatListItem';

class ChatListScreen extends Component{

    static navigationOptions = {
        header: {
            visible: false
        }
    }

    state = {
        chats: []
    }

    async componentWillMount(){
        const ACTIVE_CHATS_URL = 'https://rallycoding.herokuapp.com/api/music_albums';
        const response = await axios.get(ACTIVE_CHATS_URL, {_id: this.props.user});       
        this.setState({
            chats: response.data
        });
    }

    onChatSelect(chatId){
        this.props.navigation.navigate('active', {chatId});
    }

    renderList(){
        return _.map(this.state.chats, (chat, index) => {
            return (
                <ChatLisItem 
                    item={chat}
                    key={index}
                    onChatSelect={() => this.onChatSelect({index})}
                />
            )
        })
    }

    render(){

        const { viewStyle } = styles;

        return(
            <ScrollView
                style={viewStyle}
            >
                {this.renderList()}
            </ScrollView>
        );
    }
}

styles = {
    viewStyle: {
        flex: 1
    }
}

export { ChatListScreen }