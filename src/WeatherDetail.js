import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import moment from 'moment';

const WeatherDetail = ({ route  }) => {
  const { forecastData } = route.params;
  return (
    <ScrollView>
      <Text style={styles.title}>{moment(forecastData[0].dt_txt).format('dddd, MMMM Do')}</Text>
    {forecastData !== undefined ? forecastData.map((dat,idx)=>(
    <Card style={styles.card} key={idx}>
      <Card.Content>
        
        <Text style={styles.date}>{moment(dat.dt_txt).format("h:mm A")}</Text>
        <View style={styles.info}>
          <Text style={styles.temperature}>{dat.main.temp}&deg;C</Text>
          <Text style={styles.weather}>{dat.weather[0].main}</Text>
        </View>
      </Card.Content>
    </Card>
    ))
  :  <Card style={styles.card}>
  <Card.Content>
    <Text style={styles.date}>Oops, no data available</Text>
  </Card.Content>
</Card>}
</ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    padding:10,
    textAlign:'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weather: {
    fontSize: 16,
  },
});

export default WeatherDetail;
