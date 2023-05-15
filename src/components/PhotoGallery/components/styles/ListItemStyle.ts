import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../theme';

const styles = StyleSheet.create({
  touchableOpacityStyle: { flex: 0.5 },
  itemView: {
    flex: 1,
    height: verticalScale(200),
    marginVertical: verticalScale(8),
    marginHorizontal: scale(8),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
