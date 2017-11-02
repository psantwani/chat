import _ from "lodash";
import React, { Component } from "react";
import { View, Text, ListView } from "react-native";
import ContactListItem from "../components/ContactListItem";

class ContactListScreen extends Component {

  /**
  state = {
    contacts: []
  };

  async componentWillMount() {
    const ACTIVE_CHATS_URL = "https://rallycoding.herokuapp.com/api/music_albums";
    const response = await axios.get(ACTIVE_CHATS_URL, {_id: this.props.user});
    this.setState({
      contacts: response.data
    });
    this.createDataSource();
  }

  createDataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.state.contacts);
  }

  renderRow(employee) {
    return <ContactListItem item={employee} />;
  }

  render() {
    return (
        <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
      />
    );
  }

   */

  render(){
    return(
      <View>
        <Text>Contacts</Text>
      </View>
    );
  }
}

export { ContactListScreen };
