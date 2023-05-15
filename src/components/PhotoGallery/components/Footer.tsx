import React, { forwardRef } from 'react';
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
} from '../Types';
import { PhotoModalStyle as styles } from './styles';
import RenderFooterItem from './RenderFooterItem';

type Props = Pick<
  PhotosModalProps,
  'data' | 'networkLoaderProps' | 'networkImageProps' | 'renderNetworkLoader'
> &
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
      thumbnailFlatListProps,
      footerContainerProps,
      networkLoaderProps,
      renderNetworkLoader,
      networkImageProps,
      footerContainerStyle = {},
      getFooterContainerHeight,
      thumbnailListImageHeight,
      thumbnailListImageWidth,
      thumbnailListImageSpace = Constants.thumbnailListImageSpace,
    },
    ref
  ) => {
    const animatedFlatListRef =
      useForwardRef<Animated.FlatList<ArrayData>>(ref);
    const renderItemStyle = {
      width: thumbnailListImageWidth,
      height: thumbnailListImageHeight,
    };
    const marginHorizontal = {
      marginHorizontal: scale(thumbnailListImageSpace),
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
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: renderItem }) => (
            <RenderFooterItem
              {...{
                renderNetworkLoader,
                networkLoaderProps,
                networkImageProps,
                currentItem,
                renderItem,
                marginHorizontal,
                renderItemStyle,
                setCurrentItem,
              }}
            />
          )}
          onScrollToIndexFailed={onScrollToIndexFailed}
          {...{ animatedProps }}
          {...thumbnailFlatListProps}
        />
      </Animated.View>
    );
  }
);

export default Footer;
