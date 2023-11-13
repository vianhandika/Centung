import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation,StackActions } from "@react-navigation/native";


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
    // const akunRef = firestore().collection('akun');
    // const akunRefSnapshot = await akunRef.where('email', '==', user.email).limit(1).get();

    const akunRef = firestore().collection('akun');
    const akunQuery = akunRef.where('email', '==', user.email).limit(1);
    const akunSnapshot = await akunQuery.get();

    if (!akunSnapshot.empty) {
      const akun = akunSnapshot.docs[0].data();
      await AsyncStorage.setItem('akun', JSON.stringify({
        id_akun: akunSnapshot.docs[0].id,
        ...akun,
      }));
    } else {
      console.log('Tidak ada data akun yang cocok.');
    }

    // Read & store profile
    // const profileRef = firestore().collection('profile');
    // const profileSnapshot = await profileRef.where('id_akun', '==', akunSnapshot.docs[0].id).get();

    const profileRef = firestore().collection('profile');
    const profileQuery = profileRef.where('id_akun', '==', akunSnapshot.docs[0]?.id);
    const profileSnapshot = await profileQuery.get();
    // const riwayatRefSnapshot = await firestore().collection('riwayat_medis').get();

    const listProfile = [];
    profileSnapshot.forEach((doc) => {
      const profileData = doc.data();
      listProfile.push({ id_profile: doc.id, ...profileData, riwayat: [] });
    });

     // Read & store riwayat_medis
     const riwayatRef = firestore().collection('riwayat_medis');
     const riwayatQuery = riwayatRef.where('id_profile', 'in', listProfile.map((profile) => profile.id_profile));
     const riwayatSnapshot = await riwayatQuery.get();

     riwayatSnapshot.forEach((doc) => {
      const riwayatData = doc.data();
      const profileIndex = listProfile.findIndex((profile) => profile.id_profile === riwayatData.id_profile);
      if (profileIndex !== -1) {
        listProfile[profileIndex].riwayat.push(...riwayatData.riwayat);
      }
    });
    // console.log('async :', listProfile[0].riwayat)
    await AsyncStorage.setItem('listProfile', JSON.stringify({ listProfile }));
    console.log('async :', listProfile[0].riwayat)

    const selectedProfileJson = await AsyncStorage.getItem('selectedProfile');
    if(selectedProfileJson){
      const selectedProfileValue = JSON.parse(selectedProfileJson)
      const foundProfile = listProfile.find((profile) => profile.id_profile === selectedProfileValue.id_profile);
      if (foundProfile) {
        console.log("Found Profile:", foundProfile);
        const data = JSON.stringify(foundProfile);
        await AsyncStorage.setItem('selectedProfile', data);
      } else {
        console.log("Profile not found.");
        const data = JSON.stringify(listProfile[0]);
        await AsyncStorage.setItem('selectedProfile', data);
      }
      
    }
    // const selectedProfileValue = selectedProfileJson ? JSON.parse(selectedProfileJson) : [];
    
    // if (!profileSnapshot.empty) {
    //   // Loop through the query results and store them in a list
    //   const listProfile = profileSnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id_profile: doc.id
    //   }));

    //   if (!riwayatRefSnapshot.empty) {
    //     // console.log(riwayatRefSnapshot.docs)
    //     const listRiwayat = riwayatRefSnapshot.docs.map((doc) => doc.data())
    //     const listProfileFull = listProfile.map((profileItem) => {
    //       // Find the matching riwayat item based on id_profile
    //       const matchingRiwayat = listRiwayat.find((riwayatItem) => riwayatItem.id_profile === profileItem.id_profile);
        
    //       // Merge the profile and riwayat data if there is a match, or just return the profile data
    //       return matchingRiwayat ? { ...profileItem, riwayat: matchingRiwayat.riwayat } : { ...profileItem, riwayat :[] };
    //     });
    //     console.log(listProfileFull)
    //     await AsyncStorage.setItem('listProfile', JSON.stringify({ listProfileFull }));
        
    //   }else{
    //     await AsyncStorage.setItem('listProfile', JSON.stringify({ listProfile }));
  
    //   }


    //   // await AsyncStorage.setItem('listProfile', JSON.stringify({ listProfile }));

    // } else {
    //   console.log('Tidak ada data profile yang cocok.');
    // }

    // const riwayatRefSnapshot = await firestore()
    //   .collection('riwayat_medis')
    //   .where('id_profile', 'in', listProfile.map((obj) => obj.id_profile))
    //   .get();
    


    // if (!riwayatRefSnapshot.empty) {
    //   // console.log(riwayatRefSnapshot.docs)
    //   const listRiwayat = riwayatRefSnapshot.docs.map((doc) => doc.data())
    //   const listProfileFull = listProfile.map((profileItem) => {
    //     // Find the matching riwayat item based on id_profile
    //     const matchingRiwayat = listRiwayat.find((riwayatItem) => riwayatItem.id_profile === profileItem.id_profile);
      
    //     // Merge the profile and riwayat data if there is a match, or just return the profile data
    //     return matchingRiwayat ? { ...profileItem, riwayat: matchingRiwayat.riwayat } : { ...profileItem, riwayat :[] };
    //   });
    //   // console.log(listProfileFull)
    //   await AsyncStorage.setItem('listProfile', JSON.stringify({ listProfileFull }));
      
    // }else{
    //   await AsyncStorage.setItem('listProfile', JSON.stringify({ listProfile }));

    // }

    console.log('AsyncStorage updated successfully.');
  } catch (error) {
    console.error('Error updating AsyncStorage:', error);
  }
}

const signOut1 = async () => {
  const navigation = useNavigation();
   
  await AsyncStorage.clear();
  await auth()
  .signOut()
  .then(() => {
    console.log('User signed out!')
    navigation.replace("NonSecureStack");
  });

}



// Usage in your component
export { setCurrentUser,signOut1 }; // Export the function