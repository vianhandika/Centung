import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.home, styles.homeLayout]}>
      <View style={styles.header}>
        <View style={styles.titleHome}>
          <Text
            style={[styles.selamatDatang, styles.menuHomePosition]}
          >{`Selamat Datang `}</Text>
          <Text style={[styles.menuHome, styles.menuHomePosition]}>
            Menu Home
          </Text>
        </View>
        <Pressable
          style={styles.notification}
          onPress={() => navigation.navigate("WelcomeScreen2")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/notification.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeLayout: {
    overflow: "hidden",
    width: "100%",
  },
  menuHomePosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  homeFlexBox: {
    flexDirection: "row",
    width: 375,
  },
  selamatDatang: {
    fontSize: FontSize.textSmallTextMedium_size,
    lineHeight: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray2,
    top: 0,
    textAlign: "left",
  },
  menuHome: {
    top: 23,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
  },
  titleHome: {
    width: 123,
    left: 0,
    top: 0,
    height: 53,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  notification: {
    left: 235,
    top: -25,
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
  home: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
  },
});

export default Home;
