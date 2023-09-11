import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";

const RegisterPage2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.registerPage2}>
      <View style={[styles.titleSection, styles.itWillHelpLayout]}>
        <Text style={[styles.opsiPengguna, styles.buttonTypo]}>
          Opsi Pengguna
        </Text>
        <Text style={[styles.itWillHelp, styles.itWillHelpLayout]}>
          It will help us to choose a best program for you
        </Text>
      </View>
      <View style={[styles.pribadiBtnParent, styles.opsiPenggunaPosition]}>
        <LinearGradient
          style={styles.pribadiBtn}
          locations={[0, 1]}
          colors={["#92a3fd", "#9dceff"]}
          useAngle={true}
          angle={-85.58}
        >
          <Pressable
            style={styles.pressableShadowBox}
            onPress={() => navigation.navigate("RegisterPage3")}
          >
            <Text style={[styles.button, styles.buttonTypo]}>Pribadi</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient
          style={styles.keluargaBtn}
          locations={[0, 1]}
          colors={["#92a3fd", "#9dceff"]}
          useAngle={true}
          angle={-85.58}
        >
          <Pressable
            style={styles.pressableShadowBox}
            onPress={() => navigation.navigate("RegisterPage3")}
          >
            <Text style={[styles.button, styles.buttonTypo]}>Keluarga</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itWillHelpLayout: {
    width: "100%",
    position: "absolute",
  },
  buttonTypo: {
    textAlign: "left",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  opsiPenggunaPosition: {
    position: "absolute",
    left: "50%",
  },
  opsiPengguna: {
    // marginLeft: -82,
    top: 0,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    textAlign:"center",
    color: Color.blackColor,
    // left: "50%",
    position: "absolute",
  },
  itWillHelp: {
    top: 35,
    // left: 0,
    fontSize: FontSize.textSmallTextRegular_size,
    lineHeight: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray1,
    textAlign: "center",
  },
  titleSection: {
    // marginLeft: -90.5,
    top: 40,
    height: 71,
    width:"100%",
    // backgroundColor:"orange",
    justifyContent:"center",
    alignItems:"center",
    // left: "50%",
  },
  button: {
    fontSize: FontSize.textLargeTextRegular_size,
    lineHeight: 24,
    color: Color.whiteColor,
  },
  pressableShadowBox: {
    backgroundColor: Color.blueLinear,
    // backgroundColor:'black',
    // display:'flex',
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: Padding.p_lg,
    // paddingHorizontal: Padding.p_110xl,
    // paddingVertical: 'auto',
    // paddingHorizontal: 'auto',
    flexDirection: "row",
    shadowOpacity: 1,
    elevation: 22,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(149, 173, 254, 0.3)",
    borderRadius: Border.br_80xl,
    width: "100%",
  },
  pribadiBtn: {
    width: 315,
    minHeight:50,
    borderRadius: Border.br_80xl,
  },
  keluargaBtn: {
    marginTop: 38,
    minHeight:50,
    width: 315,
    borderRadius: Border.br_80xl,
  },
  pribadiBtnParent: {
    marginLeft: -157.5,
    top: 287,
    bottom: 367,
    alignItems: "center",
    justifyContent: "center",
    left: "50%",
    minHeight:150,
    // backgroundColor:'black'
  },
  registerPage2: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default RegisterPage2;
