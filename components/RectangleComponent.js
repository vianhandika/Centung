import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";

const RectangleComponent = ({ style }) => {
  return <View style={[styles.rectangleView, style]} />;
};

const styles = StyleSheet.create({
  rectangleView: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "#d9d9d9",
  },
});

export default RectangleComponent;
