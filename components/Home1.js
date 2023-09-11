import * as React from "react";
import { StyleProp, ViewStyle, Image, StyleSheet } from "react-native";

const HomeIcon1 = ({ style }) => {
  return (
    <Image
      style={[styles.homeIcon, style]}
      resizeMode="cover"
      source={require("../assets/home1.png")}
    />
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    width: 75,
    height: 80,
  },
});

export default HomeIcon1;
