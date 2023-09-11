import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const WelcomeScreen2 = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.welcomeScreen2}
      locations={[0, 1]}
      colors={["#92a3fd", "#9dceff"]}
      useAngle={true}
      angle={-85.58}
    >
      <View style={styles.frame}>
        <View style={[styles.frameParent, styles.frameFlexBox]}>
          <View style={[styles.frame1, styles.frameFlexBox]}>
            <Text style={[styles.centung, styles.centungFlexBox]}>
              <Text style={styles.c}>C</Text>
              <Text style={styles.entung}>ENTUNG</Text>
            </Text>
          </View>
          <Text
            style={[styles.centongPintarHitungContainer, styles.centungFlexBox]}
          >
            <Text style={styles.c}>Centong</Text>
            <Text style={styles.entung}> Pintar Hitung</Text>
          </Text>
        </View>
      </View>
      <Pressable
        style={[styles.getStartBtn, styles.frameFlexBox]}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Text style={[styles.ayoLekasMulai, styles.centungTypo]}>
          Ayo Lekas Mulai
        </Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
  centungFlexBox: {
    textAlign: "center",
    alignSelf: "stretch",
  },
  centungTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  c: {
    color: Color.gray_200,
  },
  entung: {
    color: Color.whiteColor,
  },
  centung: {
    fontSize: 36,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  frame1: {
    overflow: "hidden",
  },
  centongPintarHitungContainer: {
    fontSize: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    marginTop: 6,
  },
  frameParent: {
    alignItems: "center",
  },
  frame: {
    width: 213,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  ayoLekasMulai: {
    fontSize: FontSize.textLargeTextRegular_size,
    textAlign: "left",
    color: "black",
  },
  getStartBtn: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.whiteColor,
    height: 60,
    marginTop: 264,
    alignItems: "center",
  },
  welcomeScreen2: {
    flex: 1,
    width: "100%",
    height: 812,
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: Color.blueLinear,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default WelcomeScreen2;
