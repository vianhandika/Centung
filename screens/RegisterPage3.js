import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const RegisterPage3 = () => {
  const [labelOpen, setLabelOpen] = useState(false);
  const [labelItems, setLabelItems] = useState([
    { value: "Laki-Laki", label: "Laki-Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ]);
  const navigation = useNavigation();

  return (
    <View style={styles.registerPage3}>
      <View style={[styles.buttonParent, styles.buttonParentPosition]}>
        <Pressable
          style={[styles.button, styles.btnShadowBox]}
          onPress={() => navigation.navigate("RegisterPage4")}
        >
          <LinearGradient
            style={[styles.btn, styles.btnPosition]}
            locations={[0, 1]}
            colors={["#92a3fd", "#9dceff"]}
            useAngle={true}
            angle={-85.58}
          />
          <View style={styles.next}>
            <Text style={styles.next1}>Next</Text>
            <Image
              style={styles.iconlylightarrowRight2}
              resizeMode="cover"
              source={require("../assets/iconlylightarrow--right-22.png")}
            />
          </View>
        </Pressable>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../assets/frame-10295.png")}
        />
        <View style={[styles.profileTextParent, styles.buttonParentPosition]}>
          <View style={styles.profileText}>
            <Text style={styles.mariLengkapiProfile}>
              Mari lengkapi profile mu
            </Text>
            <Text style={styles.iniDapatMembantu}>
              Ini dapat membantu kami untuk lebih mengenalmu
            </Text>
          </View>
          <View style={styles.labelSection}>
            <View
              style={[styles.label, styles.labelLayout]}
              placeholder="Jenis Kelamin"
            >
              <DropDownPicker
                open={labelOpen}
                setOpen={setLabelOpen}
                items={labelItems}
                labelStyle={styles.labelValue}
              />
            </View>
            <Input
              placeholder="Tanggal Lahir"
              required={true}
              leftIcon={{ name: "calendar-range", type: "material-community" }}
              inputStyle={{ color: "#ada4a5" }}
              containerStyle={styles.labelTextInputInput}
            />
            <View style={[styles.label1, styles.labelLayout]}>
              <View style={styles.buttonKg}>
                <LinearGradient
                  style={[styles.buttonKgChild, styles.btnPosition]}
                  locations={[0, 1]}
                  colors={["#c58bf2", "#eea4ce"]}
                  useAngle={true}
                  angle={-85.58}
                />
                <Text style={[styles.kg, styles.kgTypo]}>KG</Text>
              </View>
              <Input
                placeholder="Berat Badan"
                required={true}
                leftIcon={{
                  name: "scale-bathroom",
                  type: "material-community",
                }}
                inputStyle={{ color: "#ada4a5" }}
                containerStyle={styles.component1TextInputInput}
              />
            </View>
            <View style={[styles.label2, styles.labelLayout]}>
              <View style={styles.buttonKg}>
                <LinearGradient
                  style={[styles.buttonKgChild, styles.btnPosition]}
                  locations={[0, 1]}
                  colors={["#c58bf2", "#eea4ce"]}
                  useAngle={true}
                  angle={-85.58}
                />
                <Text style={[styles.cm, styles.kgTypo]}>CM</Text>
              </View>
              <Input
                placeholder="Tinggi Badan"
                required={true}
                leftIcon={{ name: "swap-vertical", type: "material-community" }}
                inputStyle={{ color: "#ada4a5" }}
                containerStyle={styles.component2TextInputInput}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelValue: {
    color: "#ada4a5",
    fontSize: 12,
    fontFamily: "Poppins_regular",
  },
  labelTextInputInput: {
    left: 0,
    width: 315,
    height: 48,
    top: 63,
    position: "absolute",
  },
  component1TextInputInput: {
    left: 0,
    width: 252,
    height: 48,
    top: 0,
    position: "absolute",
  },
  component2TextInputInput: {
    left: 0,
    width: 252,
    height: 48,
    top: 0,
    position: "absolute",
  },
  buttonParentPosition: {
    width: 315,
    marginLeft: -157.5,
    left: "50%",
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
  },
  btnPosition: {
    backgroundColor: Color.blueLinear,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  labelLayout: {
    height: 48,
    left: 0,
    width: 315,
    position: "absolute",
  },
  kgTypo: {
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
    top: "31.25%",
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    textAlign: "left",
    color: Color.whiteColor,
    position: "absolute",
  },
  btn: {
    borderRadius: Border.br_80xl,
    shadowOpacity: 1,
    elevation: 22,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(149, 173, 254, 0.3)",
  },
  next1: {
    fontSize: FontSize.textLargeTextRegular_size,
    lineHeight: 24,
    textAlign: "center",
    color: Color.whiteColor,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  iconlylightarrowRight2: {
    height: "83.33%",
    width: "32.79%",
    top: "8.33%",
    bottom: "8.33%",
    left: "67.21%",
    maxWidth: "100%",
    maxHeight: "100%",
    right: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  next: {
    height: "40%",
    width: "19.37%",
    top: "30%",
    right: "40.32%",
    bottom: "30%",
    left: "40.32%",
    position: "absolute",
  },
  button: {
    top: 595,
    height: 60,
    width: 315,
    marginLeft: -157.5,
    left: "50%",
    position: "absolute",
  },
  frameChild: {
    marginLeft: -143.5,
    width: 287,
    height: 226,
    top: 0,
    left: "50%",
    position: "absolute",
  },
  mariLengkapiProfile: {
    // left: 21,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    color: Color.blackColor,
    textAlign: "center",
    top: 0,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    position: "absolute",
  },
  iniDapatMembantu: {
    top: 35,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray1,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    // left: 0,
    textAlign: "center",
    position: "absolute",
  },
  profileText: {
    // left: 1,
    width: "100%",
    height: 53,
    top: 0,
    position: "absolute",
    justifyContent:"center",
    alignItems:"center",
  },
  label: {
    top: 0,
  },
  buttonKgChild: {
    borderRadius: Border.br_sm,
  },
  kg: {
    left: "33.33%",
  },
  buttonKg: {
    width: "15.24%",
    left: "84.76%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
  },
  label1: {
    top: 126,
  },
  cm: {
    left: "29.17%",
  },
  label2: {
    top: 189,
  },
  labelSection: {
    top: 83,
    height: 237,
    left: 0,
    width: 315,
    position: "absolute",
  },
  profileTextParent: {
    top: 245,
    height: 320,
    // width:"100%",
    // backgroundColor:"orange",
    
  },
  buttonParent: {
    bottom: 16,
    height: 665,
  },
  registerPage3: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default RegisterPage3;
