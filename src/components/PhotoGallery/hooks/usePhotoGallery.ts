import { useEffect, useState } from 'react';
import {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Constants } from '../../../constants';
import type { ArrayData, MeasureValues, PhotoGalleryProps } from '../Types';

const usePhotoGallery = ({
  animationCloseSpeed,
}: Pick<PhotoGalleryProps, 'animationCloseSpeed'>) => {
  const [origin, setOrigin] = useState<Omit<MeasureValues, 'pageX' | 'pageY'>>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [selectedItem, setSelectedItem] = useState<ArrayData>({
    id: 0,
    source: 0,
  });
  const layoutValue = useSharedValue(0);
  const [indexValue, setIndexValue] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  /**
   * The modal is opened using this method.
   * @param values - Measured co-ordinate values of animated view
   * @param item - of ArrayData for which modal is opened
   * @param index - of ArrayData for which modal is opened
   */
  const onOpen = (values: MeasureValues, item: ArrayData, index: number) => {
    setSelectedItem(item);
    setIndexValue(index);
    setOrigin({
      width: values.width,
      height: values.height,
      x: values.pageX,
      y: values.pageY,
    });
    setVisible(true);
  };

  /**
   * Screen layout opacity will change when the value of visible changes.
   */
  useEffect(() => {
    visible &&
      (layoutValue.value = withTiming(1, {
        duration:
          animationCloseSpeed ?? 0 + Constants.animationCloseSpeedMargin,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  /**
   * Screen layout animation style
   */
  const layoutStyle = useAnimatedStyle(() => {
    const opacity = interpolate(layoutValue.value, [0, 0.5, 1], [1, 0.5, 0]);
    return {
      opacity: opacity,
    };
  });

  /**
   * The modal is closed using this method.
   */
  const onClose = () => {
    layoutValue.value = withTiming(
      0,
      {
        duration: animationCloseSpeed,
      },
      () => {
        runOnJS(setVisible)(false);
      }
    );
  };

  return {
    origin,
    indexValue,
    selectedItem,
    onOpen,
    layoutStyle,
    onClose,
    visible,
    setSelectedItem,
    setIndexValue,
  };
};

export default usePhotoGallery;
