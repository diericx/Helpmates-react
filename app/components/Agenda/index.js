import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";

import {
  DateToLocalString,
  DateTo12HourTime,
  DateToString
} from "../../Helpers/Date";

import styles from "./styles";

export default class UserAgenda extends React.Component {
  constructor(props) {
    super(props);
    // set state
    this.state = {
      items: {},
      startDate: null,
      endDate: null,
      isModalVisible: false
    };
    // bindings
    this.loadItems = this.loadItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyDate = this.renderEmptyDate.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
  }

  // When a time slot is pressed
  onTimeSlotPress(startDate, endDate) {
    this.setState({
      startDate,
      endDate
    });
    this._toggleModal();
  }

  // Toggle the modal
  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  loadItems(day) {
    setTimeout(() => {
      const today = new Date();
      const todayLocal = DateToLocalString(today);
      const dateInc = new Date(today.getUTCFullYear(), day.month - 1, 1);

      while (dateInc.getMonth() + 1 <= day.month + 1) {
        const dateIncStr = DateToString(dateInc);

        // if this day of the month hasn't been populated yet
        if (!this.state.items[dateIncStr]) {
          this.state.items[dateIncStr] = [];
          // populate it with info from availabilities
          for (let i = 0; i < this.props.availabilities.length; i++) {
            // get data for this availability
            const availability = this.props.availabilities[i];
            const availabilityDate = new Date(availability.date);
            // if it is the same day of the week
            if (dateInc.getDay() == availabilityDate.getDay()) {
              // create new date on dateInc day, with availability time
              var updatedDate = new Date(dateInc);
              updatedDate.setHours(availabilityDate.getHours());
              updatedDate.setMinutes(availabilityDate.getMinutes());

              this.state.items[dateIncStr].push({
                startDate: updatedDate,
                endDate: new Date(
                  updatedDate.getTime() + availability.length * 60000
                ),
                height: 100
              });
            }
          }
        }
        dateInc.setDate(dateInc.getDate() + 1);
      }

      // update items with new object to give a sense of immutability
      // this seems kinda fucked up to me
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  // Render a time slot
  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onTimeSlotPress(item.startDate, item.endDate);
        }}
      >
        <View style={[styles.item, { height: item.height }]}>
          <Text style={{ color: "lightgray" }}>
            {DateTo12HourTime(item.startDate)}
          </Text>
          <Text style={{ color: "lightgray" }}>
            {DateTo12HourTime(item.endDate)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Render the day
  // renderDay(day, item) {
  //   if (day) {
  //     if (day.dateString == DateToString(this.state.selectedDate)) {
  //       return (
  //         <View>
  //           <Text> {day.dateString} </Text>
  //         </View>
  //       );
  //     }
  //   }
  //   console.log(day);
  //   // console.log(item);
  // }

  // Render a day with no time slots
  renderEmptyDate() {
    return <View style={styles.emptyDate} />;
  }

  render() {
    const today = new Date();
    const todayString = DateToLocalString(today);
    return (
      <View style={styles.container}>
        <this.props.modal
          name={this.props.name}
          userId={this.props.userId}
          courseId={this.props.courseId}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          isVisible={this.state.isModalVisible}
          toggleModal={this._toggleModal}
        />
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems}
          selected={todayString}
          minDate={todayString}
          renderItem={this.renderItem}
          // renderDay={this.renderDay.bind(this)}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          pastScrollRange={1}
          futureScrollRange={50}
          // onDayPress={(day) => {
          //   this.setState({ selectedDate: new Date(day.dateString) });
          // }}
        />
      </View>
    );
  }
}
