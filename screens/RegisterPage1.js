import React, { useState } from "react";
import { Text, StyleSheet, Image, View, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CheckBox, Input, Icon,Dialog } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RegisterPage1 = ({}) => {
  const navigation = useNavigation();
  const [privacyPolicychecked, setPrivacyPolicychecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [nama_lengkap, setNamaLengkap] = useState('');
  const [no_telp, setNoTelp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const createAccount = async (nama_lengkap, no_telp, email, password) => {
  // const createAccount = async () => {
    setLoading(true);
    // return;
    try {
      console.log({nama_lengkap, no_telp, email, password})
      const response = await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async() => {
        console.log('User account created & signed in!');
        
        const akunRef = firestore().collection('akun');
        const akunDoc = await akunRef.add({
          // nama_lengkap: nama_lengkap,
          no_telp: no_telp,
          email: email,
          password: password,
          created_at :new Date(),
        });
        const id_akun = akunDoc.id;
        console.log('Akun berhasil ditambahkan dengan ID:', akunDoc.id);
        

        const formRegister = JSON.stringify({
          id_akun:akunDoc.id, 
          nama_lengkap:nama_lengkap,
          no_telp:no_telp,
          email: email,
          password: password,
        });
        
        await AsyncStorage.setItem('formRegister', formRegister);
        const jsonValue = await AsyncStorage.getItem('formRegister');
        const test =  !null ? JSON.parse(jsonValue) : null;
        console.log('succes store storage reg1')
        console.log(test)
        setLoading(false);
        navigation.replace("SecureStack2",{id_akun,nama_lengkap,no_telp,email,password})

        // navigation.navigate("RegisterPage3",{id_akun,nama_lengkap,no_telp,email,password})
        // navigation.navigate("RegisterPage3",{id_akun:'test',nama_lengkap:'test',no_telp:'test',email:'test',password:'test'})


      })
      .catch(error => {
        setLoading(false);

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('That email address is already in use!');

        }
    
        else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');

        }
        else{
          alert(error);

        }
        // console.error(error);

      });
      console.log(response)
    } catch (error) {
      setLoading(false);
      console.error('Gagal menambahkan akun:', error);
      alert(error);

    }
    
  };



  return (
    <View style={styles.registerPage1}>
      <Dialog isVisible={loading}>
        {/* <Dialog.Title title="Dialog Title"/> */}
        {/* <Text style={{ color: 'black' }}>menyimpan</Text> */}
        <Dialog.Loading />

      </Dialog>
      <View style={[styles.orParent, styles.orLayout]}>
        <View style={[styles.or, styles.orLayout]}>
          <Text style={styles.atau}>Atau</Text>
          <Image
            style={[styles.orChild, styles.orItemPosition]}
            resizeMode="cover"
            source={require("../assets/vector-67.png")}
          />
          <Image
            style={[styles.orItem, styles.orItemPosition]}
            resizeMode="cover"
            source={require("../assets/vector-68.png")}
          />
        </View>
        <Pressable
          style={styles.loginPageBtn}
          onPress={() => navigation.navigate("LoginPage")}
        >
          <Pressable
            style={styles.sudahPunyaAkunContainer}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={styles.text}>
              <Text style={styles.sudahPunyaAkun}>
                <Text style={styles.sudahPunyaAkun1}>Sudah punya akun ?</Text>
                <Text style={styles.text1}>{` `}</Text>
              </Text>
              <Text style={styles.text1}>Login</Text>
            </Text>
          </Pressable>
        </Pressable>
        <Pressable
          style={[styles.registerBtn, styles.orLayout]}
          // onPress={() => navigation.navigate("RegisterPage3",{nama_lengkap,no_telp,email,password})}
          onPress={() => createAccount(nama_lengkap,no_telp,email,password)}
          // onPress={createAccount}
          

        >
          <LinearGradient
            style={[styles.registerBtnChild, styles.googleChildPosition]}
            locations={[0, 1]}
            colors={["#92a3fd", "#9dceff"]}
            useAngle={true}
            angle={-85.58}
          />
          {loading ? <ActivityIndicator color="white" style={[styles.daftar, styles.daftarTypo]}/>:
            <Text style={[styles.daftar, styles.daftarTypo]}>Daftar</Text>
          }
        </Pressable>
        <Pressable
          style={styles.loginSocialMedia}
          // onPress={() => navigation.navigate("LoginPage")}
        >
          <View style={styles.googleChildPosition}>
            <View style={[styles.googleBtnChild, styles.googleChildPosition]} />
            <Image
              style={styles.googleLogoPngSuiteEverythiIcon}
              resizeMode="cover"
              source={require("../assets/googlelogopngsuiteeverythingyouneedknowaboutgooglenewest0-21.png")}
            />
          </View>
        </Pressable>
      </View>
      <View style={[styles.labelSectionWrapper, styles.labelLayout]}>
        <View style={[styles.labelSection, styles.labelLayout]}>
          <CheckBox
            title="By continuing you accept our Privacy Policy and Term of Use"
            checked={privacyPolicychecked}
            onPress={() => setPrivacyPolicychecked(!privacyPolicychecked)}
            checkedColor="black"
            containerStyle={styles.privacyPolicyLayout}
          />
          <Input
            placeholder="Password"
            required={true}
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
            containerStyle={styles.labelTextInputInput}
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
          <Input
            placeholder="Email"
            required={true}
            leftIcon={{ name: "email-outline", type: "material-community" }}
            inputStyle={{ color: "#ada4a5" }}
            containerStyle={styles.labelTextInput1Input}
            type="email"
            value={email}
            onChangeText={(e) => setEmail(e)}
            
            
          />
          <Input
            placeholder="Nomor Telp"
            required={true}
            leftIcon={{ name: "phone-outline", type: "material-community" }}
            inputStyle={{ color: "#ada4a5" }}
            containerStyle={styles.labelTextInput2Input}
            type="text"
            value={no_telp}
            onChangeText={(e) => setNoTelp(e)}
          />
          <Input
            placeholder="Nama Lengkap"
            required={true}
            leftIcon={{ name: "account-outline", type: "material-community" }}
            inputStyle={{ color: "#ada4a5" }}
            containerStyle={styles.labelTextInput3Input}
            type="text"
            value={nama_lengkap}
            onChangeText={(e) => setNamaLengkap(e)}
          />
          <View style={styles.titleSection}>
            <Text style={[styles.holaDisana, styles.daftarLayout]}>
              Hola disana
            </Text>
            <Text style={[styles.membuatAkun, styles.daftarTypo]}>
              Membuat Akun
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  privacyPolicyLayout: {
    backgroundColor: "transparent",
    padding: 0,
    left: 0,
    top: 336,
    position: "absolute",
  },
  labelTextInputInput: {
    left: 0,
    width: 315,
    height: 48,
    top: 278,
    position: "absolute",
  },
  labelTextInput1Input: {
    left: 0,
    width: 315,
    height: 48,
    top: 215,
    position: "absolute",
  },
  labelTextInput2Input: {
    left: 0,
    width: 315,
    height: 48,
    top: 152,
    position: "absolute",
  },
  labelTextInput3Input: {
    left: 0,
    width: 315,
    height: 48,
    top: 89,
    position: "absolute",
  },
  orLayout: {
    width: 315,
    position: "absolute",
  },
  orItemPosition: {
    height: 1,
    top: 9,
    position: "absolute",
  },
  googleChildPosition: {
    bottom: "0%",
    right: "0%",
    height: "100%",
    top: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  daftarTypo: {
    fontFamily: FontFamily.titleH4Bold,
    fontWeight: "700",
    position: "absolute",
  },
  labelLayout: {
    height: 366,
    width: 315,
    position: "absolute",
  },
  daftarLayout: {
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
  },
  atau: {
    marginLeft: -12.5,
    fontSize: FontSize.textSmallTextRegular_size,
    lineHeight: 18,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    color: Color.blackColor,
    top: 0,
    left: "50%",
    position: "absolute",
  },
  orChild: {
    width: 142,
    left: 0,
  },
  orItem: {
    left: 175,
    width: 141,
  },
  or: {
    top: 80,
    height: 18,
    left: "50%",
    marginLeft: -157.5,
    width: 315,
  },
  sudahPunyaAkun1: {
    fontFamily: FontFamily.textSmallTextRegular,
    
  },
  text1: {
    fontWeight: "500",
    fontFamily: FontFamily.textSmallTextMedium,
    color: Color.purp1
  },
  sudahPunyaAkun: {
    color: Color.blackColor,
  },
  text: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    textAlign: "left",
  },
  sudahPunyaAkunContainer: {
    top: "0%",
    left: "0%",
    position: "absolute",
  },
  loginPageBtn: {
    marginLeft: -91.5,
    top: 198,
    width: 184,
    height: 21,
    left: "50%",
    position: "absolute",
  },
  registerBtnChild: {
    borderRadius: Border.br_80xl,
    backgroundColor: Color.blueLinear,
  },
  daftar: {
    marginLeft: -26.5,
    color: Color.whiteColor,
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.textLargeTextRegular_size,
    top: "30%",
    left: "50%",
  },
  registerBtn: {
    shadowColor: "rgba(149, 173, 254, 0.3)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 22,
    elevation: 22,
    shadowOpacity: 1,
    height: 60,
    left: 0,
    top: 0,
  },
  googleBtnChild: {
    borderRadius: Border.br_sm,
    borderStyle: "solid",
    borderColor: "#dddada",
    borderWidth: 0.8,
  },
  googleLogoPngSuiteEverythiIcon: {
    height: "40%",
    width: "40%",
    right: "30%",
    bottom: "30%",
    left: "30%",
    maxWidth: "100%",
    maxHeight: "100%",
    top: "30%",
    position: "absolute",
    overflow: "hidden",
  },
  loginSocialMedia: {
    marginLeft: -24.5,
    top: 118,
    width: 50,
    height: 50,
    left: "50%",
    position: "absolute",
  },
  orParent: {
    top: 474,
    height: 219,
    left: "50%",
    marginLeft: -157.5,
    width: 315,
  },
  holaDisana: {
    // left: 32,
    fontFamily: FontFamily.textSmallTextRegular,
    textAlign: "center",
    color: Color.blackColor,
    top: 0,
    position: "absolute",
  },
  membuatAkun: {
    top: 29,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    // left: 0,
    textAlign: "center",
    color: Color.blackColor,
  },
  titleSection: {
    // marginLeft: -79.5,
    width: "100%",
    height: 59,
    top: 0,
    // left: "50%",
    justifyContent:"center",
    alignItems:"center",
    position: "absolute",
    // backgroundColor:"orange",
  },
  labelSection: {
    left: 0,
    top: 0,
  },
  labelSectionWrapper: {
    top: 40,
    left: 30,
  },
  registerPage1: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default RegisterPage1;
