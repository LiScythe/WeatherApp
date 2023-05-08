import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import WeatherDetail from './src/WeatherDetail';

const Stack = createStackNavigator();

const StackNavigate = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetail} />
    </Stack.Navigator>
  );
};

export default StackNavigate;
