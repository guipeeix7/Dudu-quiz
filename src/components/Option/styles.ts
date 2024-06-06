import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 76,
    // backgroundColor: THEME.COLORS.GREY_800,
    borderColor: THEME.COLORS.WHITE,
    borderWidth: 2,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 12,
  },
  title: {
    color: THEME.COLORS.GREY_100,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginRight: 8,
    flex: 1,
  },
  checked: {
    borderWidth: 4,
    borderColor: THEME.COLORS.BRAND_LIGHT
  },
  wrongChecked: {
    borderWidth: 1,
    borderColor: THEME.COLORS.DANGER_LIGHT
  },
  wrong:{
    borderColor: THEME.COLORS.DANGER_LIGHT
  }
});