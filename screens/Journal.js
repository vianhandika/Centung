import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Journal = () => {
  return (
    <View style={styles.journal}>
      <View style={styles.header}>
        <View style={styles.titleHome}>
          <Text
            style={[styles.selamatDatang, styles.menuJournalPosition]}
          >{`Selamat Datang `}</Text>
          <Text style={[styles.menuJournal, styles.menuJournalPosition]}>
            Menu Journal
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
  menuJournalPosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  selamatDatang: {
    fontSize: FontSize.textSmallTextRegular_size,
    lineHeight: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray2,
    top: 0,
    textAlign: "left",
  },
  menuJournal: {
    top: 23,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
  },
  titleHome: {
    width: 142,
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
  journal: {
    backgroundColor: Color.whiteColor,
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default Journal;
