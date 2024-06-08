import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop:60,
    width: '60%',
    justifyContent: 'center',
    alignContent:'center'
  },
  centeredContainer:{
    
    justifyContent: 'center',
    alignContent: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  title: {
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    color: THEME.COLORS.GREEN_QZZ,
    fontSize: 36,
  },
  question: {
    fontSize: 24,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",

    color: '#C4C4CC'
  },
  length: {
    color: '#C4C4CC'
  },
});