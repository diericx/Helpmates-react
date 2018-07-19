import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import EStyleSheet from 'react-native-extended-stylesheet';

// Navigation
// import SwipeNav from "../components/navigation/SwipeNav";
import HomeScreen from "../screens/Home";
import GroupScreen from "../screens/Group";
import ResourceScreen from "../screens/Resource";

import MessagesScreen from "../screens/Messages";
import ChooseUniversityScreen from "../screens/explore/ChooseUniversity"
import ChooseCourseScreen from "../screens/explore/ChooseCourse"
import ChooseGroupScreen from "../screens/explore/ChooseGroup"

// Modals
import Chat from "../screens/Chat";

// Auth
import AuthHome from '../screens/auth/AuthHome'
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';


export const PageTitles = [
  "Courses",
  "People",
  "Messages"
]


const styles = EStyleSheet.create({
  exploreNavBar: {
    backgroundColor: "$lightblue"
  }
});


export const AuthStack = createStackNavigator({
  AuthHome: {
    screen: AuthHome,
  },
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp
  }
}, {
  headerMode: 'none',
});

export const ExploreStack = createStackNavigator({
  ChooseUniversity: ChooseUniversityScreen,
  ChooseCourse: ChooseCourseScreen,
  ChooseGroup: ChooseGroupScreen
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
    }
  },
})

export const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Group: {
    screen: GroupScreen
  },
  Resource: {
    screen: ResourceScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0
      }
    }
  }
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
    }
  },
})

export const TabNavigation = createBottomTabNavigator(
  {
    Explore: ExploreStack,
    Home: HomeStack,
    Help: MessagesScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType = 'material-community';
        if (routeName === 'Explore') {
          iconName = 'wpexplorer';
          iconType = 'font-awesome';
        } else if (routeName === 'Home') {
          iconName = 'group';
          iconType = 'font-awesome';
        } else if (routeName == 'Help') {
          iconName = 'life-bouy';
          iconType = 'font-awesome';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} type={iconType} size={30} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false
    },
  }
);