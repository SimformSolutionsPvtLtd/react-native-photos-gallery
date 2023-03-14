import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Constants } from '../../../constants';
import {
  isAndroid,
  windowHeight,
  windowWidth,
  STATUS_BAR_OFFSET,
} from '../../../theme';
import { useForwardRef } from '../hooks';
import type { ArrayData, PhotosModalProps, TargetValues } from '../types';

const usePhotoModal = ({
  origin,
  visible,
  children,
  index,
  item,
  onClose,
  animationCloseSpeed,
  horizontalListImageWidth = Constants.horizontalListImageWidth,
  horizontalListImageSpace = Constants.horizontalListImageSpace,
  animatedHorizontalScrollSpeed = Constants.animatedHorizontalScrollSpeed,
  animatedImageDelay = Constants.animatedImageDelay,
}: Pick<
  PhotosModalProps,
  | 'origin'
  | 'children'
  | 'visible'
  | 'index'
  | 'item'
  | 'onClose'
  | 'horizontalListImageWidth'
  | 'animationCloseSpeed'
  | 'animatedHorizontalScrollSpeed'
  | 'animatedImageDelay'
  | 'horizontalListImageSpace'
>) => {
  const [currentItem, setCurrentItem] = useState<ArrayData>({
    id: 0,
    source: 0,
  });
  const footerFlatListRef = useForwardRef<Animated.FlatList<ArrayData>>(null);
  const [target, setTarget] = useState<TargetValues>({
    x: 0,
    y: 0,
    opacity: 1,
  });
  const openVal = useSharedValue(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const offsetY = useSharedValue(0);

  /**
   * To get an object for spring animation configuration based on the amount of the delay
   * @param delay - amount of delay for spring animation
   * @returns It's return open animation(for delay) spring object
   */
  const getDelay = (delay: number) => {
    switch (delay) {
      case 20:
        return {
          stiffness: 20,
          dumping: 2,
        };
      case 30:
        return {
          stiffness: 30,
          dumping: 5,
        };
      case 60:
        return {
          stiffness: 60,
          damping: 13,
        };
      case 90:
        return {
          stiffness: 90,
          damping: 20,
        };
      default:
        return {
          stiffness: 90,
          damping: 20,
        };
    }
  };

  /**
   * To get scroll speed animation configuration object based on the speed
   * @param speed - amount of speed for spring animation
   * @returns It's return scroll animation(for speed) spring object
   */
  const getScrollSpeedValues = (speed: number) => {
    switch (speed) {
      case 10:
        return {
          stiffness: 10,
          dumping: 6,
        };
      case 20:
        return {
          stiffness: 20,
          damping: 8,
        };
      case 30:
        return {
          stiffness: 30,
          damping: 10,
        };
      default:
        return {
          stiffness: 30,
          damping: 10,
        };
    }
  };

  /**
   * It is used to begin animation in modal.
   * When the modal is visible, this method is called and it starts animation for transition
   */
  const open = useCallback(() => {
    setTarget({
      x: 0,
      y: 0,
      opacity: 1,
    });
    openVal.value = withSpring(1, getDelay(animatedImageDelay));
  }, [animatedImageDelay, openVal]);

  /**
   * Animated style for view while content is opening
   */
  const openStyle = useAnimatedStyle(() => {
    const left = interpolate(
      openVal.value,
      [0, 1],
      [origin.x + Constants.originExtraLeft, target.x]
    );
    const top = interpolate(
      openVal.value,
      [0, 1],
      [
        origin.y + Constants.originExtraLeft + STATUS_BAR_OFFSET,
        target.y + STATUS_BAR_OFFSET,
      ]
    );
    const width = interpolate(
      openVal.value,
      [0, 1],
      [origin.width - Constants.originExtraWidth, windowWidth]
    );
    const height = interpolate(
      openVal.value,
      [0, 1],
      [
        origin.height - Constants.originExtraHeight,
        windowHeight - footerHeight - STATUS_BAR_OFFSET,
      ]
    );

    return {
      left,
      top,
      width,
      height,
    };
  });

  /**
   * Animated style for view while content is closing
   */
  const closeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(openVal.value, [0.1, 0], [1, 0]);
    const borderRadius = interpolate(openVal.value, [1, 0], [5, 10]);
    return {
      opacity,
      borderRadius: borderRadius,
    };
  });

  /**
   * Animated style for view for opacity
   */
  const boxOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(openVal.value, [0, 1], [0, target.opacity]);
    return {
      opacity,
    };
  });

  /**
  /**
   * It's use for closing animation of modal
   * Gets a call when the modal closes triggered.
   */
  const close = () => {
    if (!isAndroid) {
      StatusBar.setHidden(false, 'fade');
    }
    onClose();
    openVal.value = withTiming(0, {
      duration: animationCloseSpeed ?? 0,
    });
  };

  useEffect(() => {
    visible && open();
  }, [visible, open]);

  /**
   * Render the children(image) when it's changes
   */
  const renderChildren = useMemo(() => {
    return React.cloneElement(children, {
      source: currentItem.source,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  /**
   * AnimatedProps style for flatList auto scroll
   */
  const animatedProps = useAnimatedProps(() => {
    return {
      contentOffset: {
        x: offsetY.value,
        y: 0,
      },
    };
  });

  /**
   * It's use for applying animation to the scroll of flatList
   */
  const handleScroll = () => {
    offsetY.value = withSpring(
      index * (horizontalListImageWidth + horizontalListImageSpace * 2),
      getScrollSpeedValues(animatedHorizontalScrollSpeed)
    );
  };

  /**
   * It's called when modal opens and use for scroll flatList to particular index
   */
  useEffect(() => {
    setCurrentItem(item);
    setTimeout(() => {
      visible &&
        //@ts-ignore
        footerFlatListRef?.current?.scrollToIndex({
          animated: true,
          index: index ?? 0,
          viewPosition: 0,
        });
    }, 100);
    return () => {
      if (visible) {
        offsetY.value = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, index]);

  return {
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
    offsetY,
  };
};

export default usePhotoModal;
