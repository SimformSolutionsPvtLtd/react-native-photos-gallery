import { StyleSheet } from 'react-native';
import {
  moderateScale,
  verticalScale,
  scale,
  isAndroid,
  Colors,
  windowHeight,
  windowWidth,
} from '../../../../theme';

const styles = StyleSheet.create({
  backgroundView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: scale(windowWidth),
    height: verticalScale(windowHeight),
    backgroundColor: Colors.transparent,
  },
  contentView: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    // Android pan handlers crash without this declaration:
    backgroundColor: Colors.transparent,
    zIndex: 99,
  },
  headerView: {
    position: 'absolute',
    top: isAndroid ? verticalScale(10) : verticalScale(44),
    paddingRight: scale(25),
    alignItems: 'flex-end',
    width: scale(windowWidth),
    zIndex: 999,
  },
  headerText: {
    fontSize: moderateScale(35),
    color: Colors.white,
    lineHeight: verticalScale(35),
    width: scale(40),
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: moderateScale(1.5),
    shadowColor: Colors.black,
    shadowOpacity: 0.8,
  },
  headerTouchableOpacityStyle: {
    backgroundColor: Colors.glassyBlack,
    borderRadius: moderateScale(40),
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerView: {
    paddingVertical: verticalScale(18),
    width: scale(windowWidth),
    backgroundColor: Colors.transparent,
    position: 'absolute',
    bottom: 0,
  },
  footerRenderItemTouchableOpacity: {
    marginHorizontal: scale(10),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  footerActiveItem: {
    borderColor: Colors.blue,
    borderWidth: 2,
  },
  footerInActiveItem: {
    opacity: 0.6,
  },
  footerRenderItemImage: {
    height: '100%',
    width: '100%',
  },
  gestureHandlerRootViewStyle: {
    flex: 1,
  },
});

export default styles;
