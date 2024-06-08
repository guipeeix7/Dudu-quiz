import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

const { width } = Dimensions.get('window');

const MARGIN_HORIZONTAL = 96 * 2;

export const styles = StyleSheet.create({
  container: {
    width: width - MARGIN_HORIZONTAL,
    // backgroundColor: THEME.COLORS.GREY_700,
    borderRadius: 12,
    padding: 22,
  },
  title: {      
    
    fontFamily:'PlusJakartaSans-ExtraBoldItalic',
    color: THEME.COLORS.WHITE,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 36
  },
});