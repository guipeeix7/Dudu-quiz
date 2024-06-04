import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    headerLogo: {
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 30,
      color: '#fff',
    },
    subHeader:{
      
      fontSize: 25,
      textAlign: 'center',
      marginBottom: 30,
      color: '#98c66f',
    },
    card: {
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 2,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    inputLabel:{
      fontSize: 20,
      marginLeft: 10,
      marginBottom:5,
      color: '#98c66f',

    },
    button: {
      marginTop:40,
      height: 50,
      backgroundColor: '#99c46e',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },

    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }
    
  });