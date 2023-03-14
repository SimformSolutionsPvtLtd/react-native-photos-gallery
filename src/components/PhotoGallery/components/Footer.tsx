import React, { forwardRef } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Constants } from '../../../constants';
import { scale } from '../../../theme';
import { useForwardRef } from '../hooks';
import type {
  ArrayData,
  PhotoModalFooterProps,
  PhotoModalHeaderProps,
  PhotosModalProps,
  ScrollToIndexFailErrorType,
} from '../types';
import styles from './PhotoModalStyle';

type Props = Pick<PhotosModalProps, 'data'> &
  Pick<PhotoModalHeaderProps, 'boxOpacityStyle'> &
  PhotoModalFooterProps;

const Footer = forwardRef<Animated.FlatList<ArrayData>, Props>(
  (
    {
      boxOpacityStyle,
      data,
      handleScroll,
      currentItem,
      setCurrentItem,
      animatedProps,
      horizontalFlatListProps,
      footerContainerProps,
      footerContainerStyle = {},
      getFooterContainerHeight,
      horizontalListImageHeight,
      horizontalListImageWidth,
      horizontalListImageSpace = Constants.horizontalListImageSpace,
    },
    ref
  ) => {
    const animatedFlatListRef =
      useForwardRef<Animated.FlatList<ArrayData>>(ref);
    const renderItemStyle = {
      width: horizontalListImageWidth,
      height: horizontalListImageHeight,
    };
    const marginHorizontal = {
      marginHorizontal: scale(horizontalListImageSpace),
    };
    const onScrollToIndexFailed = (error: ScrollToIndexFailErrorType) => {
      //@ts-ignore
      animatedFlatListRef?.current.scrollToOffset({
        offset: error.averageItemLength * error.index,
        animated: true,
      });

      setTimeout(() => {
        if (data.length !== 0 && ref !== null) {
          //@ts-ignore
          animatedFlatListRef?.current.scrollToIndex({
            index: error.index,
            animated: true,
          });
        }
      }, 100);
    };

    return (
      <Animated.View
        style={[styles.footerView, boxOpacityStyle, footerContainerStyle]}
        onLayout={event => {
          getFooterContainerHeight(event.nativeEvent.layout.height);
        }}
        {...footerContainerProps}>
        <Animated.FlatList
          data={data}
          ref={animatedFlatListRef}
          horizontal
          onScroll={handleScroll}
          renderItem={({ item: renderItem }) => (
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
              <Image
                source={renderItem?.source}
                style={styles.footerRenderItemImage}
              />
            </TouchableOpacity>
          )}
          onScrollToIndexFailed={onScrollToIndexFailed}
          {...{ animatedProps }}
          {...horizontalFlatListProps}
        />
      </Animated.View>
    );
  }
);

export default Footer;
