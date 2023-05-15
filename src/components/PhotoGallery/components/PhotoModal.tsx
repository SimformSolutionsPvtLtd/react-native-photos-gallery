import React from 'react';
import { Modal } from 'react-native';
import Animated from 'react-native-reanimated';
import { usePhotoModal } from '../hooks';
import type { PhotosModalProps } from '../Types';
import Footer from './Footer';
import Header from './Header';
import { PhotoModalStyle as styles } from './styles';

const PhotosModal = ({
  visible = false,
  children,
  origin,
  renderHeader,
  onClose,
  data,
  index,
  item,
  modalBackgroundProps,
  modalHeaderProps = {},
  modalFooterProps = {},
  modalContentProps = {},
  thumbnailListImageHeight,
  thumbnailListImageWidth,
  thumbnailListImageSpace,
  networkLoaderProps,
  renderNetworkLoader,
  networkImageProps,
  animationCloseSpeed,
  animatedThumbnailScrollSpeed,
  animatedImageDelay,
  modalBackgroundStyle = {},
  ...rest
}: PhotosModalProps) => {
  const {
    handleScroll,
    animatedProps,
    renderChildren,
    close,
    boxOpacityStyle,
    closeStyle,
    openStyle,
    footerFlatListRef,
    currentItem,
    setCurrentItem,
    setFooterHeight,
  } = usePhotoModal({
    visible,
    children,
    origin,
    onClose,
    index,
    item,
    thumbnailListImageWidth,
    thumbnailListImageSpace,
    animationCloseSpeed,
    animatedThumbnailScrollSpeed,
    animatedImageDelay,
  });
  const { containerProps, containerStyle } = modalHeaderProps;
  const { thumbnailFlatListProps, footerContainerProps, footerContainerStyle } =
    modalFooterProps;
  const { contentStyle = {}, contentProps } = modalContentProps;

  return (
    <Modal visible={visible} transparent {...rest}>
      <Animated.View
        style={[styles.backgroundView, boxOpacityStyle, modalBackgroundStyle]}
        {...modalBackgroundProps}
      />
      <Animated.View
        style={[styles.contentView, openStyle, closeStyle, contentStyle]}
        {...contentProps}>
        {renderChildren}
      </Animated.View>
      <Header
        {...{
          renderHeader,
          close,
          boxOpacityStyle,
          containerProps,
          containerStyle,
        }}
      />
      <Footer
        ref={footerFlatListRef}
        {...{
          data,
          handleScroll,
          animatedProps,
          currentItem,
          setCurrentItem,
          boxOpacityStyle,
          thumbnailFlatListProps,
          footerContainerProps,
          thumbnailListImageHeight,
          thumbnailListImageWidth,
          thumbnailListImageSpace,
          footerContainerStyle,
          networkLoaderProps,
          renderNetworkLoader,
          networkImageProps,
        }}
        getFooterContainerHeight={setFooterHeight}
      />
    </Modal>
  );
};

export default PhotosModal;
