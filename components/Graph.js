import * as React from "react";
import { StyleProp, ViewStyle, Image, StyleSheet } from "react-native";

const GraphIcon = ({ style }) => {
  return (
    <Image
      style={[styles.graphIcon, style]}
      resizeMode="cover"
      source={require("../assets/graph.png")}
    />
  );
};

const styles = StyleSheet.create({
  graphIcon: {
    width: 75,
    height: 80,
  },
});

export default GraphIcon;
