import * as React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, View, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Input,Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

// isPasswordVisible = false;

const LoginPage = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  var username = "secure_password";
  var password = "secure_password";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  return (
    <View style={styles.loginPage}>
      <View style={[styles.loginBtnParent, styles.labelSectionPosition]}>
        <Pressable
          style={styles.loginBtn}
          onPress={() =>
            navigation.navigate("BottomTabsRoot", { screen: "Home" })
          }
        >
          <LinearGradient
            style={[styles.loginBtnChild, styles.loginBtnChildPosition]}
            locations={[0, 1]}
            colors={["#92a3fd", "#9dceff"]}
            useAngle={true}
            angle={-85.58}
          />
          <View style={styles.iconlyboldloginParent}>
            <Image
              style={[styles.iconlyboldlogin, styles.loginBtnChildPosition]}
              resizeMode="cover"
              source={require("../assets/iconlyboldlogin1.png")}
            />
            <Text style={[styles.login, styles.loginTypo]}>Login</Text>
          </View>
        </Pressable>
        <View style={styles.or}>
          <Image
            style={styles.orChild}
            resizeMode="cover"
            source={require("../assets/vector-67.png")}
          />
          <Text style={[styles.atau, styles.atauClr]}>Atau</Text>
          <Image
            style={styles.orItem}
            resizeMode="cover"
            source={require("../assets/vector-68.png")}
          />
        </View>
        <Pressable
          style={[styles.loginSocialMedia, styles.btnFlexBox]}
          onPress={() => navigation.navigate("WelcomeScreen2")}
        >
          <View style={[styles.googleBtn, styles.btnFlexBox]}>
            <Image
              style={styles.googleLogoPngSuiteEverythiIcon}
              resizeMode="cover"
              source={require("../assets/googlelogopngsuiteeverythingyouneedknowaboutgooglenewest0-2.png")}
            />
          </View>
        </Pressable>
        <Pressable
          style={[styles.registerPageBtn, styles.btnFlexBox]}
          onPress={() => navigation.navigate("WelcomeScreen2")}
        >
          <Pressable onPress={() => navigation.navigate("RegisterPage1")}>
            <Text style={styles.text}>
              <Text style={styles.haloTypo}>{`Belum punya akun ? `}</Text>
              <Text style={styles.daftarTypo}>Daftar</Text>
            </Text>
          </Pressable>
        </Pressable>
      </View>
      <View style={[styles.labelSection, styles.labelSectionPosition]}>
        <Input
          placeholder="Email"
          required={true}
          autoFocus={false}
          leftIcon={{ name: "email-outline", type: "material-community" }}
          inputStyle={{ color: "#ada4a5" }}
          containerStyle={styles.labelTextInputInput}
        />
        <Input
          placeholder="Password"
          required={true}
          // secureTextEntry={true} 
          secureTextEntry={!isPasswordVisible}
          leftIcon={{ name: "lock-outline", type: "material-community" }}
          // rightIcon={{ name: "eye-outline", type: "material-community" }}
          rightIcon={
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              type= "material-community" 
              onPress={() => togglePasswordVisibility()}
            />
          }
          inputStyle={{ color: "#ada4a5" }}
          containerStyle={styles.labelTextInput1Input}
        />
        <Pressable
          style={styles.lupaPassBtn}
          onPress={() => navigation.navigate("WelcomeScreen2")}
        >
          <Pressable
            style={styles.loginBtnChildPosition}
            onPress={() => navigation.navigate("WelcomeScreen2")}
          >
            <Text style={[styles.lupaPassword, styles.daftarTypo]}>
              Lupa Password ?
            </Text>
          </Pressable>
        </Pressable>
        <View style={[styles.titleSection, styles.titleSectionPosition]}>
          <Text style={[styles.halo, styles.haloTypo]}>Halo</Text>
          <Text style={[styles.selamatDatang, styles.titleSectionPosition]}>
            Selamat Datang
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelTextInputInput: {
    left: 0,
    width: 315,
    height: 48,
    top: 89,
    position: "absolute",
  },
  labelTextInput1Input: {
    left: 0,
    width: 315,
    height: 48,
    top: 150,
    position: "absolute",
  },
  labelSectionPosition: {
    width: 315,
    marginLeft: -157.5,
    left: "50%",
    position: "absolute",
  },
  loginBtnChildPosition: {
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  loginTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  atauClr: {
    color: Color.blackColor,
    textAlign: "left",
  },
  btnFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  daftarTypo: {
    fontFamily: FontFamily.textSmallTextMedium,
    fontWeight: "500",
    color: Color.purp1,
  },
  titleSectionPosition: {
    // marginLeft: -84.5,
    // left: "50%",
    // display: "flex",
    position: "absolute",
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"orange",
  },
  haloTypo: {
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.blackColor,
    // alignItems:"center",
    backgroundColor:"white",

  },
  loginBtnChild: {
    right: "0%",
    borderRadius: Border.br_80xl,
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    backgroundColor: Color.blueLinear,
    bottom: "0%",
    height: "100%",
    left: "0%",
    width: "100%",
  },
  iconlyboldlogin: {
    width: "30.38%",
    right: "69.62%",
    maxWidth: "100%",
    maxHeight: "100%",
    bottom: "0%",
    height: "100%",
    left: "0%",
    overflow: "hidden",
  },
  login: {
    left: "43.04%",
    color: Color.whiteColor,
    textAlign: "left",
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
    position: "absolute",
    top: "0%",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
  },
  iconlyboldloginParent: {
    height: "40%",
    width: "25.08%",
    top: "30%",
    right: "37.46%",
    bottom: "30%",
    left: "37.46%",
    position: "absolute",
  },
  loginBtn: {
    height: 60,
    left: 0,
    top: 0,
    width: 315,
    position: "absolute",
  },
  orChild: {
    width: 142,
    height: 1,
  },
  atau: {
    fontFamily: FontFamily.interRegular,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
  },
  orItem: {
    width: 141,
    height: 1,
  },
  or: {
    top: 83,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    left: 0,
    width: 315,
    position: "absolute",
  },
  googleLogoPngSuiteEverythiIcon: {
    width: 20,
    height: 20,
  },
  googleBtn: {
    borderRadius: Border.br_sm,
    borderStyle: "solid",
    borderColor: "#dddada",
    borderWidth: 0.8,
    height: 50,
    width: 50,
    justifyContent: "center",
  },
  loginSocialMedia: {
    top: 124,
    left: 133,
    width: 50,
    justifyContent: "center",
    position: "absolute",
  },
  text: {
    alignSelf: "stretch",
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    textAlign: "center",
  },
  registerPageBtn: {
    top: 197,
    left: 63,
    width: 190,
    position: "absolute",
  },
  loginBtnParent: {
    top: 474,
    height: 218,
  },
  lupaPassword: {
    textDecoration: "underline",
    color: Color.gray2,
    lineHeight: 18,
    fontSize: FontSize.textSmallTextRegular_size,
    textAlign: "left",
  },
  lupaPassBtn: {
    marginLeft: -50.5,
    top: 211,
    width: 101,
    height: 18,
    left: "50%",
    position: "absolute",
  },
  halo: {
    marginLeft: -25.5,
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
    position: "absolute",
    top: 0,
    // left: "50%",
  },
  selamatDatang: {
    top: 29,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    color: Color.blackColor,
    textAlign: "center",
    // backgroundColor:"white",
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    

  },
  titleSection: {
    width: "100%",
    height: 59,
    top: 0,
    justifyContent:"center",
    alignItems:"center",
  },
  labelSection: {
    top: 48,
    height: 229,
  },
  loginPage: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default LoginPage;
