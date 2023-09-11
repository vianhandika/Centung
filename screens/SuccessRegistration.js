import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const SuccessRegistration = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.successRegistration}>
      <View style={[styles.titleSectionParent, styles.titlePosition]}>
        <View style={styles.titleSection}>
          <View style={styles.onboardDescription}>
            <Text style={styles.youAreAll}>
              You are all set now, let’s reach your goals together with us
            </Text>
          </View>
          <View style={[styles.onboardTitle, styles.onboardTitlePosition]}>
            <Text
              style={[styles.selamatBergabungStefani]}
            >
              Selamat Bergabung, Stefani
            </Text>
          </View>
        </View>
        <Image
          style={styles.groupIcon}
          resizeMode="cover"
          source={require("../assets/group.png")}
        />
      </View>
      <Pressable
        style={[styles.button, styles.btnShadowBox]}
        onPress={() =>
          navigation.navigate("BottomTabsRoot", { screen: "Home" })
        }
      >
        <LinearGradient
          style={[styles.btn, styles.btnShadowBox]}
          locations={[0, 1]}
          colors={["#92a3fd", "#9dceff"]}
          useAngle={true}
          angle={-85.58}
        />
        <View style={styles.next}>
          <Text style={[styles.masukBeranda, styles.masukBerandaTypo]}>
            Masuk Beranda
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  titlePosition: {
    width: "100%",
    // left: "50%",
    position: "absolute",

  },
  onboardTitlePosition: {
    top: 0,
    // marginLeft: -145,
  },
  masukBerandaTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    textAlign: "center",
    // left: "50%",
    position: "absolute",
  },
  btnShadowBox: {
    shadowOpacity: 1,
    elevation: 22,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(149, 173, 254, 0.3)",
    position: "absolute",
  },
  youAreAll: {
    fontSize: FontSize.textSmallTextRegular_size,
    lineHeight: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray1,
    textAlign: "center",
    top: 0,
    width: '100%',
    // marginLeft: -107,
    // left: "50%",
    position: "absolute",
  },
  onboardDescription: {
    top: 35,
    height: 36,
    width: 214,
    marginLeft: -107,
    left: "50%",
    position: "absolute",
  },
  selamatBergabungStefani: {
    fontSize: FontSize.titleH4Bold_size,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    lineHeight: 30,
    color: Color.blackColor,
    top: 0,
    textAlign:"center",
    // marginLeft: -145,
  },
  onboardTitle: {
    height: 30,
    width: "100%",
    // left: "50%",
    position: "absolute",
    // backgroundColor:"white",
  },
  titleSection: {
    top: 320,
    height: 71,
    marginLeft: -145,
    width: 290,
    left: "50%",
    position: "absolute",
  },
  groupIcon: {
    height: "67.34%",
    width: "86.21%",
    right: "6.9%",
    bottom: "32.66%",
    left: "6.9%",
    maxWidth: "100%",
    maxHeight: "100%",
    top: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  titleSectionParent: {
    // marginLeft: -144.5,
    // backgroundColor:"orange",
    top: 42,
    height: 391,
  },
  btn: {
    height: "100%",
    // right: "0%",
    bottom: "0%",
    // left: "0%",
    borderRadius: Border.br_80xl,
    backgroundColor: Color.blueLinear,
    top: "0%",
    width: 315,
  },
  masukBeranda: {
    // marginLeft: -65,
    fontSize: FontSize.textLargeTextRegular_size,
    lineHeight: 24,
    color: Color.whiteColor,
    
    top: "0%",
  },
  next: {
    height: "40%",
    // marginLeft: -64.5,
    // top: "30%",
    // bottom: "30%",
    width: 130,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"orange"
    // left: "50%",
    // position: "absolute",
  },
  button: {
    // marginLeft: -157.5,
    top: 563,
    width: "100%",
    height: 60,
    alignItems:"center",
    justifyContent:"center",
    // left: "50%",
    // backgroundColor:"orange",

  },
  successRegistration: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default SuccessRegistration;
