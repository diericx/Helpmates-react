import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import update from 'immutability-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ScrollView } from 'react-native';
import { ButtonGroup, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import GetHelpCard from './components/GetHelpCard/index';
import ProfileCard from './components/profileCard';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  agenda: {
    flex: 1,
    width: '100%',
  },
  buttonGroupContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonGroup: {
    width: '80%',
    height: 30,
    marginTop: 10,
  },
  cardContainer: {
    flex: 1,
    marginBottom: 10,
  },
  cardScrollView: {
    height: '100%',
  },
  card: {
    height: '100%',
    marginTop: 0,
    backgroundColor: 'white',
  },
  agendaCard: {
    padding: 0,
  },
  agendaCardWrapper: {
    flex: 1,
    padding: 0,
  },
  sendRequestButton: {
    height: 45,
    backgroundColor: '$green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
  },
});

class Show extends React.Component {
  constructor(props) {
    super(props);
    // params from navigation
    const { params } = this.props.navigation.state;
    this.state = {
      params,
      startDate: null,
      endDate: null,
      availabilities: [],
      items: {},
      isModalVisible: false,
      selectedGroup: 0,
      selectedCourse: null,
    };
    // get this users availabilities
    this.getAvailabilities();
    // bind
    this.updateGroup = this.updateGroup.bind(this);
    this.onSelectCourse = this.onSelectCourse.bind(this);
  }

  onSelectCourse(courseId) {
    this.setState({
      selectedCourse: courseId,
    });
  }

  // METEOR - get availabilities for this user
  getAvailabilities() {
    Meteor.call('users.getAvailabilities', { userId: this.state.params.userId }, (err, res) => {
      // Do whatever you want with the response
      this.setState({ availabilities: res });
      if (err) {
        console.log(err);
      }
    });
  }

  updateGroup(selectedGroup) {
    this.setState({ selectedGroup });
  }

  render() {
    const buttons = ['Get Help', 'Reviews'];
    const { user } = this.state.params;
    const { selectedGroup } = this.state;
    return (
      <View style={styles.container}>
        <ProfileCard name={user.profile.name} rating={user.profile.rating} />
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            onPress={this.updateGroup}
            selectedIndex={selectedGroup}
            buttons={buttons}
            containerStyle={styles.buttonGroup}
          />
        </View>
        {this.state.selectedGroup == 0 ? (
          <GetHelpCard
            user={user}
            onSelectCourse={this.onSelectCourse}
            selectedCourse={this.state.selectedCourse}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const container = createContainer(params => ({}), Show);

container.navigationOptions = ({ navigation }) => {
  const { state: { params = {} } } = navigation;
  return {
    title: params.title || 'Choose Time Slot',
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
};

export default container;
