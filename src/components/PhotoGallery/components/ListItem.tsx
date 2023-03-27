import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import type { ListItemProps } from '../types';
import styles from './ListItemStyle';

const ListItem = ({
  item,
  onPress,
  containerStyle = {},
  imageContainerStyle = {},
  imageProps,
}: ListItemProps) => {
  const animatedViewRef = useRef<Animated.View>(null);
  const onPressWithMeasure = () => {
    animatedViewRef.current?.measure((x, y, width, height, pageX, pageY) => {
      onPress({ x, y, width, height, pageX, pageY });
    });
  };

  return (
    <TouchableOpacity
      onPress={onPressWithMeasure}
      style={[styles.touchableOpacityStyle, containerStyle]}>
      <Animated.View
        ref={animatedViewRef}
        style={[styles.itemView, imageContainerStyle]}>
        <Animated.Image
          source={item.source}
          style={styles.itemImage}
          {...imageProps}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ListItem;
