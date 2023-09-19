import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const LineChartLog = () => {
  console.log("refresh")
  // Sample data for the line chart (x: dates, y: grams)
  const data = {
    labels: [...Array(30).keys()].map((day) => `${day + 1}`), // Dates from 1 to 30
    datasets: [
      {
        data: [...Array(30).keys()].map((day) => Math.random() * 100), // Sample grams data
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LineChart
        bezier
        withDots={true}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={true}
        verticalLabelRotation={90}
        data={data}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LineChartLog;
