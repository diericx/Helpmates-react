import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { GetChosenUniversity, SetChosenUniversity } from '../../lib/LocalStorage';

import UniversityList from '../../components/universities/UniversityList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

const Messages = (props) => {
  const id = props.navigation.getParam("id", null)

  // If the user has chosen a university before, go to it
  GetChosenUniversity().then(university => {
    if (university != null) {
      props.navigation.navigate('ChooseCourse', {
        university,
        path: 'DU/',
      })
    }
  });

  onPress = (university) => {
    SetChosenUniversity(university);
    props.navigation.navigate('ChooseCourse', {
      university: university,
      path: university.abbreviation + "/"
    })
  }

  return (
    <View style={styles.container}>
      <UniversityList onPress={this.onPress} />
    </View>
  );
};

export default Messages;