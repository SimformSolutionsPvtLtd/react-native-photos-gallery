import React from 'react';
import { Modal } from 'react-native';
import Animated from 'react-native-reanimated';
import { usePhotoModal } from '../hooks';
import type { PhotosModalProps } from '../types';
import Footer from './Footer';
import Header from './Header';
import styles from './PhotoModalStyle';

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
  horizontalListImageHeight,
  horizontalListImageWidth,
  horizontalListImageSpace,
  animationCloseSpeed,
  animatedHorizontalScrollSpeed,
  animatedImageDelay,
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
    horizontalListImageWidth,
    horizontalListImageSpace,
    animationCloseSpeed,
    animatedHorizontalScrollSpeed,
    animatedImageDelay,
  });
  const { containerProps, containerStyle } = modalHeaderProps;
  const {
    horizontalFlatListProps,
    footerContainerProps,
    footerContainerStyle,
  } = modalFooterProps;
  const { contentStyle = {}, contentProps } = modalContentProps;

  return (
    <Modal visible={visible} transparent {...rest}>
      <Animated.View
        style={[styles.backgroundView, boxOpacityStyle]}
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
          horizontalFlatListProps,
          footerContainerProps,
          horizontalListImageHeight,
          horizontalListImageWidth,
          horizontalListImageSpace,
          footerContainerStyle,
        }}
        getFooterContainerHeight={setFooterHeight}
      />
    </Modal>
  );
};

export default PhotosModal;
