import React, { useState } from 'react';
import { View, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { Input, Button,Text,Card,Icon } from "@rneui/themed";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { useNavigation,StackActions } from "@react-navigation/native";

const FormProfile = () => {
  const navigation = useNavigation();

  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [riwayatSakit, setRiwayatSakit] = useState('');

  const handleSimpan = () => {
    // Lakukan aksi simpan data di sini
  };

  return (
    <View style={styles.container}>
      {/* <Text h3={true}>Tambah Profile</Text> */}
      <Card
        containerStyle={{width:'100%'}}
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
      <ScrollView style={{height:'80%'}}>
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
      <Input
        label="Jenis Kelamin"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan jenis kelamin"
        value={jenisKelamin}
        onChangeText={(text) => setJenisKelamin(text)}
      />
      <Input
        label="Tanggal Lahir"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan tanggal lahir"
        value={tanggalLahir}
        onChangeText={(text) => setTanggalLahir(text)}
      />
      <Input
        label="Tinggi Badan"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan tinggi badan"
        value={tinggiBadan}
        onChangeText={(text) => setTinggiBadan(text)}
      />
      <Input
        label="Berat Badan"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan berat badan"
        value={beratBadan}
        onChangeText={(text) => setBeratBadan(text)}
      />
      <Input
        label="Riwayat Sakit"
        labelStyle={styles.textStyle}
        inputStyle={styles.textStyle}
        placeholder="Masukkan riwayat sakit"
        value={riwayatSakit}
        onChangeText={(text) => setRiwayatSakit(text)}
        multiline
      />
      </ScrollView>
      {/* </View> */}
      <Card.Divider />

      <Button title="Simpan" onPress={handleSimpan} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
    // padding: 5,
    // width:"100%",
    // height:"100%"

    
  },
  textStyle:{
    fontSize: 15,

  }
});

export default FormProfile;