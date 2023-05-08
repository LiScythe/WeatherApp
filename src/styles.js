import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#000',
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    city: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    date: {
      color: '#fff',
      fontSize: 12,
    },
    dayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    loadingContainer:{
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
    },
    day: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
 
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 20,
    },
    temperature: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles;