import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Define the updateAsyncStorage function
async function setCurrentUser() {
  try {
    const user = auth().currentUser;
    // Get the user token and email
    const authUser = JSON.stringify({
      userToken: user.uid,
      userEmail: user.email,
    });
    await AsyncStorage.setItem('authUser', authUser);

    // Read & store akun
    const akunRef = firestore().collection('akun');
    const akunRefSnapshot = await akunRef.where('email', '==', user.email).limit(1).get();

    if (!akunRefSnapshot.empty) {
      const akun = akunRefSnapshot.docs[0].data();
      await AsyncStorage.setItem('akun', JSON.stringify({
        id_akun: akunRefSnapshot.docs[0].id,
        ...akun,
      }));
    } else {
      console.log('Tidak ada data akun yang cocok.');
    }

    // Read & store profile
    const profileRef = firestore().collection('profile');
    const profileRefSnapshot = await profileRef.where('id_akun', '==', akunRefSnapshot.docs[0].id).get();

    if (!profileRefSnapshot.empty) {
      // Loop through the query results and store them in a list
      const listProfile = profileRefSnapshot.docs.map((doc) => doc.data());
      await AsyncStorage.setItem('listProfile', JSON.stringify({ listProfile }));
    } else {
      console.log('Tidak ada data profile yang cocok.');
    }

    console.log('AsyncStorage updated successfully.');
  } catch (error) {
    console.error('Error updating AsyncStorage:', error);
  }
}

// Usage in your component
export { setCurrentUser }; // Export the function