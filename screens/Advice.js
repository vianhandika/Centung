import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Advice = () => {
  return (
    <View style={[styles.advice, styles.adviceLayout]}>
      <View style={styles.header}>
        <View style={styles.titleHome}>
          <Text
            style={[styles.selamatDatang, styles.menuAdvicePosition]}
          >{`Selamat Datang `}</Text>
          <Text style={[styles.menuAdvice, styles.menuAdvicePosition]}>
            Menu Advice
          </Text>
        </View>
        <Image
          style={styles.notificationIcon}
          resizeMode="cover"
          source={require("../assets/notification.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adviceLayout: {
    overflow: "hidden",
    width: "100%",
  },
  menuAdvicePosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  homeParentFlexBox: {
    flexDirection: "row",
    width: 375,
  },
  selamatDatang: {
    fontSize: FontSize.textSmallTextRegular_size,
    lineHeight: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray2,
    top: 0,
    textAlign: "left",
  },
  menuAdvice: {
    top: 23,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
  },
  titleHome: {
    width: 134,
    left: 0,
    top: 0,
    height: 53,
    position: "absolute",
  },
  notificationIcon: {
    top: -25,
    left: 235,
    width: 110,
    height: 120,
    position: "absolute",
  },
  header: {
    top: 40,
    left: 30,
    width: 315,
    height: 53,
    position: "absolute",
  },
  advice: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
  },
});

export default Advice;
