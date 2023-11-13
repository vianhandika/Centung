import React, { Component,useEffect ,useState } from 'react';
import { View, StyleSheet,Text, TouchableOpacity,Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { FontSize } from '../GlobalStyles';
import { Card,Skeleton,ListItem,Button,Dialog } from "@rneui/themed";
import firestore from '@react-native-firebase/firestore';

// class AgendaCalendar extends Component {

const AgendaCalendar = ({data}) => {
  const profileData  = data;

  const [agendaData, setAgendaData] = useState(null);
  const [loading, setLoading] = useState(false);

  // getFormattedDate (date) {
  const getFormattedDate = (date) => {
    // const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
  // console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  }

  const getFormatedAgenda = (data) => {
    // const log = [
    //   { berat_nasi: 200, timestamp: 'September 30, 2023 at 8:08:00 PM UTC+7' },
    //   { berat_nasi: 250, timestamp: 'September 30, 2023 at 7:08:00 PM UTC+7' },
    //   { berat_nasi: 300, timestamp: 'October 1, 2023 at 1:08:00 PM UTC+7' },
    //   { berat_nasi: 300, timestamp: 'October 1, 2023 at 2:08:00 PM UTC+7' },
    //   { berat_nasi: 300, timestamp: 'October 2, 2023 at 3:08:00 PM UTC+7' },

    // ];
    
    // Create an empty object to store the output
    const output = {};
    
    // Loop through each log entry
    for (const entry of data) {
      // Parse the timestamp to extract date and time
      const timestampParts = entry.initialTimestamp.split(' at ');
      const datePart = timestampParts[0];
      const timePart = timestampParts[1];
    
      // Parse the date to get the year, month, and day
      const date = new Date(datePart);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
    
      // Create a formatted date string (e.g., '2023-09-28')
      const formattedDate = `${year}-${month}-${day}`;
    
      // Create an object with description and time
      const logEntry = {
        description: entry.berat_nasi,
        time: timePart,
        docId: entry.docId,
      };
    
      // Check if the formatted date already exists in the output
      if (!output[formattedDate]) {
        // If not, create an empty array for that date
        output[formattedDate] = [];
      }
    
      // Add the log entry to the corresponding date in the output
      output[formattedDate].push(logEntry);
    }
    console.log(output);

    return output;
  }
  function firestoreTimestampToFormattedString(timestamp) {
    // Create a Date object from Firestore timestamp
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  
    // Define months and days of the week
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    // Get the components of the date and time
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // const dayOfWeek = daysOfWeek[date.getDay()];
  
    // Format the date and time string
    // const formattedString = `${dayOfWeek}, ${month} ${day}, ${year} at ${hours}:${minutes}:${seconds} PM UTC+7`;
    const formattedString = `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds} WIB`;

  
    return formattedString;
  }
  const getLogCentung = async (data) => {
    try {
      console.log(data.device_id)
      const logRef = firestore().collection('log_centung');
      const logQuery = logRef.where('device_id', '==', data.device_id).orderBy('timestamp', 'asc');
      const logSnapshot = await logQuery.get();
      // const logSnapshot = await logRef.get();

      if (!logSnapshot.empty) {
        const logData = [];
        logSnapshot.forEach((doc) => {
          // Retrieve data from each document
          const data = doc.data();
          const docId = doc.id;
          logData.push({...data,docId,initialTimestamp : firestoreTimestampToFormattedString(doc.data().timestamp)});
        });
        console.log('Log data for device ID:',logData);
        setAgendaData(getFormatedAgenda(logData))
      } else {
      console.log(logSnapshot)

        console.log('No log data found for the specified device ID.');
        setAgendaData({})

      }

    } catch (error) {
      console.error('Gagal get Log Centung:', error);
      // alert(error);
    }
  }
  const deleteLogCentung = async (data) => {
    try {
      console.log(data.docId)
      setLoading(true)
      const logRef = firestore().collection('log_centung');
    // const docIdToDelete = 'your_document_id_here'; // Replace with the actual document ID to delete

      await logRef.doc(data.docId).delete();
      getLogCentung(profileData)
      setLoading(false)

    } catch (error) {
      console.error('Gagal delete Log Centung:', error);
      setLoading(false)

      // alert(error);
    }
  }
  useEffect(() => {
    if (profileData) {
      console.log('profile data : ', profileData)
      getLogCentung(profileData)

    }
    // console.log('profile data : ', profileData)

  }, [profileData]);
  useEffect(() => {
    
    // setAgendaData(getFormatedAgenda( [
    //   { berat_nasi: 200, timestamp: 'September 30, 2023 at 8:08:00 PM UTC+7' },
    //   { berat_nasi: 250, timestamp: 'September 30, 2023 at 7:08:00 PM UTC+7' },
    //   { berat_nasi: 300, timestamp: 'October 1, 2023 at 1:08:00 PM UTC+7' },
    //   { berat_nasi: 300, timestamp: 'October 1, 2023 at 2:08:00 PM UTC+7' },
    //   { berat_nasi: 300, timestamp: 'October 2, 2023 at 3:08:00 PM UTC+7' },

    // ]))
    // getLogCentung()

    return () => {
      // console.log('Component is unmounted.');
    };
    }, []);
  // render() {
    return (
      <View style={styles.container}>
        {agendaData ? (
        <Agenda
          items={agendaData}

          // minDate={'2023-01-01'}
          maxDate={getFormattedDate(new Date)}
          // maxDate={'2023-10-02'}

          pastScrollRange={3}
          futureScrollRange={1}
          
          // Callback to render item in agenda
          renderItem={(item,index) => (
            // <TouchableOpacity style={[{marginRight: 10}]}>
              
              // <Card containerStyle={[styles.item]}>
              // <TouchableOpacity style={[{}]}>

              // <View
              //     style={{
              //       flexDirection: 'row',
              //       justifyContent: 'space-between',
              //       alignItems: 'center',
              //     }}>
              //   <View >
              //     <Text style={styles.itemText}>{item.description+' gr Nasi'}</Text>
              //     <Text style={styles.itemText}>{item.time}</Text>
              //   </View>
              //   <View >
              //     {/* <Text style={styles.itemText}>{item.user}</Text> */}
              //   </View>
              //   </View>
              // </TouchableOpacity>

              // </Card>

            // </TouchableOpacity>

            // <View
            // style={[styles.itemSwipeContainer]}
            // >
            <ListItem.Swipeable
            key={index}
            style={[styles.itemSwipeContainer]}
            rightContent={(reset) => (
              <Button
                title="Delete"
                onPress={() => {
                  reset();
                  Alert.alert(
                    '',
                    'Are you sure you want to delete?',  
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => {
                        // console.log(agendaData)
                        // console.log(item)
                        deleteLogCentung(item)
                        // const updatedList = [...agendaData];
                        // updatedList.splice(index, 1);
                        // setAgendaData(updatedList);
                      }},
                    ],
                    { cancelable: false }
                  )
                  // // Handle deletion of the item at index
                  // const updatedList = [...listRiwayatSakit];
                  // updatedList.splice(index, 1);
                  // setListRiwayatSakit(updatedList);
                }}
                icon={{ name: 'delete', color: 'white' }}
                // style={{alignSelf:'center'}}
                buttonStyle={{ minHeight:'100%',backgroundColor: 'red',marginRight:10,marginTop:5, }}
                // titleStyle={{justifyContent:'center',alignSelf:'center'}}
                // containerStyle={{justifyContent:'center',alignContent:'center'}}
                
              />
            )}
          >
            <ListItem.Content
             style={[styles.itemSwipe]}>
            {/* <ListItem.Title> */}
            {/* <Card containerStyle={[styles.item]}> */}
              {/* <TouchableOpacity style={[{}]}> */}
              <View style={[styles.item]}>
              <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                <View >
                  <Text style={styles.itemText}>{item.description+' gr Nasi'}</Text>
                  <Text style={styles.itemText}>{item.time}</Text>
                </View>
                <View >
                  {/* <Text style={styles.itemText}>{item.user}</Text> */}
                </View>
                </View>
                </View>
              {/* </TouchableOpacity> */}

              {/* </Card> */}
            {/* </ListItem.Title> */}
            </ListItem.Content>
          </ListItem.Swipeable>
          // </View>


          //   <TouchableOpacity style={[{marginRight: 10, marginTop: 17}]}>
          //   <Card>
           
          //       <View
          //         style={{
          //           flexDirection: 'row',
          //           justifyContent: 'space-between',
          //           alignItems: 'center',
          //         }}>
          //         <Text style={styles.itemText}>{item.name}</Text>
          //         <Text style={styles.itemText}>{item.time}</Text>

          //         {/* <Avatar.Text label="J" /> */}
          //       </View>
            
          //   </Card>
          // </TouchableOpacity>
          )}
          // Callback to render empty date in agenda
          renderEmptyData={() => (
            <View style={styles.emptyDate}>
              <Text style={{color:'black'}}>No log available</Text>
            </View>
          )}
          // Specify the theme for agenda items
          theme={{
            agendaTodayColor: 'blue',
          }}
        />):(
        <View >
          <Skeleton animation="pulse" width={'100%'} height={'30%'} />
          {/* <br/> */}
          <Skeleton style={{marginTop:10}} animation="pulse" width={'100%'} height={'68%'} />
        </View>
        )}
        {/* <View style={[styles.home, styles.homeLayout]}> */}
          <Dialog isVisible={loading}>
            <Dialog.Loading />
          </Dialog>
        {/* </View> */}
      </View>
    );
  }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'102%'
  },
  item: {
    backgroundColor: 'white',
    // padding: 10,
    margin:0,
    // marginHorizontal:5,
    // borderRadius: 10,
    // borderWidth:0,
    // marginVertical: 5,
    // marginLeft:10,
    width:'100%',
    // height:'100%',

    // height:50,
    // backgroundColor:'blue'

   
  },
  itemSwipeContainer:{
    // padding:0,
    // margin:0,
    backgroundColor:'red',
    marginRight:10,
    marginTop:5,
    // borderRadius:5,
    // borderWidth:5,
    borderColor:'white'
    // width:'95%'

    // height:120
  },
  itemSwipe:{
    // width:'100%',
    // height:'100%',
    padding:0,
    margin:0,
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText:{
    color:'black',
    fontWeight:'bold',
    fontSize:14
  },
  emptyDate: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
  },
  
});

export default AgendaCalendar;