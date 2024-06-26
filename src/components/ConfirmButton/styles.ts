import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.BRAND_MID,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  title: {
    color: THEME.COLORS.WHITE,
    fontFamily: "PlusJakartaSans-ExtraBoldItalic",
    fontSize: 16,
    marginRight: 7
  },
});