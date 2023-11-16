import React,{useState,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
// import { Text, Button, Overlay } from 'react-native-elements';
// import { useTheme } from '@react-native-elements/themed';
import { Text, Button, Overlay, CheckBox, Input, Icon,Dialog } from "@rneui/themed";

function LoadingScreen({ isVisible }) {
  useEffect(() => {
    // console.log('visit home')
  })
  // const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    // <Overlay isVisible={true} overlayStyle={[styles.overlay]}>
      <View>
      <Dialog isVisible={loading}>
        {/* <Dialog.Title title="Dialog Title"/> */}
        {/* <Text style={{ color: 'black' }}>menyimpan</Text> */}
        <Dialog.Loading />

      </Dialog>
        {/* You can customize the loading indicator here */}
        {/* For example, you can use an ActivityIndicator */}
        {/* <ActivityIndicator size="large" color={theme.colors.primary} /> */}
      </View>
    // </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default LoadingScreen;