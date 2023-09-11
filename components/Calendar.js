import * as React from "react";
import { StyleProp, ViewStyle, Image, StyleSheet } from "react-native";

const CalendarIcon = ({ style }) => {
  return (
    <Image
      style={[styles.calendarIcon, style]}
      resizeMode="cover"
      source={require("../assets/calendar.png")}
    />
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    width: 75,
    height: 80,
  },
});

export default CalendarIcon;
