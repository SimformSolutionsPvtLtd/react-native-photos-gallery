import { StyleSheet } from 'react-native';
import { Colors, scale, verticalScale, moderateScale } from './theme';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  touchableStyle: {
    height: verticalScale(40),
    borderRadius: moderateScale(20),
    borderColor: Colors.red,
    borderWidth: 2,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    marginHorizontal: scale(6),
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    color: Colors.red,
  },
  activeTouchableStyle: {
    backgroundColor: Colors.red,
  },
  activeTextStyle: {
    color: Colors.white,
  },
  flatListStyle: {
    flexGrow: 0,
    marginHorizontal: scale(8),
    marginBottom: verticalScale(8),
  },
});

export default styles;
