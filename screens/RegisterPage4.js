import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Input } from "@rneui/themed";
import RectangleComponent from "../components/RectangleComponent";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const RegisterPage4 = () => {
  const [rectangleFlatListData, setRectangleFlatListData] = useState([
    <RectangleComponent />,
  ]);
  const navigation = useNavigation();

  return (
    <View style={styles.registerPage4}>
      <View style={[styles.buttonParent, styles.parentPosition]}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SuccessRegistration")}
        >
          <LinearGradient
            style={[styles.btn, styles.btnPosition]}
            locations={[0, 1]}
            colors={["#92a3fd", "#9dceff"]}
            useAngle={true}
            angle={-85.58}
          />
          <View style={styles.next}>
            <Text style={[styles.next1, styles.next1Typo]}>Next</Text>
            <Image
              style={styles.iconlylightarrowRight2}
              resizeMode="cover"
              source={require("../assets/iconlylightarrow--right-22.png")}
            />
          </View>
        </Pressable>
        <View style={[styles.profileTextParent, styles.parentPosition]}>
          <View style={styles.profileText}>
            <Text style={[styles.mariLengkapiProfile, styles.textTypo]}>
              Mari lengkapi profile mu
            </Text>
            <Text style={[styles.iniDapatMembantu, styles.textLayout]}>
              Ini dapat membantu kami untuk lebih mengenalmu
            </Text>
          </View>
          <View style={[styles.labelSection, styles.labelLayout]}>
            <View style={[styles.label, styles.labelLayout]}>
              <Pressable
                style={styles.buttonCm}
                onPress={() => navigation.navigate("LoginPage")}
              >
                <LinearGradient
                  style={[styles.buttonCmChild, styles.btnPosition]}
                  locations={[0, 1]}
                  colors={["#c58bf2", "#eea4ce"]}
                  useAngle={true}
                  angle={-85.58}
                />
                <Text style={[styles.text, styles.textLayout]}>+</Text>
              </Pressable>
              <Input
                placeholder="Riwayat Sakit"
                required={false}
                autoFocus={false}
                leftIcon={{ name: "heart-outline", type: "material-community" }}
                inputStyle={{ color: "#ada4a5" }}
                containerStyle={styles.component3TextInputInput}
              />
            </View>
          </View>
          <View style={[styles.componentWrapper, styles.frameItemPosition]}>
            <FlatList
              style={styles.frameChild}
              data={rectangleFlatListData}
              renderItem={({ item }) => item}
              contentContainerStyle={styles.rectangleFlatListContent}
            />
          </View>
        </View>
        <Image
          style={[styles.frameItem, styles.frameItemPosition]}
          resizeMode="cover"
          source={require("../assets/frame-10295.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component3TextInputInput: {
    left: 0,
    width: 252,
    height: 48,
    top: 0,
    position: "absolute",
  },
  rectangleFlatListContent: {
    flexDirection: "column",
  },
  parentPosition: {
    width: "100%",
    justifyContent:"center",
    alignItems:"center",
    // marginLeft: -158.5,
    // left: "50%",
    position: "absolute",
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
  next1Typo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontSize: FontSize.titleH4Bold_size,
  },
  textLayout: {
    lineHeight: 18,
    position: "absolute",
  },
  labelLayout: {
    height: 48,
    width: 315,
    left: "50%",
    position: "absolute",
  },
  frameItemPosition: {
    left: "50%",
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
    backgroundColor: Color.blueLinear,
  },
  next1: {
    fontSize: FontSize.textLargeTextRegular_size,
    lineHeight: 24,
    textAlign: "center",
    color: Color.whiteColor,
    left: "0%",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    top: "0%",
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
    top: 598,
    height: 60,
    width: 315,
    shadowOpacity: 1,
    elevation: 22,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(149, 173, 254, 0.3)",
    marginLeft: -157.5,
    left: "50%",
    position: "absolute",
  },
  mariLengkapiProfile: {
    // left: 21,
    lineHeight: 30,
    color: Color.blackColor,
    top: 0,
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    position: "absolute",
  },
  iniDapatMembantu: {
    top: 35,
    fontSize: FontSize.textSmallTextRegular_size,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray1,
    // left: 0,
    textAlign: "center",
  },
  profileText: {
    width: '100%',
    height: 53,
    // left: 0,
    alignItems:"center",
    top: 0,
    position: "absolute",
  },
  buttonCmChild: {
    borderRadius: Border.br_sm,
  },
  text: {
    top: "31.25%",
    left: "33.33%",
    fontWeight: "500",
    fontFamily: FontFamily.textSmallTextMedium,
    textAlign: "left",
    fontSize: FontSize.titleH4Bold_size,
    color: Color.whiteColor,
  },
  buttonCm: {
    width: "15.24%",
    left: "84.76%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
  },
  label: {
    top: 0,
    marginLeft: -157.5,
    height: 48,
  },
  labelSection: {
    marginLeft: -156.5,
    top: 77,
  },
  frameChild: {
    alignSelf: "stretch",
    flex: 1,
  },
  componentWrapper: {
    marginLeft: -149.5,
    top: 135,
    width: 306,
    height: 150,
    alignItems: "center",
  },
  profileTextParent: {
    top: 248,
    height: 285,
    // width:"100%",
    // backgroundColor:"orange",
    
  },
  frameItem: {
    marginLeft: -148.5,
    width: 287,
    height: 226,
    top: 0,
  },
  buttonParent: {
    bottom: 23,
    height: 658,
  },
  registerPage4: {
    backgroundColor: Color.whiteColor,
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default RegisterPage4;
