// import * as React from "react";
import React, { useState,useEffect } from "react";
import { CheckBox, Input, Icon,Dialog,Avatar,ListItem,Button,Card } from "@rneui/themed";
import { Text, StyleSheet, View, Pressable, Image, TouchableOpacity,ScrollView } from "react-native";
import { useNavigation,StackActions } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setCurrentUser} from "../helper/AsyncStorageHelper"
import AgendaCalendar from "../components/AgendaCalendar"
import LineChartLog from "../components/LineChart"


import DropDownPicker from "react-native-dropdown-picker";

const Home = ({}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [selectedProfile, setselectedProfile] = useState('user'); 
  const [selectedProfileObj, setselectedProfileObj] = useState(); 

  const [labelOpen, setLabelOpen] = useState(false);
  const [listProfile, setlistProfile] = useState([
    {
      nama_lengkap: 'Profile 1',
      id_akun: 'Profile1',
      icon: () => <Icon
              name="face-woman-outline" // Replace with the name of your desired icon
              type="material-community"
              size={25}
              color="black" // Customize the icon color
            />,
    },
    {
      nama_lengkap: 'Profile 2',
      id_akun: 'Profile2',
      icon: () => <Icon
              name="face-woman-outline" // Replace with the name of your desired icon
              type="material-community"
              size={25}
              color="black" // Customize the icon color
            />,
    },
    {
      nama_lengkap: 'Profile 3',
      id_akun: 'Profile3',
      icon: () => <Icon
              name="face-woman-outline" // Replace with the name of your desired icon
              type="material-community"
              size={25}
              color="black" // Customize the icon color
            />,
    },
  ]);

  const toogleOpen = () => {
    // if(value){
    //   setselectedProfile(value)
    // }
    // console.log(listProfile)
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
      // if (listProfileJson) {
      //   const listProfileValue = JSON.parse(listProfileJson);
      //   setlistProfile(listProfileValue);
      //   console.log('listProfileValue :', listProfileJson);

      //   console.log('listProfileValue type:', typeof listProfileValue);
      //   setLoading(false);
      // } else {
      //   console.log('listProfileJson is null or undefined');
      // }
      // Loading is complete, set isLoading to false
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set isLoading to false on error as well
    }
  };

  useEffect(() => {
    console.log('visit home')
    // setLoading(true);
    // Simulate an async operation (e.g., API call, data fetching)
    
    // Call the asynchronous function
    fetchUserData();
    // setselectedProfile(listProfile[0].value); // NEED CHANGE (LOAD ASYNC)
  
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Check if the current route is "ScreenA"
      if (navigation.isFocused()) {
        // Trigger the refresh function
        fetchUserData();
      }
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);
  
  // const setData = async () => {
  //   try {
  //     const listProfileJson = await AsyncStorage.getItem('listProfile');
  //     // const listProfileValue = listProfileJson ? JSON.parse(listProfileJson) : [];
  //     const listProfileValue =  listProfileJson ? JSON.parse(listProfileJson) : [];
  //     if (listProfileValue.length > 0) {
  //       // console.log('listProfile:', listProfile);
  //       setlistProfile(listProfileValue)  
  
  //     }
        

  //     // Loading is complete, set isLoading to false
  //     // setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching data2:', error);
  //     // setLoading(false); // Set isLoading to false on error as well
  //   }
  // };

  useEffect(() => {
    // Check if listProfile is defined before mapping over it
    // setData()
    // setselectedProfile(listProfile[0].nama_lengkap); // NEED CHANGE (LOAD ASYNC)
    // setselectedProfileObj(listProfile[0]); // NEED CHANGE (LOAD ASYNC)


    

  }, [listProfile]);

  useEffect(() => {
    // Check if listProfile is defined before mapping over it
    // setData()
    setselectedProfile(selectedProfileObj && selectedProfileObj.nama_lengkap !== undefined?selectedProfileObj.nama_lengkap:'user'); // NEED CHANGE (LOAD ASYNC)
    // setselectedProfileObj(listProfile[0]); // NEED CHANGE (LOAD ASYNC)
    // console.log(selectedProfileObj)

    

  }, [selectedProfileObj]);

  const signOut = async () => {
    // const jsonValue = await AsyncStorage.getItem('listProfile');
    // const test =  !null ? JSON.parse(jsonValue) : null;
    // console.log(test)
    // navigation.replace("NonSecureStack");
    // navigation.replace("NonSecureStack");
    // navigation.navigate("NonSecureStack")
    // navigation.dispatch(StackActions.replace("NonSecureStack"))



    // navigation.replace("NonSecureStack");

    
    await AsyncStorage.clear();
    await auth()
    .signOut()
    .then(() => {
      console.log('User signed out!')
      navigation.replace("NonSecureStack");
    });
  
  }

  function getInitials(name) {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
  }

  // function selectProfile(profile) {
  const selectProfile = async (profile) => {
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
        {/* <View style={{width:'100%',height:200,backgroundColor:'red'}}> */}
        <ScrollView 
        // style={{ width: '100%', height: 200, backgroundColor: 'red' }}
        >
        {listProfile.length > 0 ? (listProfile.map((l, i) => (
          // <TouchableOpacity 
          //   key={i}
          //   style={[{
          //   // marginRight: 10
          //   }]}
          //   onPress={() => {
          //     selectProfile(l.nama_lengkap);
          //     toogleOpen();
          //     }}
          //   // onPress={[setselectedProfile(l.value),toogleOpen]}
          //   >
          
          // <ListItem.Swipeable
          <ListItem

            key={i}
            containerStyle={{
              marginHorizontal: -10,
              borderRadius: 8,
              // backgroundColor:'yellow'
            }}
            pad={5}
            
            // style={[styles.itemSwipe]}
            // rightContent={(reset) => (
            //   <Button
            //     title="Delete"
            //     onPress={() => {
            //       reset();
            //       // Handle deletion of the item at index
            //       // const updatedList = [...listRiwayatSakit];
            //       // updatedList.splice(index, 1);
            //       // setListRiwayatSakit(updatedList);
            //     }}
            //     icon={{ name: 'delete', color: 'white' }}
            //     buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            //   />
            // )}
            // onPress={toogleOpen(l.value)}
            onPress={()=> {
              // setselectedProfile(l.nama_lengkap);
              // setselectedProfileObj(l);
              selectProfile(l);
              toogleOpen();
            }}
          >
            {/* <Avatar rounded source={{ uri: l.avatar_url }} /> */}

           
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
              
              {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
            </ListItem.Content>
            <TouchableOpacity
                // style={{height:"100%"}}
                onPress={() => console.log('edit')}
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
                onPress={() => console.log('delete')}

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
              navigation.push('FormProfile')
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
            Menu Home
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
      marginHorizontal:10,left:0,
      top:110,position:"absolute"
      }]}>
        {/* <AgendaCalendar/> */}
       {/* <LineChartLog/> */}
       
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

export default Home;
