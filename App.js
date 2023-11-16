const Stack = createNativeStackNavigator();
const SecureStack = createNativeStackNavigator();
const SecureStack2 = createNativeStackNavigator();
const NonSecure = createNativeStackNavigator();



import * as React from "react";
import { useState, useEffect } from "react";

import { NavigationContainer,useNavigation } from "@react-navigation/native";

import WelcomeScreen from "./screens/WelcomeScreen";
import WelcomeScreen2 from "./screens/WelcomeScreen2";
import LoginPage from "./screens/LoginPage";
import RegisterPage2 from "./screens/RegisterPage2";
import RegisterPage3 from "./screens/RegisterPage3";
import RegisterPage4 from "./screens/RegisterPage4";
import SuccessRegistration from "./screens/SuccessRegistration";
import RegisterPage1 from "./screens/RegisterPage1";
import Calendar from "./screens/Calendar";
import Journal from "./screens/Journal";
import Advice from "./screens/Advice";
import Profile from "./screens/Profile";
import Graph from "./screens/Graph";
import Home from "./screens/Home";
import LoadingScreen from "./screens/LoadingScreen";
import FormProfile from "./screens/FormProfile";


import HomeIcon1 from "./components/Home1";
import HomeIcon from "./components/Home";
import GraphIcon1 from "./components/Graph1";
import GraphIcon from "./components/Graph";
import CalendarIcon1 from "./components/Calendar1";
import CalendarIcon from "./components/Calendar";
import DocumentIcon1 from "./components/Document1";
import DocumentIcon from "./components/Document";
import AdviceIcon from "./components/Advice";
import AdviceIcon1 from "./components/Advice1";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

 
// const [passProfile, setPassProfile] = useState(true);

const Tab = createBottomTabNavigator();
function BottomTabsRoot({ navigation }) {
  const [bottomTabItemsNormal] = React.useState([
    <HomeIcon />,
    <GraphIcon />,
    <CalendarIcon />,
    // <DocumentIcon />,
    // <AdviceIcon1 />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <HomeIcon1 />,
    <GraphIcon1 />,
    <CalendarIcon1 />,
    // <DocumentIcon1 />,
    // <AdviceIcon />,
  ]);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => {
        const activeIndex = state.index;
        return (
          <View
            style={{
              shadowColor: "rgba(29, 22, 23, 0.07)",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowRadius: 40,
              elevation: 40,
              shadowOpacity: 1,
              width: 375,
              height: 80,
              flexDirection: "row",
              alignItems: 'center', // Center vertically
              justifyContent: 'center', // Center horizontally
            }}
          >
            {bottomTabItemsNormal.map((item, index) => {
              const isFocused = state.index === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    navigation.navigate({
                      name: state.routes[index].name,
                      merge: true,
                    });
                  }}
                >
                  {activeIndex === index
                    ? bottomTabItemsActive[index] || item
                    : item}
                </Pressable>
              );
            })}
          </View>
        );
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Graph"
        component={Graph}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen
        name="Journal"
        component={Journal}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Advice"
        component={Advice}
        options={{ headerShown: false }}
      /> */}
    </Tab.Navigator>
  );
}

function SecureComponent({ route }){
  // const { passProfile } = route.params;
  // console.log(passProfile)
  return (
    <>
        {/* <NavigationContainer> */}
        {/* {hideSplashScreen ?  */}

          <SecureStack.Navigator screenOptions={{ headerShown: false }}>
          
            {/* {!passProfile? 
            <> */}
              {/* <SecureStack.Screen
                name="RegisterPage3"
                component={RegisterPage3}
                options={{ headerShown: false }}
                initialParams={{ nama_lengkap:'',no_telp:'',email:'',password:'' }}

              />
              <SecureStack.Screen
                name="RegisterPage4"
                component={RegisterPage4}
                options={{ headerShown: false }}
              />
              <SecureStack.Screen
                name="SuccessRegistration"
                component={SuccessRegistration}
                options={{ headerShown: false }}
              /> */}
            {/* </>: */}
            <SecureStack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
            <SecureStack.Screen
                name="FormProfile"
                component={FormProfile}
                options={{ headerShown: false }}
              />
            {/* <SecureStack.Screen
            name="SuccessRegistration"
            component={SuccessRegistration}
            options={{ headerShown: false }}
          />  */}
            {/* }  */}
          </SecureStack.Navigator>
         
        {/* :null} */}
        {/* </NavigationContainer> */}
    </>
  )
}

