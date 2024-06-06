import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 300,
    padding: 32,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  title: {
    fontFamily: THEME.FONTS.BOLD,
    color: THEME.COLORS.GREEN_0,
    fontSize: 16,
    marginBottom: 7,
    textAlign: 'center'
  },
  header: {
    width: '100%',
    marginBottom: 21,
  },
  
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },

    fullScreenImage: {
      width: '100%',
      height: '100%',
    },
  
    logo: {
      width: 900,
      height: 900,
    },
  button: {
    marginTop:40,
    height: 50,
    backgroundColor: '#99c46e',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});