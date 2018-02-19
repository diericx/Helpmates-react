import React from 'react';
import { StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import AuthIndexContainer from '../containers/Auth';
// Auth Screens
import AuthIndexScreen from '../scenes/Auth/index';
import AuthLoginScreen from '../scenes/Auth/login';
import AuthSignupScreen from '../scenes/Auth/signup';
// User Screens
import UsersChooseTimeSlotScreen from '../scenes/Users/chooseTimeSlot';
import UsersChooseTutorScreen from '../scenes/Users/chooseTutor';
import UsersTutorScreen from '../scenes/Users/tutor';
import UsersProfileScreen from '../scenes/Users/profile';
// Course Screens
import CoursesChooseCourseScreen from '../scenes/Courses/chooseCourse';
// Help Session Request
import HelpSessionRequestSendScreen from '../scenes/HelpSessionRequest/sendRequest';
import HelpSessionRequestIndexScreen from '../scenes/HelpSessionRequest/index';

const SendHelpSessionRequestStack = StackNavigator(
  {
    SendHelpSessionRequest: {
      screen: HelpSessionRequestSendScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const ChooseTimeSlotStack = StackNavigator(
  {
    ChooseTimeSlot: {
      screen: UsersChooseTimeSlotScreen,
    },
    SendHelpSessionRequest: {
      screen: HelpSessionRequestSendScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const StudentStack = StackNavigator({
  ChooseCourse: {
    screen: CoursesChooseCourseScreen,
  },
  ChooseTutor: {
    screen: UsersChooseTutorScreen,
  },
  ChooseTimeSlot: {
    screen: ChooseTimeSlotStack,
  },
});

const TutorStack = StackNavigator({
  Home: {
    screen: UsersTutorScreen,
  },
});

const ProfileStack = StackNavigator({
  Profile: {
    screen: UsersProfileScreen,
  },
});

const HelpSessionStack = StackNavigator({
  Index: {
    screen: HelpSessionRequestIndexScreen,
  },
});

export const MainNavigation = TabNavigator(
  {
    GetHelp: {
      screen: StudentStack,
      navigationOptions: {
        tabBarLabel: 'Get Help',
      },
    },
    Sessions: {
      screen: HelpSessionStack,
      navigationOptions: {
        tabBarLabel: 'Sessions',
      },
    },
    Tutor: {
      screen: TutorStack,
      navigationOptions: {
        tabBarLabel: 'Tutor',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'GetHelp') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Sessions') {
          iconName = `ios-send${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

export const AuthStack = StackNavigator({
  Index: {
    screen: AuthIndexScreen,
  },
  Login: {
    screen: AuthLoginScreen,
  },
  Signup: {
    screen: AuthSignupScreen,
  },
});

// Root navigator
// export default StackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//     },
//   },
//   {
//     headerMode: 'none',
//   },
// );