function SecureComponent2({ route }){
  // const { passProfile } = route.params;
  // console.log(passProfile)
  return (
    <>
        {/* <NavigationContainer> */}
        {/* {hideSplashScreen ?  */}
          <SecureStack2.Navigator screenOptions={{ headerShown: false }}>
            
            {/* {!passProfile? 
            <> */}
              <SecureStack2.Screen
                name="RegisterPage3"
                component={RegisterPage3}
                options={{ headerShown: false }}
                initialParams={route.params}

              />
              <SecureStack2.Screen
                name="RegisterPage4"
                component={RegisterPage4}
                options={{ headerShown: false }}
              />
              <SecureStack2.Screen
                name="SuccessRegistration"
                component={SuccessRegistration}
                options={{ headerShown: false }}
              />
            {/* </>: */}
            {/* <SecureStack2.Screen name="BottomTabsRoot" component={BottomTabsRoot} /> */}
            {/* }  */}
          </SecureStack2.Navigator>
         
        {/* :null} */}
        {/* </NavigationContainer> */}
    </>
  )
}


function NonSecureComponent({ route }){
  // const { passProfile } = route.params;
  // console.log(passProfile)
  return (
    <>
      <NonSecure.Navigator screenOptions={{ headerShown: false }}>
        <NonSecure.Screen
          name="WelcomeScreen2"
          component={WelcomeScreen2}
          options={{ headerShown: false }}
        />
        <NonSecure.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <NonSecure.Screen
          name="RegisterPage2"
          component={RegisterPage2}
          options={{ headerShown: false }}
        />
        <NonSecure.Screen
          name="RegisterPage1"
          component={RegisterPage1}
          options={{ headerShown: false }}
        />
      </NonSecure.Navigator>
    </>
  )
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [isUser, setIsUser] = useState(false);

  const [isNonUser, setisNonUser] = useState(true);


  const [passProfile, setPassProfile] = useState(false);
  const [nonProfile, setnonProfile] = useState(true);

  // const navigations = useNavigation();


  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);
    
    if(user){
      setIsUser(true);
      setisNonUser(false);
      checkProfileExists(user);


    }else{
      setIsUser(false);
      setisNonUser(true);
    }
    
    if (initializing) setInitializing(false);
  }
  const checkProfileExists = async (user) => {
    try {
      
      // Mendapatkan pengguna yang saat ini masuk
      // const user1 = auth().currentUser;
      // if (user1){
        // setIsUser(true);
        // setisNonUser(false);

        const jsonValue = await AsyncStorage.getItem('listProfile');
        const test =  !null ? JSON.parse(jsonValue) : null;
        if(test){
          setPassProfile(true)
        }else{
            const email = user.email;
            const akunRef = firestore().collection('akun');
            const querySnapshot = await akunRef.where('email', '==', email).limit(1).get();
            if (!querySnapshot.empty) {
                const hasProfile =  querySnapshot.docs[0].data().hasprofile; 
                if (hasProfile === true) {
                  setPassProfile(true)
                  setnonProfile(false)
                  // console.log('Profil dengan hasprofile=true ditemukan untuk email:', email);
                } else {
                  setPassProfile(false)
                  setnonProfile(true)

                  // console.log('Profil dengan hasprofile=false ditemukan untuk email:', email);
                 
                }
              
            } else {
              // console.log(email,' Tidak ada data dengan email yang cocok.');
              setPassProfile(false)
              setnonProfile(true)


            }

        }
        // console.log(test)
      // }else{
      //   // setIsUser(false);
      //   // setisNonUser(true);
      // }
      // console.log('isuser: ',isUser,' isnotuser: ',isNonUser,' passprofile: ', passProfile, ' notpassprofile: ', nonProfile);
      // else if (user) {
        
      //   const email = user.email;
  
      //   // Mengambil referensi ke koleksi "akun" berdasarkan email
      //   const akunRef = firestore().collection('akun');
      //   const querySnapshot = await akunRef.where('email', '==', email).limit(1).get();
  
      //   // Memeriksa apakah ada data yang cocok dengan email
      //   if (!querySnapshot.empty) {
      //     // Loop melalui hasil query
      //     // querySnapshot.forEach((doc) => {
      //       // Periksa nilai field "hasprofile"
      //       // const hasProfile = doc.data().hasprofile;
      //       const hasProfile =  querySnapshot.docs[0].data().hasprofile;

           
      //       if (hasProfile === true) {
      //         setPassProfile(true)
      //         console.log('Profil dengan hasprofile=true ditemukan untuk email:', email);
      //       } else {
      //         setPassProfile(false)
      //         console.log('Profil dengan hasprofile=false ditemukan untuk email:', email);
      //         // navigations.navigate("RegisterPage3");

      //       }
      //     // });
      //   } else {
      //     console.log('Tidak ada data dengan email yang cocok.');
      //   }
      // } else {
      //   console.log('Pengguna tidak masuk.');
      // }
    } catch (error) {
      console.error('Terjadi kesalahan saat memeriksa profil:', error);
    }
  };

  useEffect(() => {
    // const fetchSession = async () => {
    //   try {
    //     // await setCurrentUser();
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     // console.log('subscriber '+ subscriber);
    //     // return subscriber; // unsubscribe on unmount


    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setLoading(false); // Set isLoading to false on error as well
    //   }
    // };
    // fetchSession();
    // setTimeout(() => {
    //   // setAnimating(false);
    //   // Check if currentUser is set or not
    //   // If not then send for Authentication
    //   // else send to Home Screen
    //   navigations.replace(
    //     auth().currentUser ? "SecureStack" : "NonSecureComponent"
    //   );
    // }, 5000);
    
    
  }, []);

  return (
    <>
      <NavigationContainer>
          {/* <Stack.Navigator screenOptions={{ headerShown: false }}> */}
          <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
                name="loadingScreen"
                component={LoadingScreen}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name="NonSecureStack"
                component={NonSecureComponent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SecureStack"
                component={SecureComponent}
                options={{ headerShown: false }}
                // initialParams={{ passProfile: passProfile }}
              />
              <Stack.Screen
                name="SecureStack2"
                component={SecureComponent2}
                options={{ headerShown: false }}
                // initialParams={{ passProfile: passProfile }}
              />
            
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
  // return (
  //   <>
  //     <NavigationContainer>
  //         <Stack.Navigator screenOptions={{ headerShown: false }}>
  //             <Stack.Screen
  //               name="WelcomeScreen2"
  //               component={WelcomeScreen2}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="LoginPage"
  //               component={LoginPage}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="RegisterPage2"
  //               component={RegisterPage2}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="RegisterPage1"
  //               component={RegisterPage1}
  //               options={{ headerShown: false }}
  //             />
  //              <Stack.Screen
  //               name="RegisterPage3"
  //               component={RegisterPage3}
  //               options={{ headerShown: false }}
  //               // initialParams={{id_akun:'', nama_lengkap:'',no_telp:'',email:'',password:'' }}

  //             />
  //             <Stack.Screen
  //               name="RegisterPage4"
  //               component={RegisterPage4}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="SuccessRegistration"
  //               component={SuccessRegistration}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="Profile"
  //               component={Profile}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
  //             <Stack.Screen
  //               name="SecureStack"
  //               component={SecureComponent}
  //               options={{ headerShown: false }}
  //               // initialParams={{ passProfile: passProfile }}
  //             />
  //             <Stack.Screen
  //               name="SecureStack"
  //               component={SecureComponent2}
  //               options={{ headerShown: false }}
  //               // initialParams={{ passProfile: passProfile }}
  //             />
            
  //         </Stack.Navigator>
  //     </NavigationContainer>
  //   </>
  // );
  // return (
  //   <>
  //     <NavigationContainer>
  //       {hideSplashScreen ? (
  //         <Stack.Navigator screenOptions={{ headerShown: false }}>
  //           {isUser ? 
  //             passProfile && 
  //             <Stack.Screen
  //               name="SecureStack"
  //               component={SecureComponent}
  //               options={{ headerShown: false }}
  //               // initialParams={{ passProfile: passProfile }}
  //             />: <>
  //             {/* <Stack.Screen
  //                   name="loadingScreen"
  //                   component={LoadingScreen}
  //                   options={{ headerShown: false }}
  //                 /> */}
  //                 </>
  //           }
  //           {isUser ? 
  //             nonProfile &&
  //             <Stack.Screen
  //               name="SecureStack"
  //               component={SecureComponent2}
  //               options={{ headerShown: false }}
  //               // initialParams={{ passProfile: passProfile }}
  //             />
  //             :<>
  //                 {/* <Stack.Screen
  //                   name="loadingScreen"
  //                   component={LoadingScreen}
  //                   options={{ headerShown: false }}
  //                 /> */}
  //               </>
  //           }
  //           {!isUser && isNonUser ?
  //           <> 
  //             {/* <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} /> */}
  //             <Stack.Screen
  //               name="WelcomeScreen2"
  //               component={WelcomeScreen2}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="LoginPage"
  //               component={LoginPage}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="RegisterPage2"
  //               component={RegisterPage2}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="RegisterPage1"
  //               component={RegisterPage1}
  //               options={{ headerShown: false }}
  //             />
  //              {/* <Stack.Screen
  //               name="RegisterPage3"
  //               component={RegisterPage3}
  //               options={{ headerShown: false }}
  //               // initialParams={{id_akun:'', nama_lengkap:'',no_telp:'',email:'',password:'' }}

  //             />
  //             <Stack.Screen
  //               name="RegisterPage4"
  //               component={RegisterPage4}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="SuccessRegistration"
  //               component={SuccessRegistration}
  //               options={{ headerShown: false }}
  //             /> */}
  //             <Stack.Screen
  //               name="Profile"
  //               component={Profile}
  //               options={{ headerShown: false }}
  //             />
  //           </>:<><Stack.Screen
  //                   name="loadingScreen"
  //                   component={LoadingScreen}
  //                   options={{ headerShown: false }}
  //                 /></>
  //           }
  //         </Stack.Navigator>
  //       ) : null}
  //     </NavigationContainer>
  //   </>
  // );
  // return (
  //   <>
  //     <NavigationContainer>
  //       {hideSplashScreen ? (
  //         <Stack.Navigator screenOptions={{ headerShown: false }}>
  //           {user ? passProfile?
  //             <Stack.Screen
  //               name="SecureStack"
  //               component={SecureComponent}
  //               options={{ headerShown: false }}
  //               // initialParams={{ passProfile: passProfile }}
  //             />: 
  //             <Stack.Screen
  //               name="SecureStack"
  //               component={SecureComponent2}
  //               options={{ headerShown: false }}
  //               // initialParams={{ passProfile: passProfile }}
  //             />
  //           :<>
  //             {/* <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} /> */}
  //             <Stack.Screen
  //               name="WelcomeScreen2"
  //               component={WelcomeScreen2}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="LoginPage"
  //               component={LoginPage}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="RegisterPage2"
  //               component={RegisterPage2}
  //               options={{ headerShown: false }}
  //             />
  //             {/* <Stack.Screen
  //               name="RegisterPage3"
  //               component={RegisterPage3}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="RegisterPage4"
  //               component={RegisterPage4}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="SuccessRegistration"
  //               component={SuccessRegistration}
  //               options={{ headerShown: false }}
  //             /> */}
  //             <Stack.Screen
  //               name="RegisterPage1"
  //               component={RegisterPage1}
  //               options={{ headerShown: false }}
  //             />
  //             <Stack.Screen
  //               name="Profile"
  //               component={Profile}
  //               options={{ headerShown: false }}
  //             />
  //           </>
  //           }
  //         </Stack.Navigator>
  //       ) : null}
  //     </NavigationContainer>
  //   </>
  // );
  
};
export default App;
