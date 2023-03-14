import { StyleSheet } from 'react-native';
import { scale } from '../../theme';

const styles = StyleSheet.create({
  screen: { flex: 1 },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  flatListContentContainerStyle: {
    marginHorizontal: scale(8),
  },
});

export default styles;
