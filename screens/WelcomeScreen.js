// import * as React from "react";
import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
const WelcomeScreen2 = ({navigation}) => {
  // const navigation = useNavigation();
  const [passProfile, setPassProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);


  useEffect(() => {
    // checkProfileExists(auth().currentUser)
    // const [passProfile2, setPassProfile2] = useState(false);
    // setPassProfile(true)
    console.log(' passprofile3: ', passProfile);

    const user = auth().currentUser
    if(user){
      console.log(user)
      // setPassProfile(true)
      setIsUser(true)
      checkProfileExists(user)
      
    } else{
      setIsLoading(false)
    }
    // setTimeout(() => {
    //   // setAnimating(false);
    //   // Check if currentUser is set or not
    //   // If not then send for Authentication
    //   // else send to Home Screen
    //   navigation.replace(
    //     // user ? 
    //     //   passProfile &&
    //     //   "SecureStack2":"SecureStack"
    //     //   : "NonSecureStack"
    //     user && !passProfile ? "SecureStack2"
    //     :user && passProfile? "SecureStack"
    //     :"NonSecureStack"
    //   );
    // }, 1000);
  }, []);



  const checkProfileExists = async (user) => {
    try {
       
        const jsonValue = await AsyncStorage.getItem('listProfile');
        const test =  !null ? JSON.parse(jsonValue) : null;
        if(test){
          setPassProfile(true)
          setIsLoading(false)

        }else{
            const email = user.email;
            const akunRef = firestore().collection('akun');
            const querySnapshot = await akunRef.where('email', '==', email).limit(1).get();
            if (!querySnapshot.empty) {
                const hasProfile =  querySnapshot.docs[0].data().hasprofile; 
                if (hasProfile === true) {
                  setPassProfile(true)
                  console.log(' passprofile2: ', passProfile);
                  setIsLoading(false)
                  
                  // setnonProfile(false)
                  console.log('Profil dengan hasprofile=true ditemukan untuk email:', email);
                } else {
                  setPassProfile(false)
                  // setnonProfile(true)
                  setIsLoading(false)

                  console.log('Profil dengan hasprofile=false ditemukan untuk email:', email);
                 
                }
              
            } else {
              console.log(email,' Tidak ada data dengan email yang cocok.');
              setPassProfile(false)
              setIsLoading(false)
              // setnonProfile(true)


            }

        }
  
      // console.log('isuser: ',isUser,' isnotuser: ',isNonUser,' passprofile: ', passProfile, ' notpassprofile: ', nonProfile);
      console.log(' passprofile: ', passProfile);
      
     
    } catch (error) {
      console.error('Terjadi kesalahan saat memeriksa profil:', error);
      setIsLoading(false)

    }
  };


  if(isLoading == false){
    setTimeout(() => {
      // setAnimating(false);
      // Check if currentUser is set or not
      // If not then send for Authentication
      // else send to Home Screen
      navigation.replace(
        // user ? 
        //   passProfile &&
        //   "SecureStack2":"SecureStack"
        //   : "NonSecureStack"
        isUser && !passProfile ? "SecureStack2"
        :isUser && passProfile? "SecureStack"
        :"NonSecureStack"
      );
    }, 1000);
  }
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
