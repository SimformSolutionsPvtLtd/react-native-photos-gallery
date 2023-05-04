import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import type { PhotoModalHeaderProps, PhotosModalProps } from '../Types';
import styles from './PhotoModalStyle';

const Header = ({
  renderHeader,
  close,
  boxOpacityStyle,
  containerProps,
  containerStyle = {},
}: Pick<PhotosModalProps, 'renderHeader'> & PhotoModalHeaderProps) => (
  <Animated.View
    style={[styles.headerView, boxOpacityStyle, containerStyle]}
    {...containerProps}>
    {renderHeader ? (
      renderHeader(close)
    ) : (
      <TouchableOpacity
        style={styles.headerTouchableOpacityStyle}
        onPress={close}>
        <Text style={styles.headerText}>×</Text>
      </TouchableOpacity>
    )}
  </Animated.View>
);

export default Header;
