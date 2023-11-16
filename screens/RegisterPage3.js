import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text, Image, TouchableOpacity  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterPage3 = ({route}) => {
  // Access the variable parameters from the route
  // const {id_akun, nama_lengkap,no_telp,email,password } = route.params;
  // let profile;
  const [profile, setProfile] = useState(route.params); 

  // nama_lengkap,no_telp,email,password,jenisKelamin,tanggalLahir,beratBadan,tinggiBadan
  const [jenisKelamin, setJenisKelamin] = useState(''); 
  const [tanggalLahir, setTanggalLahir] = useState(''); 
  const [beratBadan, setBeratBadan] = useState(0); 
  const [tinggiBadan, setTinggiBadan] = useState(0); 

  const [labelOpen, setLabelOpen] = useState(false);
  const [genderintems, setgenderintems] = useState([
    { value: "Laki-Laki", label: "Laki-Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  const navigation = useNavigation();

  const blockBackButton = () => {
    // You can add a condition here to check if the back action should be blocked.
    // For example, if you only want to block it in certain situations.
    // In this example, the back button is always blocked.
    return true;
  };

  const  getFormRegisterStorage = async ()=>{
    // await AsyncStorage.setItem('formRegister', formRegister);
    const jsonValue = await AsyncStorage.getItem('formRegister');
    const test =  !null ? JSON.parse(jsonValue) : null;
    // console.log('params reg3')
    // console.log(route.params)
    // console.log('getting from storage reg3 ')
    if(!route.params){
      // console.log('from async storage')

      setProfile(test)
      // console.log(profile)

      // setNamaLengkap(profile.nama_lengkap);
    }else{
      // console.log('from route')

      setProfile(route.params)
    }

  }
 
 

  React.useEffect(() => {
    // console.log('visit reg3')

    getFormRegisterStorage();

    // profile = test
    navigation.addListener('beforeRemove', (e) => {
      if (blockBackButton()) {
        // Prevent the user from going back
        e.preventDefault();
      }
    });
  }, [navigation]);

  const conditionIsMet = true; // Change this condition as needed

  const navigateToScreenB = () => {
    if (conditionIsMet) {
      navigation.navigate('SuccessRegistration');
    } else {
      // Handle the case where the condition is not met
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    setTanggalLahir(formattedDate)
    // console.log(formattedDate)
  };

  const nextHandler = async () => {
    // console.log('profile 1')
    // console.log(profile)
    const profileNew = {...profile, 
      jenisKelamin:jenisKelamin,
      tanggalLahir:tanggalLahir,
      beratBadan:beratBadan,
      tinggiBadan:tinggiBadan}
    setProfile(profileNew)

    // console.log('temp 2')
    // console.log(temp)
    
    await AsyncStorage.setItem('formRegister', JSON.stringify({
      profileNew
    }));

    const jsonValue = await AsyncStorage.getItem('formRegister');
    const test =  !null ? JSON.parse(jsonValue) : null;
    // console.log('succes store storage reg3')
    // console.log(test)

    // navigation.navigate("RegisterPage4",{
    //     id_akun,
    //     nama_lengkap,
    //     no_telp,
    //     email,
    //     password,
    //     jenisKelamin,
    //     tanggalLahir,
    //     beratBadan,
    //     tinggiBadan
    // })
    // console.log('profile reg3 before reg4')

    // console.log({...profile, 
    //   jenisKelamin:jenisKelamin,
    //   tanggalLahir:tanggalLahir,
    //   beratBadan:beratBadan,
    //   tinggiBadan:tinggiBadan})

    navigation.navigate("RegisterPage4",
      profileNew
    )
  }

  const handleClickDatePicker = () => {
    // Your function to run when the input is clicked
    setShowDatePicker(true);
    // console.log(showDatePicker)
  };
  // const test = () => {
  //   console.log(nama_lengkap,jenisKelamin,tanggalLahir,beratBadan,tinggiBadan)
  // };
  return (
    <View style={styles.registerPage3}>
      <View style={[styles.buttonParent, styles.buttonParentPosition]}>
        <Pressable
          style={[styles.button, styles.btnShadowBox]}
          // onPress={() => navigation.navigate("RegisterPage4",{
          //   id_akun,
          //   nama_lengkap,
          //   no_telp,
          //   email,
          //   password,
          //   jenisKelamin,
          //   tanggalLahir,
          //   beratBadan,
          //   tinggiBadan
          //   }
          // )}
          // onPress={test}
          onPress={nextHandler}
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
                placeholder="Jenis Kelamin"
                value={jenisKelamin}
                setValue={setJenisKelamin}
                open={labelOpen}
                setOpen={setLabelOpen}
                items={genderintems}
                labelStyle={styles.labelValue}
                
              />
            {/* </View> */}
            {/* <View> */}
              <TouchableOpacity style={[{ top: 15, minHeight:50}]}  onPress={handleClickDatePicker}>
                <Input
                  placeholder="Tanggal Lahir"
                  required={true}
                  leftIcon={{ name: "calendar-range", type: "material-community" }}
                  inputStyle={{ color: "#ada4a5" }}
                  containerStyle={styles.labelTextInputInput}
                  type="date"
                  value={tanggalLahir}
                  // onChange={(e) => setTanggalLahir(e.target.value)}
                  onChangeText={(e) => setTanggalLahir(e)}
                  
                  disabled={true}

                />
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date" // Change to "time" for time picker
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
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
                type="number"
                value={beratBadan}
                // onChange={(e) => setBeratBadan(parseFloat(e.target.value))}
                onChangeText={(e) => setBeratBadan(parseFloat(e))}

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
                type="number"
                value={tinggiBadan}
                // onChange={(e) => setTinggiBadan(parseFloat(e.target.value))}
                onChangeText={(e) => setTinggiBadan(parseFloat(e))}

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
    // color: "#ada4a5",
    fontSize: 15,
    // fontWeight: "bold"
    // fontFamily: "Poppins_regular",
  },
  labelTextInputInput: {
    left: 0,
    width: 315,
    height: 48,
    // top: 25,
    // backgroundColor:"red",
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
