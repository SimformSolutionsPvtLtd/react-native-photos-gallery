import { FlatList, Image } from 'react-native';
import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import type { MeasureValues, PhotoGalleryProps } from './types';
import { ListItem, PhotosModal } from './components';
import { usePhotoGallery } from './hooks';
import styles from './styles';
import { Constants } from '../../constants';

const PhotoGallery = ({
  data,
  scaledImageResizeMode = Constants.scaledImageResizeMode,
  animationCloseSpeed = Constants.animationCloseSpeed,
  animatedHorizontalScrollSpeed = Constants.animatedHorizontalScrollSpeed,
  animatedImageDelay = Constants.animatedImageDelay,
  horizontalListImageHeight = Constants.horizontalListImageHeight,
  horizontalListImageWidth = Constants.horizontalListImageWidth,
  horizontalListImageSpace = Constants.horizontalListImageSpace,
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
            }}
          />
        )}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        {...flatListProps}
      />
      <PhotosModal
        {...{
          visible,
          origin,
          onClose,
          data,
          index: indexValue,
          modalBackgroundProps,
          modalHeaderProps,
          modalContentProps,
          modalFooterProps,
          renderHeader,
          horizontalListImageHeight,
          horizontalListImageWidth,
          horizontalListImageSpace,
          animationCloseSpeed,
          animatedHorizontalScrollSpeed,
          animatedImageDelay,
        }}
        item={selectedItem}
        {...modalProps}>
        <Image
          style={styles.imageStyle}
          source={selectedItem.source}
          resizeMode={scaledImageResizeMode}
          {...modalContentImageProps}
        />
      </PhotosModal>
    </Animated.View>
  );
};

export default PhotoGallery;
