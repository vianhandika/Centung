import React, { useState,useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Input,ListItem,Button,Dialog } from "@rneui/themed";
import RectangleComponent from "../components/RectangleComponent";
import { useNavigation,StackActions } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import firestore from '@react-native-firebase/firestore';
// import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RegisterPage4 = ({route}) => {
  // const profile = route.params;
  const [profile, setProfile] = useState(route.params);

  const [riwayatSakit, setRiwayatSakit] = useState('');
  const [listRiwayatSakit, setListRiwayatSakit] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const [rectangleFlatListData, setRectangleFlatListData] = useState([
    <RectangleComponent />,
  ]);
  const navigation = useNavigation();
  const addRiwayatSakit = () => {
    // console.log(riwayatSakit);
    if (riwayatSakit.trim() !== '') {
      // Menambahkan riwayat sakit ke dalam list
      setListRiwayatSakit([...listRiwayatSakit, riwayatSakit]);

      // Mengosongkan input
      setRiwayatSakit('');
    }
  };
  const countAge = (date)=>{
    // const birthdateString = date;
    // Split the birthdate string into day, month, and year components
    const [day, month, year] = date.split('-');
    // Create a Date object for the birthdate
    const birthdate = new Date(year, month - 1, day);
    // Create a Date object for the current date
    const currentDate = new Date();
    // Calculate the age in years
    const age = currentDate.getFullYear() - birthdate.getFullYear();
    // Check if the birthday has already occurred this year
    if (
      currentDate.getMonth() < birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())
    ) {
      // If the birthday hasn't occurred yet this year, subtract 1 from the age
      age--;
    }
    return age;
  }

  const countBBI = (tinggi_badan)=>{
    return 0.9 * (Number(tinggi_badan) - 100);

  };

  const countKKB = (BBI,jenis_kelamin)=>{
    if(jenis_kelamin=='Laki-Laki'){
      return 30 * BBI;
    }else{
      return 25 * BBI;
    }
  };

  const countKKarbo = (KKB)=>{
    return 0.5 * KKB / 4;
  };

  const countKonsNasi = (KKarbo)=>{
    // console.log(KKarbo)

    // console.log(KKarbo * 2.5)
    return KKarbo * 2.5;
  };
  const saveProfileData = async () => {
    setLoading(true);
    // console.log(profile)
    // return;
    try {
      const BBI = countBBI(profile.tinggiBadan)
      const KKB = countKKB(BBI,profile.jenisKelamin)
      const KKarbo = countKKarbo(KKB)
      const KonsNasi = countKonsNasi(KKarbo)

      const requestProfileData = {
        id_akun: profile.id_akun,
        nama_lengkap: profile.nama_lengkap,
        jenis_kelamin: profile.jenisKelamin,
        tanggal_lahir: profile.tanggalLahir,
        berat_badan: profile.beratBadan,
        tinggi_badan: profile.tinggiBadan,
        umur: countAge(profile.tanggalLahir),
        device_id: '-',
        BBI : BBI,
        KKB : KKB,
        KKarbo: KKarbo,
        KNasi : KonsNasi,

      };
      let requestRiwayatMedisData = {
        id_profile: '-', // ID profil akan diisi setelah data profil ditambahkan
        riwayat: listRiwayatSakit,
      };
      // console.log(requestProfileData)
      // console.log(requestRiwayatMedisData)

      const profileRef = firestore().collection('profile');
      const docRef = await profileRef.add(requestProfileData);
      // console.log('Data profil berhasil disimpan di Firestore dengan ID:', docRef.id);
      requestRiwayatMedisData.id_profile = docRef.id;

      const riwayatMedisRef = firestore().collection('riwayat_medis');
      await riwayatMedisRef.add(requestRiwayatMedisData);

      const akunRef = firestore().collection('akun');
      akunRef.doc(profile.id_akun).update({hasprofile:true}).then(() => {
        // console.log('Document updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
      

      setLoading(false);
      // navigation.navigate("SuccessRegistration",profile);
      // console.log('profile from reg4');
      // console.log(profile);

      navigation.navigate('SuccessRegistration',profile)
      // navigation.replace('SecureStack')
      // navigation.dispatch(StackActions.replace("SuccessRegistration",profile))


      // Alert.alert('Success', 'Berhasil menyimpan data profile');

      // Setelah profil ditambahkan, kita dapat mengisi ID profil pada data riwayat medis
    } catch (error) {
      setLoading(false);

      console.error('Gagal menyimpan data profil:', error);
      alert(error);

    }
  };
  const  getFormRegisterStorage = async ()=>{
    const jsonValue = await AsyncStorage.getItem('formRegister');
    const test =  !null ? JSON.parse(jsonValue) : null;
    // console.log('route params reg4')
    // console.log(route.params)

    // console.log('getting from storage reg4')

    // console.log('getting from storage reg4')
    if(!route.params){
        // console.log('from async storage')

      // profile = test
      setProfile(test);
      // console.log(profile)
      // setNamaLengkap(profile.nama_lengkap);

    }else{
      // setNamaLengkap('User')
      // console.log('from route')

      setProfile(route.params);

    }
   
    // console.log(profile)
  }

  const blockBackButton = () => {
    // You can add a condition here to check if the back action should be blocked.
    // For example, if you only want to block it in certain situations.
    // In this example, the back button is always blocked.
    return true;
  };
  useEffect(() => {
    // console.log('visit reg4')
  
    getFormRegisterStorage();
   
    // return subscriber; // unsubscribe on unmount
  }, []);

  const test = () => {
    // console.log(profile)
    
  };

  return (
    
    <View style={styles.registerPage4}>
      <Dialog isVisible={loading}>
        {/* <Dialog.Title title="Dialog Title"/> */}
        {/* <Text style={{ color: 'black' }}>menyimpan</Text> */}
        <Dialog.Loading />

      </Dialog>
      <View style={[styles.buttonParent, styles.parentPosition]}>
        <Pressable
          style={styles.button}
          // onPress={() => navigation.navigate("SuccessRegistration")}
          // onPress={test}
          onPress={saveProfileData}
        >
          <LinearGradient
            style={[styles.btn, styles.btnPosition]}
            locations={[0, 1]}
            colors={["#92a3fd", "#9dceff"]}
            useAngle={true}
            angle={-85.58}
          />
          <View style={styles.next}>
          {loading ? <ActivityIndicator color="white"/>:
            <>
            <Text style={[styles.next1, styles.next1Typo]}>Save</Text>
            <Image
              style={styles.iconlylightarrowRight2}
              resizeMode="cover"
              source={require("../assets/iconlylightarrow--right-22.png")}
            />
            </>
          }
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
                // onPress={() => navigation.navigate("LoginPage")}
                onPress={addRiwayatSakit}
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
                type="text"
                value={riwayatSakit}
                // onChange={(e) => setRiwayatSakit(e.target.value)}
                onChangeText={(e) => setRiwayatSakit(e)}

              />
            </View>
            
        </View>
        <View style={[styles.ListItemSwipe]}>
            <ScrollView>     

              
   
              {listRiwayatSakit.map((riwayat, index) => (
                <ListItem.Swipeable
                  key={index}
                  style={[styles.itemSwipe]}
                  rightContent={(reset) => (
                    <Button
                      title="Delete"
                      onPress={() => {
                        reset();
                        // Handle deletion of the item at index
                        const updatedList = [...listRiwayatSakit];
                        updatedList.splice(index, 1);
                        setListRiwayatSakit(updatedList);
                      }}
                      icon={{ name: 'delete', color: 'white' }}
                      buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    />
                  )}
                >
                  <ListItem.Content>
                    <ListItem.Title>{riwayat}</ListItem.Title>
                  </ListItem.Content>
                </ListItem.Swipeable>
              ))}
             </ScrollView>     
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
  itemSwipe:{
    borderBottomWidth: 1,
    borderBottomColor: 'black', 
  },
  ListItemSwipe:{
    top: 100,
    width: 315,
    height:210,
    // marginTop:1,
    // left: "50%",
    // position: "absolute",
    // marginLeft: -157.5,
    // borderBottomWidth: 1, // Adjust the border width as needed
    // borderBottomColor: 'black', // Adjust the border color as needed
    // paddingBottom: 10,
    // paddingVertical:1,
    // height: 60,
    // padding:3,
    // backgroundColor:'black'
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
