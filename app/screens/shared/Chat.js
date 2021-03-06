import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Chat from '../components/Chat';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$lightblue"
  },
  messages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollView: {
    padding: 0,
    margin: 0,
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

const Messages = (props) => {
  // const id = props.navigation.getParam("id", null)

  // return (
  //   <View style={styles.container}>

  //     <View style={styles.messages}>
  //         <Chat id={id}/>
  //     </View>
  //   </View>
  // );
};

export default Messages;