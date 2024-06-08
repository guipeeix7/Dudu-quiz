import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    
    marginRight: 60,
    marginLeft: 60,
  },
  message: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    color: THEME.COLORS.GREY_100,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    fontSize: 60,
    marginTop: 41
  },
  subtitle: {
    color: THEME.COLORS.GREY_100,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    fontSize: 26,
    marginTop: 8,
    marginBottom: 46,
    
  },
  
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    
    color: THEME.COLORS.GREY_100,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    textAlign: 'center',
    marginVertical: 5,
  },
  textBold: {
    
    fontSize: 16,
    color: THEME.COLORS.GREY_100,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  textLuck:{
    
    fontSize: 32,
    color: THEME.COLORS.GREY_100,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  }
});