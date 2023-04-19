import { useCallback, useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Directions, Gesture } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { ZoomGesture } from '../Types';
import { Constants } from '../../../constants';

const useZoomGestures = ({
  close,
  onZoomStart,
  onZoomEnd,
  maxZoomScale: maxScale = Constants.maxZoomScale,
  disableZoom = false,
  disableSwipeDown,
}: ZoomGesture) => {
  let maxZoomScale = 2.5;
  if (maxScale > Constants.maxZoomScaleThreadSold) {
    maxZoomScale = Constants.maxZoomScaleThreadSold;
  } else if (maxScale < Constants.minZoomScaleThreadSold) {
    maxZoomScale = 2.5;
  } else {
    maxZoomScale = maxScale;
  }
  const minZoomScale = Constants.minZoomScale;
  const pinchEnabled = useSharedValue(false);
  const zoomEnabled = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);
  const oldTranslateX = useSharedValue(0);
  const oldTranslateY = useSharedValue(0);
  const panGestureTranslateX = useSharedValue(0);
  const panGestureTranslateY = useSharedValue(0);
  const viewHeight = useSharedValue(0);
  const viewWidth = useSharedValue(0);
  const scale = useSharedValue(1);
  const oldScale = useSharedValue(0);
  const offsetScale = useSharedValue(0);
  const [panEnabled, setPanEnabled] = useState(false);
  const springConfig = {
    damping: 20,
    stiffness: 90,
  };

  /**
   * It's worklet for reset the Zoom
   */
  const resetZoom = () => {
    'worklet';
    translateX.value = withSpring(0, springConfig);
    translateY.value = withSpring(0, springConfig);
    scale.value = withSpring(1, springConfig);
    originX.value = 0;
    originY.value = 0;
    pinchEnabled.value = false;
    oldScale.value = 0;
    oldTranslateX.value = 0;
    oldTranslateY.value = 0;
    panGestureTranslateX.value = 0;
    panGestureTranslateY.value = 0;
  };

  /**
   * In, Pan Gesture we enable the pan gesture only when the image is zoomed or the user does not pinch.
   * In, Pan Gesture on update we need to multiplied by x number of times the scale
   * In, Pinch Gesture on update check pointer is 1 we don't want to translate origin
   * In, Double Tap Gesture on start if zoomed in or zoomed out, we want to reset if scale is 1.
   * if scale is not 1 then translate to the focal point and zoom the image.
   */
  const gesture = useMemo(() => {
    /**
     * Double Tap Gesture for Zoom in and Zoom out
     */
    const doubleTap = Gesture.Tap()
      .enabled(!disableZoom)
      .onStart(e => {
        if (scale.value !== 1) {
          resetZoom();
        } else {
          scale.value = withSpring(maxZoomScale, springConfig);
          translateX.value = withSpring(
            -1 * (maxZoomScale * (e.x - viewWidth.value / 2)),
            springConfig
          );
          translateY.value = withSpring(
            -1 * (maxZoomScale * (e.y - viewHeight.value / 2)),
            springConfig
          );
        }
      })
      .numberOfTaps(2);

    /**
     * Fling Gesture for close the modal
     */
    const fling = Gesture.Fling()
      .direction(Directions.DOWN)
      .enabled(!disableSwipeDown ?? !panEnabled)
      .onStart(() => {
        runOnJS(close)();
      });

    /**
     * Pinch Gesture for pinching the image zoom in and zoom out
     */
    const pinch = Gesture.Pinch()
      .enabled(!disableZoom)
      .onStart(() => {
        cancelAnimation(translateX);
        cancelAnimation(translateY);
        cancelAnimation(scale);
        oldScale.value = scale.value;
        offsetScale.value = scale.value;
      })
      .onUpdate(e => {
        if (e.numberOfPointers === 1 && !pinchEnabled.value) {
          oldTranslateX.value = translateX.value;
          oldTranslateY.value = translateY.value;
          pinchEnabled.value = false;
        } else if (e.numberOfPointers === 2) {
          const newScale = oldScale.value * e.scale;
          if (newScale < minZoomScale || newScale > maxZoomScale) return;
          scale.value = oldScale.value * e.scale;

          /**
           * Reset origin if we are zooming out
           */
          if (!pinchEnabled.value) {
            pinchEnabled.value = true;
            originX.value = e.focalX;
            originY.value = e.focalY;
            oldTranslateX.value = translateX.value;
            oldTranslateY.value = translateY.value;
            offsetScale.value = scale.value;
          }

          /**
           * Translate the image to the focal point if we are zoomed in
           */
          if (pinchEnabled.value) {
            translateX.value =
              oldTranslateX.value +
              -1 *
                ((scale.value - offsetScale.value) *
                  (originX.value - viewWidth.value / 2));
            translateY.value =
              oldTranslateY.value +
              -1 *
                ((scale.value - offsetScale.value) *
                  (originY.value - viewHeight.value / 2));
          }
        }
      })
      .onEnd(() => {
        pinchEnabled.value = false;
        oldTranslateX.value = translateX.value;
        oldTranslateY.value = translateY.value;

        /**
         * Reset the zoom if the scale is less than 1.1
         */
        if (scale.value < 1.1) {
          resetZoom();
        }
      });

    /**
     * Pan Gesture for panning the image after zoomed in
     */
    const pan = Gesture.Pan()
      .enabled(panEnabled)
      .onStart(() => {
        if (pinchEnabled.value || !zoomEnabled.value) return;
        cancelAnimation(translateX);
        cancelAnimation(translateY);
        cancelAnimation(scale);
        oldTranslateX.value = translateX.value;
        oldTranslateY.value = translateY.value;
      })
      .onUpdate(e => {
        if (!pinchEnabled.value || zoomEnabled.value) {
          const maxTranslateX =
            (viewWidth.value / 2) * scale.value - viewWidth.value / 2;
          const minTranslateX = -maxTranslateX;
          const maxTranslateY =
            (viewHeight.value / 2) * scale.value - viewHeight.value / 2;
          const minTranslateY = -maxTranslateY;
          const newTranslateX =
            oldTranslateX.value + e.translationX - panGestureTranslateX.value;
          const newTranslateY =
            oldTranslateY.value + e.translationY - panGestureTranslateY.value;

          /**
           * Check if the image translateX is more than the max translate or less than the min translate
           */
          if (newTranslateX > maxTranslateX) {
            translateX.value = maxTranslateX;
          } else if (newTranslateX < minTranslateX) {
            translateX.value = minTranslateX;
          } else {
            translateX.value = newTranslateX;
          }

          /**
           * Check if the image translateY is more than the max translate or less than the min translate
           */
          if (newTranslateY > maxTranslateY) {
            translateY.value = maxTranslateY;
          } else if (newTranslateY < minTranslateY) {
            translateY.value = minTranslateY;
          } else {
            translateY.value = newTranslateY;
          }
        } else {
          panGestureTranslateX.value = e.translationX;
          panGestureTranslateY.value = e.translationY;
        }
      })
      .onEnd(() => {
        if (pinchEnabled.value || !zoomEnabled.value) return;
        panGestureTranslateX.value = 0;
        panGestureTranslateY.value = 0;
      });

    return Gesture.Race(doubleTap, Gesture.Simultaneous(pan, pinch, fling));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panEnabled, maxZoomScale, minZoomScale]);

  /**
   * Enable or disable pan gesture when zoomed in or zoomed out based on the scale value
   */
  useDerivedValue(() => {
    if (scale.value > 1 && !zoomEnabled.value) {
      zoomEnabled.value = true;
      runOnJS(setPanEnabled)(true);
      onZoomStart && runOnJS(onZoomStart)();
    } else if (scale.value === 1 && zoomEnabled.value) {
      zoomEnabled.value = false;
      runOnJS(setPanEnabled)(false);
      onZoomEnd && runOnJS(onZoomEnd)();
    }
  }, [scale.value]);

  /**
   * Zoom style for the image
   */
  const zoomStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  }, []);

  /**
   * get the view height and width on layout of image
   */
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      viewHeight.value = e.nativeEvent.layout.height;
      viewWidth.value = e.nativeEvent.layout.width;
    },
    [viewHeight, viewWidth]
  );

  return {
    gesture,
    zoomStyle,
    onLayout,
    resetZoom,
  };
};

export default useZoomGestures;
