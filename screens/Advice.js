// import * as React from "react";
import React, { useState,useEffect } from "react";
import { CheckBox, Input, Icon,Dialog,Avatar,ListItem,Button,Card } from "@rneui/themed";
import { Text, StyleSheet, View, Pressable, Image, TouchableOpacity,ScrollView,Alert } from "react-native";
import { useNavigation,StackActions } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setCurrentUser,signOut1} from "../helper/AsyncStorageHelper"
import AgendaCalendar from "../components/AgendaCalendar"
import LineChartLog from "../components/LineChart"
import AdviceProfile from "../components/AdviceProfile"
import firestore from '@react-native-firebase/firestore';



import DropDownPicker from "react-native-dropdown-picker";

const Advice = ({}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [selectedProfile, setselectedProfile] = useState('user'); 
  const [selectedProfileObj, setselectedProfileObj] = useState(); 

  const [labelOpen, setLabelOpen] = useState(false);
  const [listProfile, setlistProfile] = useState([]);

  const toogleOpen = () => {
    setLabelOpen(!labelOpen);
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);

      await setCurrentUser();
      const listProfileJson = await AsyncStorage.getItem('listProfile');
      const listProfileValue = listProfileJson ? JSON.parse(listProfileJson) : [];
      const selectedProfileJson = await AsyncStorage.getItem('selectedProfile');
      const selectedProfileValue = selectedProfileJson ? JSON.parse(selectedProfileJson) : [];
      setlistProfile(listProfileValue.listProfile)  
      setselectedProfileObj(selectedProfileValue)
      // console.log('listProfileValue :', selectedProfileValue);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set isLoading to false on error as well
    }
  };

  useEffect(() => {
    // console.log('visit home')
    // setLoading(true);
    fetchUserData();
    Alert.alert('Under Development','Feature will be back soon')
  
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (navigation.isFocused()) {
        fetchUserData();
      }
    });

    return unsubscribe;
  }, [navigation]);
  
  
  useEffect(() => {
    // Check if listProfile is defined before mapping over it
    // setData()
    // console.log('list Profile (selected): ===================', listProfile[0])
    // console.log('selected Profile (selected): ', selectedProfileObj.nama_lengkap)
    // console.log('selected Profile (selected): ', selectedProfileObj)

    if((selectedProfileObj== undefined || selectedProfileObj.length==0 ) && (selectedProfileObj== undefined || selectedProfileObj.nama_lengkap == undefined)){
      // console.log('true ========================================')
      // console.log(selectedProfileObj.nama_lengkap
      setselectedProfileObj(listProfile[0])
      // console.log(selectedProfileObj.nama_lengkap)
    }else{
      // console.log('false ========================================')
      setselectedProfile(selectedProfileObj && selectedProfileObj.nama_lengkap != undefined?selectedProfileObj.nama_lengkap:listProfile[0].nama_lengkap); // NEED CHANGE (LOAD ASYNC)
      setselectedProfileObj(selectedProfileObj != undefined?selectedProfileObj : listProfile[0] )
      // console.log(selectedProfileObj.nama_lengkap)

    }

    // console.log('Nama Profile : ', selectedProfileObj.nama_lengkap)
    // console.log('Nama  : ',listProfile[0].nama_lengkap)
    

  }, [selectedProfileObj]);

  useEffect(() => {
  

  }, [listProfile]);

  const signOut = async () => {
    // signOut1()
    await AsyncStorage.clear();
    await auth()
    .signOut()
    .then(() => {
      // console.log('User signed out!')
      navigation.replace("NonSecureStack");
    });
  
  }

  const deleteProfile = async(profile) => {
    try {
      // console.log(profile)
      setLoading(true)
      // return''
      // First, delete the associated riwayat_medis document (if it exists).
      if(listProfile.length==1){
        Alert.alert('Gagal Menghapus', 'Akun minimal memiliki 1 profile');
        setLoading(false)
        toogleOpen()
      }else{
        const riwayatMedisRef = firestore()
          .collection('riwayat_medis')
          .where('id_profile', '==', profile.id_profile);

        const snapshot = await riwayatMedisRef.get();

        if (!snapshot.empty) {
          const riwayatMedisDoc = snapshot.docs[0]; // Assuming only one riwayat_medis document per profile.
          await riwayatMedisDoc.ref.delete();
          // console.log('Riwayat deleted successfully.');

        }

        if(profile.device_id){
          const logCentungRef = firestore()
          .collection('log_centung')
          .where('device_id', '==', profile.device_id);
    
          const logSnapshot = await logCentungRef.get();
      
          if (!logSnapshot.empty) {
            for (const logDoc of logSnapshot.docs) {
              await logDoc.ref.delete();
            }
            // console.log('Log deleted successfully.');

          }
        }
        // Delete the associated "log_centung" documents by device_id.
        
        const profileRef = firestore().collection('profile').doc(profile.id_profile);
        await profileRef.delete();
        console.log('Profile deleted successfully.');
        Alert.alert('Success', 'Berhasil menghapus data profile');

        fetchUserData();

        setLoading(false)
        toogleOpen()
      }

    } catch (error) {
      console.error('Error deleting profile:', error);
      setLoading(false)
      toogleOpen()

    }
  }

  function getInitials(name) {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
  }

  // function selectProfile(profile) {
  const selectProfile = async (profile) => {
    // console.log('selected : ',profile)
    setselectedProfile(profile.nama_lengkap)
    setselectedProfileObj(profile)
    const data = JSON.stringify(profile);
    await AsyncStorage.setItem('selectedProfile', data);

    // return
  }


  if(loading){
    return(
      <View style={[styles.home, styles.homeLayout]}>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>
      </View>
    );
  }

  // if(loading==false){
  return (
    <View style={[styles.home, styles.homeLayout]}>
      {/* <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog> */}

      <Dialog
        isVisible={labelOpen}
        onBackdropPress={toogleOpen}
        overlayStyle={{width:'80%'}}
        // containerStyle={{width:300}}
      >
        <Dialog.Title 
        titleStyle={{color:'black'}} 
        title="Pilih Profile"/>
        <Card.Divider/>
        <ScrollView 
        // style={{ width: '100%', height: 200, backgroundColor: 'red' }}
        >
        {listProfile.length > 0 ? (listProfile.map((l, i) => (
         
          <ListItem

            key={i}
            containerStyle={{
              marginHorizontal: -10,
              borderRadius: 8,
              // backgroundColor:'yellow'
            }}
            pad={5}
            onPress={()=> {
              // setselectedProfile(l.nama_lengkap);
              // setselectedProfileObj(l);
              selectProfile(l);
              toogleOpen();
            }}
          >
           
            <Avatar
              // size={64}
              rounded
              title={getInitials(l.nama_lengkap)}
              containerStyle={{ backgroundColor: '#3d4db7' }}
            />
            <ListItem.Content >
              <ListItem.Title style={{ fontWeight: '700' }}>
                {l.nama_lengkap}
              </ListItem.Title>
              
              <ListItem.Subtitle style={{fontSize:10}}>{l.device_id?'device id : '+ l.device_id:'device id : '+ '-'}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity
                // style={{height:"100%"}}
                onPress={() => {
                  // console.log('edit')
                  toogleOpen()
                  navigation.push('FormProfile', { action: 'edit', profileData: l })

                }}
                // onPress={signOut}
              >
                <View 
                // style={styles.iconContainer}
                >
                  <Icon
                    name="pencil" // Replace with the name of your desired icon
                    type="material-community"
                    style={{backgroundColor:Color.gray3,
                      borderRadius:10,padding:2}}
                    // style={{backgroundColor:Color.gray3}}
                    size={25}
                    color="orange" // Customize the icon color
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // style={styles.notification}
                // onPress={() => navigation.navigate("WelcomeScreen2")}
                // onPress={signOut}
                onPress={() => {
                  deleteProfile(l)
                  // console.log('delete')
                }}

              >
                <View 
                  // style={{height:"100%"}}

                >
                  <Icon
                    name="delete" // Replace with the name of your desired icon
                    type="material-community"
                    style={{backgroundColor:Color.gray3,
                      borderRadius:10,padding:2}}
                    // style={{backgroundColor:Color.gray3}}
                    size={25}
                    color="red" // Customize the icon color
                  />
                </View>
              </TouchableOpacity>
          </ListItem>
          // </ListItem.Swipeable>

    
          //</TouchableOpacity>
        ))
        ):(<Text style={{color:'red'}}>No data available.</Text>)
        }
        </ScrollView>

        {/* </View> */}
        <Card.Divider/>

        <View>
          <Button
            buttonStyle={{
              // backgroundColor: Color.gray3,
              borderRadius:10,
              borderWidth:2,
              // borderColor:'grey'
            }}
            // icon={{
            //   name: 'account-circle',
            //   type: 'material-community',
            //   // size: 15,
             
            //   color: 'black',
            // }}
            titleStyle={{fontWeight:'bold'}}
            title='Tambah Profile'
            onPress={()=>{
              toogleOpen()
              // navigation.push('FormProfile', { action: 'edit', profileData: selectedProfileObj })
              navigation.push('FormProfile', { action: 'add'})

              // navigation.push('FormProfile')

            }}
            // buttonStyle={styles.button}
          />
        </View>
      </Dialog>

      <View style={[styles.header]}>
        <View style={[{width: "95%",top: -15,position: "absolute"}]}>
          {/* <Text
            style={[styles.selamatDatang, styles.menuHomePosition]}
          >{`Selamat Datang `}</Text> */}
          {/* <DropDownPicker
            style={{
              backgroundColor: Color.gray3
            }}
            textStyle={{fontWeight:"bold"}}
            placeholder="Profile"
            value={selectedProfile}
            setValue={setselectedProfile}
            open={labelOpen}
            setOpen={setLabelOpen}
            items={listProfile}
            
          /> */}
          <Button
            buttonStyle={{
              backgroundColor: Color.gray3,
              borderRadius:10,
              borderWidth:2,
              borderColor:'grey'
            }}
            icon={{
              name: 'account-circle',
              type: 'material-community',
              // size: 15,
             
              color: 'black',
            }}
            titleStyle={{color:'black',fontWeight:'bold',textAlign:'left', width:"90%",}}
            title={selectedProfile}
            onPress={toogleOpen}
            // buttonStyle={styles.button}
          />
          
        </View>
        <View>
          <Text style={[styles.menuHome,{top:35}]}>
            Menu Advice
          </Text>
        </View>
        <Pressable
          style={styles.notification}
          // onPress={() => navigation.navigate("WelcomeScreen2")}
          // onPress={signOut}
        >
          <View style={styles.iconContainer}>
            <Icon
              name="bell-outline" // Replace with the name of your desired icon
              type="material-community"
              style={styles.icon}
              size={25}
              color="black" // Customize the icon color
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.logout}
          // onPress={() => navigation.navigate("WelcomeScreen2")}
          onPress={signOut}
        >
          <View style={styles.iconContainer}>
            <Icon
              name="logout" // Replace with the name of your desired icon
              type="material-community"
              style={styles.icon}
              size={25}
              color="black" // Customize the icon color
            />
          </View>
        </Pressable>
      </View>
      <View style={[
      {width:"95%",height:"83%",
      marginHorizontal:5,left:0,
      top:110,position:"absolute",
      
      }]}>
        
        {/* {(selectedProfileObj!= undefined && selectedProfileObj.length!=0 )? (
          <AgendaCalendar data={selectedProfileObj}/>
        ) : (<></>) } */}
        {/* {(selectedProfileObj!= undefined && selectedProfileObj.length!=0 )? (
          <LineChartLog data={selectedProfileObj}/>
        ) : (<></>) } */}
       {/* {(selectedProfileObj!= undefined && selectedProfileObj.length!=0 )? (
        <AdviceProfile data={selectedProfileObj} />
        ) : (<></>) } */}
      {/* <AdviceProfile data={selectedProfileObj} /> */}
       
      </View>
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  homeLayout: {
    overflow: "hidden",
    width: "100%",
  },
  menuHomePosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  homeFlexBox: {
    flexDirection: "row",
    width: 375,
  },
  selamatDatang: {
    fontSize: FontSize.textSmallTextMedium_size,
    lineHeight: 18,
    fontFamily: FontFamily.textSmallTextRegular,
    color: Color.gray2,
    top: 0,
    textAlign: "left",
  },
  menuHome: {
    top: 30,
    fontSize: FontSize.titleH4Bold_size,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.titleH4Bold,
    color: Color.blackColor,
  },
  titleHome: {
    width: "95%",
    // left: 0,
    top: -10,
    // height: 53,
    position: "absolute",
  },
  icon: {
    // height: "100%",
    // width: "100%",
    // height: 50,
    // width: 50,
    // justifyContent: 'center',
    // alignItems: 'center',  
    padding:5,

    backgroundColor:Color.gray3,
    borderRadius:10,
  },
  iconContainer: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
  },
  notification: {
    left: 235,
    top: -10,
    // width: 50,
    // height: 50,

    position: "absolute",
    // backgroundColor:'black',
    
    
  },
  logout: {
    left: 280,
    top: -10,
    // minWidth: 50,
    // minHeight: 50,
    position: "absolute",
    // backgroundColor:'black'

  },
  header: {
    top: 40,
    left: 30,
    minWidth: 235,
    height: 53,
    position: "absolute",
  },
  home: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: 812,
  },
});

export default Advice;
