import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, ScrollView, Picker } from 'react-native';
import { Card, Button } from 'react-native-elements';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  rateContainer: {
    marginTop: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseCardContainer: {
    width: '100%',
  },
  title: {
    fontSize: 25,
  },
  availabilitiesListContainer: {
    width: '$screenWidth',
    height: 10,
  },
  removeCourseButton: {
    height: 45,
    backgroundColor: '$red',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

class Courses extends React.Component {
  constructor(props) {
    super(props);

    // bindings
    this.setRateForCourse = this.setRateForCourse.bind(this);
  }

  // METEOR - remove course
  onRemoveCoursePress(courseId) {
    Meteor.call('users.removeCompletedCourse', { courseId }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
      }
    });
  }

  // METEOR - set rate
  setRateForCourse(courseId, rate) {
    Meteor.call('users.setRateForCourse', { courseId, rate }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
      }
    });
  }

  getCourseData(completedCourses) {
    const newCompletedCourses = completedCourses;
    Object.entries(newCompletedCourses).forEach(([key, value]) => {
      const courseData = Meteor.collection('courses').findOne(key);
      if (!courseData) {
        return null;
      }

      newCompletedCourses[key] = {
        rate: value,
        title1: courseData.title1,
        title2: courseData.title2,
      };
    });
    return newCompletedCourses;
  }

  compareCourseData(a, b) {
    if (a[1].title2 < b[1].title2) {
      return -1;
    } else if (a[1].title2 > b[1].title2) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  render() {
    let { completedCourses } = this.props;
    completedCourses = Object.entries(this.getCourseData(completedCourses));
    completedCourses.sort(this.compareCourseData);
    return (
      <View style={styles.container}>
        <ScrollView>
          {completedCourses.map(([key, value]) => (
            <Card title={value.title1} subtitle={value.title2} key={key}>
              <View style={styles.courseCardContainer}>
                <View>
                  <Picker
                    style={styles.ratePicker}
                    itemStyle={{ height: 130 }}
                    selectedValue={value.rate}
                    onValueChange={(itemValue, itemIndex) => this.setRateForCourse(key, itemValue)}
                  >
                    <Picker.Item label="$5" value={5} />
                    <Picker.Item label="$10" value={10} />
                    <Picker.Item label="$15" value={15} />
                    <Picker.Item label="$20" value={25} />
                    <Picker.Item label="$20" value={30} />
                    <Picker.Item label="$20" value={35} />
                  </Picker>
                </View>
                <Button
                  title="Remove Course"
                  textStyle={{ fontWeight: '700' }}
                  buttonStyle={styles.removeCourseButton}
                  containerStyle={{ marginTop: 20 }}
                  onPress={() => this.onRemoveCoursePress(key)}
                />
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// Bind this view to data
const container = createContainer(
  params => ({
    completedCourses: Meteor.user().profile.completedCourses,
  }),
  Courses,
);

container.navigationOptions = {
  title: 'Courses',
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: '#cd84f1',
  },

  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Milkshake',
  },
};

export default container;
