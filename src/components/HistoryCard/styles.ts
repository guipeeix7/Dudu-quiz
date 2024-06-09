import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 600,
    height: 160,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.GREY_800,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 42,
    marginRight: -35
    
  },
  subcontainer:{
    height: 120,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",

  },
  title: {
    color: THEME.COLORS.GREY_100,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    color: THEME.COLORS.GREY_300,
    fontSize: 15
  }
});