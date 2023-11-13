import React,{useEffect,useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import DropDownPicker from "react-native-dropdown-picker";
import firestore from '@react-native-firebase/firestore';
import { Card,Skeleton  } from "@rneui/themed";

const LineChartLog = ({data}) => {
  const profileData  = data;

  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [labelOpen, setLabelOpen] = useState(false);
  const [listMonth, setListMonth] = useState([
    {label: 'Agustus',value:8},
    {label: 'September',value:9},
    {label: 'Oktober',value:10},
  ]);
  const [chartData, setChartData] = useState(null);

  

  console.log("refresh")
  // console.log([...Array(30).keys()].map((day) => `${day + 1}`))
  // Sample data for the line chart (x: dates, y: grams)
  const data1 = {
    labels: [...Array(30).keys()].map((day) => `${day + 1}`), // Dates from 1 to 30
    datasets: [
      {
        data: [...Array(30).keys()].map((day) => Math.random() * 100), // Sample grams data
      },
    ],
  };

  const getListMonth =  ()=>{
    const today = new Date();
    const listMonth = [];

    // Add the current month
    listMonth.push({
      label: `${getMonthName(today.getMonth())} ${today.getFullYear()}`,
      value: `${today.getMonth() + 1} ${today.getFullYear()}`, // Months are 0-based, so add 1 to get the correct value
    });

    // Add the two previous months
    for (let i = 1; i <= 2; i++) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
      listMonth.push({
        label: `${getMonthName(prevMonth.getMonth())} ${prevMonth.getFullYear()}`,
        value: `${prevMonth.getMonth() + 1} ${prevMonth.getFullYear()}`, // Months are 0-based, so add 1 to get the correct value
      });
    }

    // Helper function to get the month name
    function getMonthName(month) {
      const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      return monthNames[month];
    }
    setListMonth(listMonth)
    setSelectedMonth(listMonth[0].value)
    console.log(listMonth);
  }
    
  const getFormatedChart = (log)=>{
    // Sample log data
    // const log = [
    //   { berat_nasi: 200, initialTimestamp: 'September 28, 2023 at 7:08:00 PM UTC+7' },
    //   { berat_nasi: 250, initialTimestamp: 'September 28, 2023 at 8:08:00 PM UTC+7' },
    //   { berat_nasi: 300, initialTimestamp: 'September 29, 2023 at 1:08:00 PM UTC+7' },
    //   { berat_nasi: 300, initialTimestamp: 'September 29, 2023 at 1:08:00 PM UTC+7' },
    //   { berat_nasi: 300, initialTimestamp: 'September 29, 2023 at 1:08:00 PM UTC+7' },
    //   { berat_nasi: 300, initialTimestamp: 'September 1, 2023 at 1:08:00 PM UTC+7' },


    //   // Add more log entries as needed
    // ];

    // Determine the total number of days in the month (e.g., September)
    const daysInMonth = new Date(2023, 8+1, 0).getDate(); // 8 is the zero-based index for September

    // Initialize an array with zeros for each day in the month
    const data = Array(daysInMonth).fill(0);
    const label = [...Array(daysInMonth).keys()].map((day) => `${day + 1}`)
    // Loop through the log data and populate the corresponding day's data
    log.forEach((entry) => {
      const timestampParts = entry.initialTimestamp.split(' at ');
      const datePart = timestampParts[0];
      const day = Number(datePart.split(' ')[1].replace(',', '')); // Extract the day from the date

      // Subtract 1 to account for zero-based indexing of the array
      if (!isNaN(day) && day >= 1 && day <= daysInMonth) {
        // Sum the value for the same day
        data[day - 1] += entry.berat_nasi;
      }
    });

    console.log(data);
    console.log(data.length);
    return {label, data}
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

  function getStartAndEndOfMonth(monthNumber, year) {
    // Ensure the monthNumber is within a valid range (1-12)
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error('Invalid month number');
    }
  
    // // Create a new Date object for the first day of the specified month
    // const startDate = new Date(year, monthNumber - 1, 1);
  
    // // Determine the last day of the month by moving to the next month's first day and subtracting one day
    // const endDate = new Date(year, monthNumber, 0);
  
    // // Set the time for the end of the day (23:59:59)
    // endDate.setHours(23, 59, 59, 999);
    const startDate = new Date(Date.UTC(year, monthNumber - 1, 1, 0, 0, 0)); // Adjusted to the beginning of the day (17:00 UTC)
    const endDate = new Date(Date.UTC(year, monthNumber, 0, 23, 59, 59, 999)); // Adjusted to the end of the day (16:59:59.999 UTC)

  
    // Return the start and end dates
    return { startDate, endDate };
  }
  
  const getLogCentung = async (data) => {
    try {
       // Create a Firestore timestamp for the start of September
    // const startOfOctober = new Date('2023-10-01T00:00:00Z');
    // const endOfOctober = new Date('2023-10-30T23:59:59Z');
      const {startDate, endDate} = getStartAndEndOfMonth(selectedMonth.split(" ")[0],selectedMonth.split(" ")[1])
    // Create a Firestore timestamp for the end of September
    
      console.log('call===============================')
      const logRef = firestore().collection('log_centung');
      const logQuery = logRef.where('device_id', '==', data.device_id)
      .where('timestamp', '>=', startDate)
      .where('timestamp', '<=', endDate).orderBy('timestamp', 'asc');
      const logSnapshot = await logQuery.get();
      // const logSnapshot = await logRef.get();

      if (!logSnapshot.empty) {
        const logData = [];
        logSnapshot.forEach((doc) => {
          // Retrieve data from each document
          const data = doc.data();
          logData.push({...data,initialTimestamp : firestoreTimestampToFormattedString(doc.data().timestamp)});
        });
        console.log('Log data for device ID:',logData);
        const result  = getFormatedChart(logData)
        const formatedData ={
          labels: result.label,
          datasets: [
            {
              data: result.data, // Sample grams data
            },
            {
              data: [...Array(result.data.length).keys()].map((day) => profileData.KNasi), // 0 grams 
              withDots:false,
              color:(opacity = 1) => `rgba(252, 3, 3, ${opacity})`,
            },
          ],
          legend: ["Carbs Intake","Target"] // optional
        }
        // console.log(formatedData.datasets[0].data)
        console.log(formatedData)

        setChartData(formatedData)
      } else {
      console.log(logSnapshot)

        console.log('No log data found for the specified device ID.');
        setChartData({
          labels: [...Array(30).keys()].map((day) => `${day + 1}`), // Dates from 1 to 30
          datasets: [
            {
              data: [...Array(30).keys()].map((day) => 0), // 0 grams data
            },
          ],
        })

      }

    } catch (error) {
      console.error('Gagal get Log Centung:', error);
      // alert(error);
    }
  }
  useEffect(() => {
    getListMonth()

    if (selectedMonth && profileData) {
      console.log('profile data : ', profileData)
      getLogCentung(profileData)
      

    }
    // console.log('profile data : ', profileData)

  }, [profileData]);

  useEffect(() => {
    if (selectedMonth && profileData) {
      console.log('selectedMonth : ', selectedMonth)
      console.log('profiledata : ', profileData)
      // const {startDate, endDate} = getStartAndEndOfMonth(selectedMonth.split(" ")[0],selectedMonth.split(" ")[1])

      // console.log(startDate)
      // console.log(endDate)

      getLogCentung(profileData)

    }
    // console.log('profile data : ', profileData)

  }, [selectedMonth]);

  useEffect(() => {
    
    
    // getListMonth()
   

    return () => {
      // console.log('Component is unmounted.');
    };
    }, []);
  

  return (
    <View style={styles.container}>
       <DropDownPicker
        style={{
          backgroundColor: Color.gray3,
          marginBottom:100,
          // marginLeft:5,
          width:'100%'
        }}
        textStyle={{fontWeight:"bold"}}
        placeholder="Bulan"
        value={selectedMonth}
        setValue={setSelectedMonth}
        open={labelOpen}
        setOpen={setLabelOpen}
        items={listMonth}
        
      />
      {chartData ? (
      <LineChart
        bezier
        withDots={true}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={true}
        verticalLabelRotation={90}
        data={chartData}
        width={350} // Width of the chart
        height={250} // Height of the chart
  
        yAxisSuffix=" gr" // Y-axis unit label
        yLabelsOffset=""
        chartConfig={{
          backgroundColor: Color.gray3,
          backgroundGradientFrom: Color.gray3,
          backgroundGradientTo: Color.gray3,
          decimalPlaces: 0, // Number of decimal places in labels
          color: (opacity = 1) => `rgba(5, 57, 245, ${opacity})`, // Line color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: 'black',
          },
        }}
      />):(
        <View >
          {/* <Skeleton animation="pulse" width={'100%'} height={'30%'} /> */}
          {/* <br/> */}
          <Skeleton style={{marginTop:10}} animation="pulse" width={'100%'} height={'100%'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LineChartLog;
