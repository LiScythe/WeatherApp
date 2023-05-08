import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import moment from 'moment/moment';
import * as Location from 'expo-location';
import { fetchForecastData } from './redux/epicAction';

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const forecastData = useSelector((state) => state.forecastData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Request location permission from the user
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          // Get the user's current location
          const location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
          dispatch(fetchForecastData({latitude:latitude, longitude:longitude}))
        } else {
          console.log('Location permission not granted');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const handleRowPress = (item) => {
    navigation.navigate('WeatherDetail', { forecastData: item });
  };

  return (
  
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.city}>MI Weather Forecast</Text>
        <Text style={styles.date}>Sunny or Rainy, Better Bring Your Umbrella</Text>
      </View>
      {forecastData.length > 0  ?
      <FlatList
        data={forecastData}
        keyExtractor={(item) => item.dt}
        renderItem={({ item }) => (
          <TouchableOpacity
                style={styles.dayContainer}
                onPress={() => handleRowPress(item.list)}
                key={item.dt}
              >
                {console.log('tt', item)}
            <Text style={styles.day}>{moment(item.list[0].dt_txt).format('dddd, MMMM Do')}</Text>
            {/* <Image style={styles.icon} source={item.icon} /> */}
            <Text style={styles.temperature}>{item.list[0].main.temp}&deg;C</Text>
          </TouchableOpacity>
        )}
      />
      :
      <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
      </View>
}
      
    </View>
   
  );
};

export default HomeScreen;

