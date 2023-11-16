import React, { useState,useEffect } from 'react';
import { View, StyleSheet,ScrollView,TouchableOpacity,Alert,LogBox,Pressable  } from 'react-native';
import { Input,ListItem, Button,Text,Card,Icon,Dialog,Avatar,LinearProgress } from "@rneui/themed";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { useNavigation,StackActions } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from "react-native-linear-gradient";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardTitle } from '@rneui/base/dist/Card/Card.Title';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';

const AdviceProfile = ({data}) => {

  const profileData  = data;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const numRows = 4;
  const numCols = 4;
  const [tableContent, setTableContent]=useState([
    ['Jenis Gizi','Presentase dari total kebutuhan kalori (%)','Kebutuhan gizi (kkal)', 'Kebutuhan Gizi (gram)'],
    ['Lemak',' ',' ',' '],
    ['Protein',' ',' ',' '],
    ['Karbohidrat',' ',' ',' '],

  ]);

  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState(0);
  const [beratBadan, setBeratBadan] = useState(0);
  const [deviceId, setDeviceId] = useState('');
  const [umur, setUmur] = useState('');
  const [BBI, setBBI] = useState('');
  const [KKB, setKKB] = useState('');
  const [KKarbo, setKKarbo] = useState('');
  const [KNasi, setKNasi] = useState('');

  const [BNasiNow, setBNasiNow] = useState(0);
  const [KKBNow, setKKBNow] = useState(0);
  const [KKarboNow, setKKarboNow] = useState(0);
  




  const [listRiwayatSakit, setListRiwayatSakit] = useState([]);
//   const [namaLengkap, setNamaLengkap] = useState('');
//   const [jenisKelamin, setJenisKelamin] = useState('');
//   const [tanggalLahir, setTanggalLahir] = useState('');
//   const [tinggiBadan, setTinggiBadan] = useState(0);
//   const [beratBadan, setBeratBadan] = useState(0);
//   const [deviceId, setDeviceId] = useState('');

//   const [riwayatSakit, setRiwayatSakit] = useState('');

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [date, setDate] = useState(new Date());

//   const [labelOpen, setLabelOpen] = useState(false);
//   const [genderintems, setgenderintems] = useState([
//     { value: "Laki-Laki", label: "Laki-Laki" },
//     { value: "Perempuan", label: "Perempuan" },
//   ]);

//   const [listRiwayatSakit, setListRiwayatSakit] = useState([]);
  const getLogCentungToday = async (profile) => {
    try {
      // Get the current date (today)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000 for the beginning of the day
      const endToday = new Date();
      endToday.setHours(23,59,59,999)
      // Get the timestamp for the start and end of today
      const startOfDayTimestamp = firestore.Timestamp.fromDate(today);
      const endOfDayTimestamp = firestore.Timestamp.fromDate(endToday);
      // console.log(startOfDayTimestamp.toDate().toLocaleString(),endOfDayTimestamp.toDate().toLocaleString())
      const logCentungRef = firestore().collection('log_centung');

      // Query log_centung collection for timestamps within today
      const snapshot = await logCentungRef
        .where('device_id', '==', profile.device_id)
        .where('timestamp', '>=', startOfDayTimestamp)
        .where('timestamp', '<=', endOfDayTimestamp)
        .orderBy('timestamp', 'asc')
        .get();

      const logData = [];
      let sumNasi = 0;
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const data = doc.data();
          logData.push(data);
          sumNasi += data.berat_nasi
        });
      }
      setBNasiNow(sumNasi)
      setKKBNow(sumNasi*1)
      setKKarboNow(sumNasi*0.4)
      

      // console.log('Sum Nasi for today:', sumNasi);
      // console.log('Sum Kal for today:', sumNasi*1);
      // console.log('Sum Karbo for today:', sumNasi*0.4);

      // console.log('Log data for today:', logData);

      // return logData;
    } catch (error) {
      console.error('Error fetching log_centung data for today:', error);
      return [];
    }
  };

  useEffect(() => {
    if (profileData) {
      // console.log('profile data : ', profileData)
      
      setNamaLengkap(profileData.nama_lengkap)
      setJenisKelamin(profileData.jenis_kelamin)
      setTanggalLahir(profileData.tanggal_lahir)
      setTinggiBadan(profileData.tinggi_badan.toString())
      setBeratBadan(profileData.berat_badan.toString())
      setUmur(profileData.umur.toString())
      setListRiwayatSakit(profileData.riwayat)
      setBBI(profileData.BBI)
      setKKB(profileData.KKB)
      setKKarbo(profileData.KKarbo)
      setKNasi(profileData.KNasi)

      getLogCentungToday(profileData)

    }
    // console.log('profile data : ', profileData)

  }, [profileData]);

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
  function getInitials(name) {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
  }

  function shortenName(name) {
    // Split the name into words
    const words = name.split(' ');
    // Initialize the shortened name with the first word
    let shortenedName = words[0];
    // Loop through the remaining words
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      // Append the first character of each word followed by a period
      shortenedName += ` ${word[0]}.`;
    }
    return shortenedName;
  }
 
  return (
    <View style={styles.container}>
      <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog>
      {/* <Text h3={true}>Tambah Profile</Text> */}
      <Card
        containerStyle={{width:'100%',borderRadius:10,borderWidth:2, padding:10,margin:3,backgroundColor:Color.gray3}}
        wrapperStyle={{padding:0}}
      >
        <View style={[styles.containerProfile]}>
          {/* First Column (40%) */}
          <View style={[styles.column,styles.firstColumn]}>
            {/* Content for the first column */}
            <Avatar
              size={90}
              rounded
              // title={getInitials(l.nama_lengkap)}
              title={getInitials(namaLengkap)}

              containerStyle={{ backgroundColor: '#3d4db7' }}
            />
            <Text h4 style={{}}>{shortenName(namaLengkap)}</Text>
            {/* <Text h4>Handika</Text> */}

          </View>
          
          {/* Second Column (60%) */}
          <View style={[styles.column, styles.secondColumn]}>
          <Text style={[styles.textStyle]}>{jenisKelamin}</Text>
          <Text style={[styles.textStyle]}>{umur} Tahun</Text>
          <Text style={[styles.textStyle]}>TB   {tinggiBadan} cm</Text>
          <Text style={[styles.textStyle]}>BB   {beratBadan} kg</Text>
          <Text style={[styles.textStyle]}>Riwayat Penyakit : </Text>
          <Text style={[styles.textStyle]}>{listRiwayatSakit.join(', ')}</Text>


            {/* Content for the second column */}
          </View>
        </View>

        <Card.Divider />
        <View style={[]}>
          <Text style={[styles.textStyle]}>Berat Badan Ideal (BBI) : {BBI} kg</Text>
          <Text style={[styles.textStyle]}>Kebutuhan Kalori Basal (KKB) : {KKB} kkal</Text>
          <Text style={[styles.textStyle]}>Kebutuhan Karbohidrat : {KKarbo} gram</Text>
          <Text style={[styles.textStyle]}>Konsumsi Nasi : {KNasi} gram</Text>



        </View>
        
      {/* <Card.Title h4={true} style={{textAlign:'center',flexDirection:'row',alignItems:'center'}}> */}
      {/* </Card.Title> */}
      {/* <View style={{backgroundColor:'white',padding:10,width:'90%'}}> */}
    
      {/* </View> */}
      {/* <Card.Divider /> */}
    
      </Card>
      <View style={{height:'50%',width:'100%',marginTop:10}}>
      <ScrollView>
        <Card containerStyle={[{marginHorizontal:0, borderRadius:15,borderWidth:3, borderColor:Color.gray3
          // ,backgroundColor:Color.palete2
          },BNasiNow>KNasi? {backgroundColor:'#F8DE22'}: {}]}>
          {/* <CardTitle> test</CardTitle> */}
          <Text style={{fontWeight:'bold'}}>Konsumsi Nasi hari ini :</Text>
          <CardDivider/>
          <LinearProgress
            value={BNasiNow/KNasi}
            variant="determinate"
            style={{ width: "100%" }}
            color={BNasiNow>KNasi?'red':'green'}
          />
          <Text>{BNasiNow +'/'+KNasi+ ' gram'}</Text>

        </Card>
        <Card containerStyle={[{marginHorizontal:0, borderRadius:15,borderWidth:3, borderColor:Color.gray3
          },KKarboNow>KKarbo? {backgroundColor:'#F8DE22'}: {}]}>
          {/* <CardTitle> test</CardTitle> */}
          <Text style={{fontWeight:'bold'}}>Kebutuhan Karbohidrat hari ini :</Text>
          <CardDivider/>
          <LinearProgress
            value={KKarboNow/KKarbo}
            variant="determinate"
            style={{ width: "100%" }}
            color={KKarboNow>KKarbo?'red':'green'}
          />
          <Text>{KKarboNow +'/'+KKarbo+ ' gram'}</Text>

        </Card>
        <Card containerStyle={[{marginHorizontal:0, borderRadius:15,borderWidth:3, borderColor:Color.gray3
          // ,backgroundColor:Color.palete2
          },KKBNow>KKB? {backgroundColor:'#F8DE22'}: {}]}>
          {/* <CardTitle> test</CardTitle> */}
          <Text style={{fontWeight:'bold'}}>Kebutuhan Kalori Basal hari ini :</Text>
          <CardDivider/>
          <LinearProgress
            value={KKBNow/KKB}
            variant="determinate"
            style={{ width: "100%" }}
            color={KKBNow>KKB?'red':'green'}
          />
          <Text>{KKBNow +'/'+KKB+ ' kkal'}</Text>

        </Card>
        
        
        
      </ScrollView>
      </View>
      {/* <View style={styles.containerTable}>
        {[...Array(numRows)].map((_, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {[...Array(numCols)].map((_, colIndex) => (
              <View key={`cell-${rowIndex}-${colIndex}`} style={[rowIndex == 0 || colIndex ==0 ?styles.header:styles.cell]}>
                <Text style={{fontSize:11}}>{tableContent[rowIndex][colIndex]}</Text>
              </View>
            ))}
          </View>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
    // padding: 5,
    // width:"100%",
    // height:"100%"

    
  },
  containerProfile: {
    flexDirection: 'row', // Arrange columns horizontally
    justifyContent: 'space-between', // Space evenly between columns
    // backgroundColor: 'lightgray', // Optional background color for visualization
                        
  },
  column: {
    flex: 1, // Take up 1 part (40% or 60% of the total width)
    // backgroundColor: 'lightgray', // Optional background color for visualization
    padding: 5, // Optional padding for content
  },
  firstColumn:{
    alignItems: 'center', // Center content vertically
    justifyContent: 'center',
  },
  secondColumn: {
    flex: 1.5, // Take up 1.5 parts (60% of the total width)
  },
  textStyle:{
    fontSize:14,
    // color:"white",
    // fontWeight:'600'
  },
  containerTable: {
    flexDirection: 'column', // Rows
    flexWrap: 'wrap', // Wrap to the next column if there's not enough space
    height:"90%", // Adjust the height as needed
    width: "100%", // Adjust the width as needed
    marginTop:10
    
  },
  row: {
    flexDirection: 'row', // Columns
    width: '100%', // Take up the entire width of the container
    justifyContent: 'space-between', // Evenly distribute columns horizontally
    // alignItems: 'center', // Center rows vertically
    // borderWidth: 0.5,
    borderColor: 'black',
    
  },
  cell: {
    // flexBasis: '25%', // Each cell takes up 25% of the row's width (4 columns)
    width:"23%",
    height: 65, // Each cell takes up 25% of the row's height (4 rows)
    // borderWidth: 0.5,
    // borderColor: 'black',
    backgroundColor:Color.gray3,
    borderRadius:10,
    padding:2,
    margin:"0.5%",
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    // flexBasis: '25%', // Each cell takes up 25% of the row's width (4 columns)
    width:"23%",
    
    height: 65, // Each cell takes up 25% of the row's height (4 rows)
    // borderWidth: 0.5,
    // borderColor: 'black',
    backgroundColor:Color.gray3,
    borderRadius:10,
    padding:2,
    margin:"0.5%",
    borderRadius:10,
    alignItems: 'center',
    // fontSize:12,
    justifyContent: 'center',
  },
});

export default AdviceProfile;