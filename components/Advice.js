import * as React from "react";
import { StyleProp, ViewStyle, Image, StyleSheet } from "react-native";

const AdviceIcon = ({ style }) => {
  return (
    <Image
      style={[styles.adviceIcon, style]}
      resizeMode="cover"
      source={require("../assets/advice.png")}
    />
  );
};

const styles = StyleSheet.create({
  adviceIcon: {
    width: 75,
    height: 80,
  },
});

export default AdviceIcon;
