import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import type { RenderFooterItemProps } from '../Types';
import AnimatedImage from './AnimatedImage';
import styles from './PhotoModalStyle';

const RenderFooterItem = ({
  renderNetworkLoader,
  networkLoaderProps,
  networkImageProps,
  currentItem,
  renderItem,
  marginHorizontal,
  renderItemStyle,
  setCurrentItem,
}: RenderFooterItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.footerRenderItemTouchableOpacity,
        currentItem === renderItem
          ? styles.footerActiveItem
          : styles.footerInActiveItem,
        marginHorizontal,
        renderItemStyle,
      ]}
      activeOpacity={0.9}
      onPress={() => setCurrentItem(renderItem)}>
      <AnimatedImage
        item={renderItem}
        style={styles.footerRenderItemImage}
        enableNetworkHandling
        {...{ renderNetworkLoader, networkLoaderProps, networkImageProps }}
      />
    </TouchableOpacity>
  );
};

export default memo(
  RenderFooterItem,
  (prevProps, nextProps) => prevProps.renderItem !== nextProps.renderItem
);
