import React, { Component } from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { FontSize } from '../GlobalStyles';
import { Card } from "@rneui/themed";


class AgendaCalendar extends Component {

  getFormattedDate (date) {
    // const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  render() {
    return (
      <View style={styles.container}>
        <Agenda
          items={{
            '2023-09-13': [{ description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'}],
            '2023-09-14': [{ description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'}],
            '2023-09-15': [{ description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'},
            { description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'},
            { description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'},
            { description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'},
            { description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'},
            { description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'},
            { description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'},
            { description: '100 gr Nasi', time: '10:00 AM' , user:'Profile'}],
            '2023-09-16': [{ description: '100 gr Nasi', time: '12:30 PM' , user:'Profile'},{ description: '100 gr Nasi', time: '11:30 PM' , user:'Profile'}],
            // Add more items as needed
          }}

          // minDate={'2023-01-01'}
          maxDate={this.getFormattedDate(new Date)}
          pastScrollRange={3}
          futureScrollRange={1}
          
          // Callback to render item in agenda
          renderItem={(item) => (
            <TouchableOpacity style={[{marginRight: 10}]}>
              <Card containerStyle={styles.item}>
              <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                <View >
                  <Text style={styles.itemText}>{item.description}</Text>
                  <Text style={styles.itemText}>{item.time}</Text>
                </View>
                <View >
                  <Text style={styles.itemText}>{item.user}</Text>
                </View>
                </View>
              </Card>
            </TouchableOpacity>

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
          renderEmptyDate={() => (
            <View style={styles.emptyDate}>
              <Text>No events available</Text>
            </View>
          )}
          // Specify the theme for agenda items
          theme={{
            agendaTodayColor: 'blue',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    // padding: 10,
    // marginHorizontal:5,
    borderRadius: 10,
    // marginVertical: 5,
    width:'95%'
   
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