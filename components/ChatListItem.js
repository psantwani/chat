import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Card from "./Card";
import Bubble from "./Bubble";
import CardSection from "./CardSection";

export default class ChatListItem extends Component {
    render() {
        // const { name, thumbnail_image, unread_messages, last_message, onChatSelect } = this.props.item;
        
        const { title, thumbnail_image, url } = this.props.item;
        const proxy = {
            name: title,            
            last_message: url
        };

        const { thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle } = styles;

        return (
            <TouchableOpacity onPress={this.props.onChatSelect}>
                <Card>
                    <CardSection>
                        <View style={thumbnailContainerStyle}>
                            <Image style={thumbnailStyle} source={{ uri: thumbnail_image }} />
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}>{proxy.name}</Text>
                            <Text>{proxy.last_message}</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                        {/* <Bubble>{unread_messages}</Bubble> */}
                        <Bubble>1</Bubble>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: "column",
        justifyContent: "space-around"
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
});