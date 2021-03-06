import React from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, withFirebase } from 'react-redux-firebase';
import { isEmpty } from '@firebase/util';
import CachedAvatar from './CachedAvatar';
import NavigationService from '../../config/navigationService';

/**
 * Used for the top right of the NavBar. A Component that displays a small avatar icon and opens the Profile modal
 * when tapped.
 */
@compose(
  withFirebase,
  connect(({ firebase: { profile } }) => ({
    profile,
  }))
)
export default class NavBarAvatar extends React.Component {
  render() {
    const { profile } = this.props;

    // Wait until the profile is actually laoded
    if (!isLoaded(profile) || isEmpty(profile) || !profile.avatar) {
      return null;
    }

    console.log('Profile loaded: ', profile);

    // Render the profile avatar
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 0,
          backgroundColor: 'white',
          width: 50,
          height: 50,
          marginRight: 10,
        }}
      >
        <CachedAvatar
          size={50}
          rounded
          uri={profile.avatar.uri}
          preview={profile.avatar.preview}
          onPress={() => NavigationService.navigate('ProfileModal')}
          activeOpacity={0.7}
        />
      </View>
    );
  }
}
