import * as React from "react";
import { StyleProp, ViewStyle, Image, StyleSheet } from "react-native";

const DocumentIcon1 = ({ style }) => {
  return (
    <Image
      style={[styles.documentIcon, style]}
      resizeMode="cover"
      source={require("../assets/document1.png")}
    />
  );
};

const styles = StyleSheet.create({
  documentIcon: {
    width: 75,
    height: 80,
  },
});

export default DocumentIcon1;
