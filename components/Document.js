import * as React from "react";
import { StyleProp, ViewStyle, Image, StyleSheet } from "react-native";

const DocumentIcon = ({ style }) => {
  return (
    <Image
      style={[styles.documentIcon, style]}
      resizeMode="cover"
      source={require("../assets/document.png")}
    />
  );
};

const styles = StyleSheet.create({
  documentIcon: {
    width: 75,
    height: 80,
  },
});

export default DocumentIcon;
