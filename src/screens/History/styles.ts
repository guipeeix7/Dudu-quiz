import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  history: {
    flexGrow: 1,
    padding: 32,
  },
  swipeContainer: {
    width: '100%',
    height: 120,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    borderRadius: 6,
    marginBottom: 12,
  },
  swipeRemove: {
    width: 90,
    height: 90,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  
  button: {
    marginTop:36,
    height: 50,
    width:500,
    backgroundColor: THEME.COLORS.BRAND_MID,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    fontSize: 18,
  },
});