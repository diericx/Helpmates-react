import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import styles from "./styles";

const slides = [
  {
    key: "somethun",
    title: "Start making money!",
    text:
      "Go into your profile\n\nSet your availabilities and the classes you've taken.\n\n We'll take care of the rest.",
    icon: "ios-card",
    colors: ["#63E2FF", "#B066FE"]
  },
  {
    key: "somethun1",
    title: "Get help with your classes!",
    text: (
      <Text>
        <Text>
          Find someone who's already taken the courses you're in for help with
          specific projects or assignments {"\n\n"}
        </Text>
        <Text style={{ fontWeight: "bold" }}>OR {"\n\n"}</Text>
        <Text>Use the</Text>
        <Text style={{ fontWeight: "bold" }}> anonymous group chats </Text>
        <Text>to ask quick questions</Text>
      </Text>
    ),
    icon: "ios-school-outline",
    colors: ["#A3A1FF", "#3A3897"]
  },
  {
    key: "somethun2",
    title: "Go get a drink",
    text: "We make studying easier so you have more time to relax.",
    icon: "ios-beer-outline",
    colors: ["#29ABE2", "#4F00BC"]
  }
];

export default class App extends React.Component {
  _renderItem = props => (
    <View
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
          backgroundColor: props.colors[0]
        }
      ]}
    >
      <Ionicons
        style={{ backgroundColor: "transparent" }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={this.props._onDone}
        bottomButton
      />
    );
  }
}
