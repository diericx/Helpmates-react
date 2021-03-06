import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import CourseList from '../../components/Explore/CourseList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

// Connect to firebase
@compose(
  firebaseConnect(),
  connect(({ firebase: { profile } }) => ({ profile }))
)
class ChooseCourse extends React.Component {
  static navigationOptions = {
    title: 'Courses',
  };

  onPress = course => {
    this.props.navigation.navigate('ChooseGroup', {
      courseId: course.id,
    });
  };

  render() {
    const { profile } = this.props;
    return (
      <View style={styles.container}>
        {isLoaded(profile) ? (
          <CourseList universityId={profile.activeUniversityId} onPress={this.onPress} />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }
}

export default ChooseCourse;
