import _ from "lodash";
import React, { Component } from "react";
import { View, Text, ListView } from "react-native";
import ContactListItem from "../components/ContactListItem";
import Expo from "expo"; 

class ContactListScreen extends Component {
   /**
  async componentWillMount() {
    Expo.Contacts.getContactsAsync()
    const contacts = await Expo.Contacts.getContactsAsync({ 
      "pageSize": 10,
      "pageOffset": 0,
      "fields": ["phoneNumbers"]
    });
    if (contacts.length > 0) {
      Alert.alert(
        'Your first contact is...',
        `Name: ${contacts[0].name}\n` +
        `Phone: ${JSON.stringify(contacts[0].phoneNumbers)}\n` +
        `Email: ${JSON.stringify(contacts[0].emails)}`
      );
    }   
    const users = await fetchUsers();
    const databaseRef = firebase.database().ref(`/users`);

    const contactPromises = _.map(data, ({ name, phoneNumbers }) => {
      console.log(name, phoneNumbers);
      return databaseRef.child(phoneNumbers[0]).on("value", s => s);
    });

    Promise.all(contactPromises)
      .then(contacts => {
        return contacts;
      })
      .catch(err => {
        console.log(err);
      });
    
  }
 */
  render(){
    return(
      <View>
        <Text>Contacts page.</Text>
      </View>
    )
  }

}

export { ContactListScreen }