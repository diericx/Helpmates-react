import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Chat from "../components/Chat";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

const Group = (props) => {
  const groupId = props.navigation.getParam("groupId", null);

  return (
    <View style={styles.container}>
      <Chat groupId={groupId}> Here's your group1 </Chat>
    </View>
  );
};

export default Group;