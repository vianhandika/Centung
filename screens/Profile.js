import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Profile = () => {
  return (
    <View style={[styles.profile, styles.profileLayout]}>
      <View style={styles.header}>
        <View style={styles.titleHome}>
          <Text
            style={[styles.selamatDatang, styles.menuProfilePosition]}
          >{`Selamat Datang `}</Text>
          <Text style={[styles.menuProfile, styles.menuProfilePosition]}>
            Menu Profile
          </Text>
        </View>
        <Image
          style={styles.notificationIcon}
          resizeMode="cover"
          source={require("../assets/notification.png")}
        />
      </View>
      <View style={[styles.navbar3Profile, styles.homeParentLayout]}>
        <Image
          style={[styles.navbarBgIcon, styles.profileLayout]}
          resizeMode="cover"
          source={require("../assets/navbarbg.png")}
        />
        <View style={[styles.homeParent, styles.homeParentLayout]}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/home.png")}
          />
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/graph.png")}
          />
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/calendar.png")}
          />
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/document.png")}
          />
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/advice1.png")}
          />
          <Image
            style={styles.profileIcon}
            resizeMode="cover"
            source={require("../assets/profile4.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileLayout: {
    overflow: "hidden",
    width: "100%",
  },
  menuProfilePosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  homeParentLayout: {
    width: 375,
    height: 80,
    position: "absolute",
  },
  selamatDatang: {
    fontSize: FontSize.textSmallTextRegular_size,
    lineHeight: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray2,
    top: 0,
    textAlign: "left",
  },
  menuProfile: {
    top: 23,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
  },
  titleHome: {
    width: 127,
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
  navbarBgIcon: {
    height: "150%",
    top: "-37.5%",
    right: "0.53%",
    bottom: "-12.5%",
    left: "-0.53%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
  },
  homeIcon: {
    width: 75,
    height: 80,
  },
  profileIcon: {
    width: 63,
    display: "none",
    height: 80,
  },
  homeParent: {
    marginTop: -40,
    marginLeft: -187.5,
    top: "50%",
    left: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  navbar3Profile: {
    top: 722,
    right: -2,
    shadowColor: "rgba(29, 22, 23, 0.07)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 40,
    elevation: 40,
    shadowOpacity: 1,
    height: 80,
  },
  profile: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
  },
});

export default Profile;
