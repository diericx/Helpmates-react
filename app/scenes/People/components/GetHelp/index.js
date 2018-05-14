import React from "react";
import { View, ScrollView } from "react-native";
import { Card } from "react-native-elements";

import styles from "./styles";

import Agenda from "../../../../components/Agenda";
import SendRequestModal from "../../../../components/modals/SendRequestModal/index";
import CoursePicker from "../CoursePicker/index";

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.cardContainer}>
        {!this.props.selectedCourse ? (
          <Card containerStyle={styles.card}>
            <ScrollView style={styles.cardScrollView}>
              <CoursePicker
                courses={this.props.user.profile.completedCourses}
                onSelectCourse={this.props.onSelectCourse}
              />
            </ScrollView>
          </Card>
        ) : (
          <Card
            containerStyle={[styles.card, styles.agendaCard]}
            wrapperStyle={styles.agendaCardWrapper}
          >
            <Agenda
              modal={SendRequestModal}
              availabilities={this.props.user.profile.availabilities}
              name={this.props.user.profile.name}
              userId={this.props.user._id}
              courseId={this.props.selectedCourse}
            />
          </Card>
        )}
      </View>
    );
  }
}
