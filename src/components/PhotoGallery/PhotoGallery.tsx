import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { Constants } from '../../constants';
import { AnimatedImage, ListItem, PhotosModal } from './components';
import { usePhotoGallery } from './hooks';
import styles from './Styles';
import type { MeasureValues, PhotoGalleryProps } from './Types';

const PhotoGallery = ({
  data,
  scaledImageResizeMode = Constants.scaledImageResizeMode,
  animationCloseSpeed = Constants.animationCloseSpeed,
  animatedThumbnailScrollSpeed = Constants.animatedThumbnailScrollSpeed,
  animatedImageDelay = Constants.animatedImageDelay,
  thumbnailListImageHeight = Constants.thumbnailListImageHeight,
  thumbnailListImageWidth = Constants.thumbnailListImageWidth,
  thumbnailListImageSpace = Constants.thumbnailListImageSpace,
  renderHeader,
  onImageExpand,
  flatListProps,
  listItemProps = {},
  modalProps,
  modalBackgroundProps,
  modalHeaderProps,
  modalContentProps,
  modalContentImageProps,
  modalFooterProps,
  modalBackgroundStyle,
  networkLoaderProps,
  renderNetworkLoader,
  networkImageProps,
  onZoomStart,
  onZoomEnd,
  maxZoomScale,
  disableZoom,
  disableSwipeDown,
  ...rest
}: PhotoGalleryProps) => {
  const {
    origin,
    indexValue,
    selectedItem,
    onOpen,
    layoutStyle,
    onClose,
    visible,
  } = usePhotoGallery({ animationCloseSpeed });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => onImageExpand && onImageExpand({ visible }), [visible]);
  const { containerStyle, imageContainerStyle, imageProps } = listItemProps;

  return (
    <Animated.View style={[styles.screen, layoutStyle]} {...rest}>
      <FlatList
        data={data}
        contentContainerStyle={styles.flatListContentContainerStyle}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            onPress={(values: MeasureValues) => onOpen(values, item, index)}
            {...{
              containerStyle,
              imageContainerStyle,
              imageProps,
              networkLoaderProps,
              renderNetworkLoader,
              networkImageProps,
              index,
            }}
          />
        )}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        {...flatListProps}
      />
      <PhotosModal
        {...{
          data,
          visible,
          origin,
          onClose,
          index: indexValue,
          modalBackgroundProps,
          modalHeaderProps,
          modalContentProps,
          modalFooterProps,
          renderHeader,
          thumbnailListImageHeight,
          thumbnailListImageWidth,
          thumbnailListImageSpace,
          animationCloseSpeed,
          animatedThumbnailScrollSpeed,
          animatedImageDelay,
          modalBackgroundStyle,
          networkLoaderProps,
          renderNetworkLoader,
          networkImageProps,
          onZoomStart,
          onZoomEnd,
          maxZoomScale,
          disableZoom,
          disableSwipeDown,
        }}
        item={selectedItem}
        {...modalProps}>
        <AnimatedImage
          enableNetworkHandling
          item={selectedItem}
          style={styles.imageStyle}
          resizeMode={scaledImageResizeMode}
          {...{ networkLoaderProps, renderNetworkLoader, networkImageProps }}
          {...modalContentImageProps}
        />
      </PhotosModal>
    </Animated.View>
  );
};

export default PhotoGallery;
