const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

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

const Tab = createBottomTabNavigator();
function BottomTabsRoot({ navigation }) {
  const [bottomTabItemsNormal] = React.useState([
    <HomeIcon />,
    <GraphIcon />,
    <CalendarIcon />,
    <DocumentIcon />,
    <AdviceIcon1 />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <HomeIcon1 />,
    <GraphIcon1 />,
    <CalendarIcon1 />,
    <DocumentIcon1 />,
    <AdviceIcon />,
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
      <Tab.Screen
        name="Journal"
        component={Journal}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Advice"
        component={Advice}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
            <Stack.Screen
              name="WelcomeScreen2"
              component={WelcomeScreen2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterPage2"
              component={RegisterPage2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterPage3"
              component={RegisterPage3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterPage4"
              component={RegisterPage4}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SuccessRegistration"
              component={SuccessRegistration}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterPage1"
              component={RegisterPage1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
