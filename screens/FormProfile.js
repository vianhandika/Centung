import React, { useState,useEffect } from 'react';
import { View, StyleSheet,ScrollView,TouchableOpacity,Alert,LogBox,Pressable  } from 'react-native';
import { Input,ListItem, Button,Text,Card,Icon,Dialog } from "@rneui/themed";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { useNavigation,StackActions } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from "react-native-linear-gradient";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormProfile = ({route}) => {

  const { action, profileData } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState(0);
  const [beratBadan, setBeratBadan] = useState(0);
  const [deviceId, setDeviceId] = useState('');

  const [riwayatSakit, setRiwayatSakit] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [labelOpen, setLabelOpen] = useState(false);
  const [genderintems, setgenderintems] = useState([
    { value: "Laki-Laki", label: "Laki-Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ]);

  const [listRiwayatSakit, setListRiwayatSakit] = useState([]);

  useEffect(() => {
    if (action === 'edit' && profileData) {
      // setEditedProfile(profileData);
      setNamaLengkap(profileData.nama_lengkap)
      setJenisKelamin(profileData.jenis_kelamin)
      setTanggalLahir(profileData.tanggal_lahir)
      setTinggiBadan(profileData.tinggi_badan.toString())
      setBeratBadan(profileData.berat_badan.toString())
      setDeviceId(profileData.device_id)
      setListRiwayatSakit(profileData.riwayat)
      // console.log('profile data : ', profileData)
    }
    // console.log('profile data : ', profileData)

  }, [action, profileData]);

  const handleSimpan = () => {
    // Lakukan aksi simpan data di sini
  };

  // useEffect(() => {
  //   LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  // }, [])

  const handleClickDatePicker = () => {
    // Your function to run when tj he input is clicked
    setShowDatePicker(true);
    // console.log(showDatePicker)
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    setTanggalLahir(formattedDate)
    // console.log(formattedDate)
  };

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
    let age = currentDate.getFullYear() - birthdate.getFullYear();
    // Check if the birthday has already occurred this year
    if (
      currentDate.getMonth() < birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())
    ) {
      // If the birthday hasn't occurred yet this year, subtract 1 from the age
      age--;
    }
    return age;
  };

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


  const addProfileData = async () => {
    // console.log(route.params)
    // return;
    setLoading(true);
    
    try {
      const akunJson = await AsyncStorage.getItem('akun');
      const akunValue = akunJson ? JSON.parse(akunJson) : [];
      // const umur = Number (countAge(tanggalLahir))
      const BBI = countBBI(tinggiBadan)
      const KKB = countKKB(BBI,jenisKelamin)
      const KKarbo = countKKarbo(KKB)
      const KonsNasi = countKonsNasi(KKarbo)
      const requestProfileData = {
        id_akun: akunValue.id_akun,
        nama_lengkap: namaLengkap,
        jenis_kelamin: jenisKelamin,
        tanggal_lahir: tanggalLahir,
        berat_badan: beratBadan,
        tinggi_badan: tinggiBadan,
        umur: countAge(tanggalLahir),
        device_id: deviceId,
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

      

      setLoading(false);
      Alert.alert('Success', 'Berhasil menyimpan data profile');
      navigation.navigate("BottomTabsRoot", { screen: "Home" });

      // navigation.pop()

      // navigation.navigate("SuccessRegistration",profile);
      // console.log('profile from reg4');
      // console.log(profile);

      // navigation.navigate('SuccessRegistration',profile)
      // navigation.replace('SecureStack')
      // navigation.dispatch(StackActions.replace("SuccessRegistration",profile))



      // Setelah profil ditambahkan, kita dapat mengisi ID profil pada data riwayat medis
    } catch (error) {
      setLoading(false);

      console.error('Gagal menyimpan data profil:', error);
      alert(error);

    }
  };

  const editProfileData = async () => {
    setLoading(true);
  
    try {
      const akunJson = await AsyncStorage.getItem('akun');
      const akunValue = akunJson ? JSON.parse(akunJson) : [];
      // const umur = Number (countAge(tanggalLahir))
      const BBI = countBBI(tinggiBadan)
      const KKB = countKKB(BBI,jenisKelamin)
      const KKarbo = countKKarbo(KKB)
      const KonsNasi = countKonsNasi(KKarbo)

      const requestProfileData = {
        id_akun: akunValue.id_akun,
        nama_lengkap: namaLengkap,
        jenis_kelamin: jenisKelamin,
        tanggal_lahir: tanggalLahir,
        berat_badan: beratBadan,
        tinggi_badan: tinggiBadan,
        umur: countAge(tanggalLahir),
        device_id: deviceId,
        BBI : BBI,
        KKB : KKB,
        KKarbo: KKarbo,
        KNasi : KonsNasi,

      };
  
      const profileIdToUpdate = profileData.id_profile
      const profileRef = firestore().collection('profile').doc(profileIdToUpdate);
      
      await profileRef.update(requestProfileData);
  
      // If you want to update riwayat data, you can follow a similar approach here.
      const riwayatMedisQuerySnapshot = await firestore()
      .collection('riwayat_medis')
      .where('id_profile', '==', profileIdToUpdate)
      .get();

      if (!riwayatMedisQuerySnapshot.empty) {
        // Iterate through the matching documents and update each one
        riwayatMedisQuerySnapshot.forEach(async (doc) => {
          const updatedRiwayatData = {
            // Update your riwayat data here.
            // For example, you can update the 'riwayat' field.
            riwayat: listRiwayatSakit, // Replace this with your updated data.
          };
          
          // Update the riwayat_medis document
          await doc.ref.update(updatedRiwayatData);
        });
      }

  
      setLoading(false);
      Alert.alert('Success', 'Berhasil menyimpan perubahan data profile');
      navigation.goBack(); // Go back to the previous screen after editing.
  
    } catch (error) {
      setLoading(false);
      console.error('Gagal menyimpan perubahan data profil:', error);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog>
      {/* <Text h3={true}>Tambah Profile</Text> */}
      <Card
        containerStyle={{width:'100%',height:'100%'}}
        wrapperStyle={{}}
      >
      {/* <Card.Title h4={true} style={{textAlign:'center',flexDirection:'row',alignItems:'center'}}> */}
      <View style={{paddingVertical:10,textAlign:'center',flexDirection:'row',alignItems:'center'}}>
        {/* <View style={{width:'15%', height:'100%' }}> */}
        <TouchableOpacity
        style={{width:'15%', height:'100%' }}
          // style={{backgroundColor:'yellow'}}
          // onPress={() => navigation.navigate("WelcomeScreen2")}
          // onPress={signOut}
          onPress={() => navigation.pop()}

        >
          
            <Icon
              name="arrow-left" // Replace with the name of your desired icon
              type="material-community"
              // style={{backgroundColor:Color.gray3,
              //   borderRadius:10,padding:2}}
              // style={{textAlign:'left'}}
              size={25}
              color="red" // Customize the icon color
            />
        
        </TouchableOpacity>
        {/* </View> */}
        {/* <View style={{ width: 25 }} /> */}
        <View style={{ width: '80%',height:'100%',alignItems:'center' }}>
          <Text h4={true}  >Tambah Profile</Text>
        </View>
        </View>
      {/* </Card.Title> */}
      <Card.Divider />
      {/* <View style={{backgroundColor:'white',padding:10,width:'90%'}}> */}
      <Input
        // style={styles.textStyle}   
        label="Nama Lengkap"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}

        placeholder="Masukkan nama lengkap"
        value={namaLengkap}
        onChangeText={(text) => setNamaLengkap(text)}
      />
      {/* <Input
        label="Jenis Kelamin"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan jenis kelamin"
        value={jenisKelamin}
        onChangeText={(text) => setJenisKelamin(text)}
      /> */}
      <View>
      {/* <ScrollView scrollEnabled={false} horizontal={true} style={{ width: "100%",height:135,flex:1}}> */}
        <DropDownPicker
          placeholder="Jenis Kelamin"
          value={jenisKelamin}
          setValue={setJenisKelamin}
          open={labelOpen}
          setOpen={setLabelOpen}
          items={genderintems}
          labelStyle={styles.labelValue}
          style={{width:'100%'}}
          itemKey="value"
          autoScroll={false}
        />
      {/* </ScrollView> */}
      </View>
      
      {/* <Input
        label="Tanggal Lahir"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan tanggal lahir"
        value={tanggalLahir}
        onChangeText={(text) => setTanggalLahir(text)}
      /> */}
      <TouchableOpacity style={[{ top: 15, minHeight:50}]}  onPress={handleClickDatePicker}>
        <Input
          label="Tanggal Lahir"
          placeholder=""
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
      <ScrollView nestedScrollEnabled={true} style={{height:'45%',borderWidth:1,padding:1}}>

      <Input
        label="Tinggi Badan"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan tinggi badan"
        value={tinggiBadan}
        onChangeText={(text) => setTinggiBadan(text)}
      />
      {/* <View style={{}}>
        <View style={{}}>
          <LinearGradient
            style={{}}
            locations={[0, 1]}
            colors={["#c58bf2", "#eea4ce"]}
            useAngle={true}
            angle={-85.58}
          />
          <Text style={{}}>CM</Text>
        </View>
        <Input
          placeholder="Tinggi Badan"
          required={true}
          leftIcon={{ name: "swap-vertical", type: "material-community" }}
          inputStyle={{ color: "#ada4a5" }}
          containerStyle={{}}
          type="number"
          value={tinggiBadan}
          // onChange={(e) => setTinggiBadan(parseFloat(e.target.value))}
          onChangeText={(e) => setTinggiBadan(parseFloat(e))}

        />
      </View> */}
      <Input
        label="Berat Badan"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan berat badan"
        value={beratBadan}
        onChangeText={(text) => setBeratBadan(text)}
      />
      <Input
        label="Device ID"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan device ID"
        value={deviceId}
        onChangeText={(text) => setDeviceId(text)}
      />

      <View style={{}}>
        <Input
          label="Riwayat Sakit"
          labelStyle={styles.textStyle}
          inputStyle={styles.textStyle}
          placeholder="Masukkan riwayat sakit"
          value={riwayatSakit}
          onChangeText={(text) => setRiwayatSakit(text)}
        />
        <Button buttonStyle={{width:'25%'}} title="+" onPress={addRiwayatSakit} />
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
      </View>

      </ScrollView>
      {/* </View> */}
      <Card.Divider />
    
      <Button title="Simpan" onPress={()=>{
         if (route.params.action === 'edit') {
          // console.log('edited')
          editProfileData();
        } else {
          // console.log('added')
          addProfileData();
        }
      }} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
    // padding: 5,
    // width:"100%",
    // height:"100%"

    
  },
  textStyle:{
    fontSize: 15,

  },
  labelValue: {
    // color: "#ada4a5",
    fontSize: 15,
    // fontWeight: "bold"
    // fontFamily: "Poppins_regular",
  },

  component2TextInputInput: {
    left: 0,
    width: 252,
    height: 48,
    top: 0,
    position: "absolute",
  },
  labelLayout: {
    height: 48,
    // left: 0,
    width: 315,
    // position: "absolute",
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
  cm: {
    left: "29.17%",
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
  label1: {
    top: 126,
  },
});

export default FormProfile;