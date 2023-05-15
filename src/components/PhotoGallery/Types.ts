import type {
  ActivityIndicatorProps,
  FlatListProps,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ModalProps,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import type { AnimateProps, AnimateStyle } from 'react-native-reanimated';

export interface ArrayData {
  id: number;
  source: ImageSourcePropType;
}

export interface NetworkData {
  loading?: boolean;
  error?: boolean;
}

export interface PhotoGalleryProps
  extends ViewProps,
    Pick<
      PhotosModalProps,
      | 'modalBackgroundProps'
      | 'modalHeaderProps'
      | 'modalFooterProps'
      | 'modalContentProps'
      | 'renderHeader'
      | 'thumbnailListImageHeight'
      | 'thumbnailListImageWidth'
      | 'animationCloseSpeed'
      | 'animatedThumbnailScrollSpeed'
      | 'animatedImageDelay'
      | 'thumbnailListImageSpace'
      | 'modalBackgroundStyle'
    >,
    Pick<ListItemProps, 'networkLoaderProps' | 'networkImageProps'>,
    Pick<NetworkLoaderProps, 'renderNetworkLoader'> {
  data: Array<ArrayData>;
  scaledImageResizeMode?: ImageResizeMode;
  flatListProps?: Omit<FlatListProps<ArrayData>, 'data' | 'renderItem'>;
  listItemProps?: Pick<
    ListItemProps,
    'containerStyle' | 'imageContainerStyle' | 'imageProps'
  >;
  modalContentImageProps?: AnimateProps<ImageProps>;
  onImageExpand?: ({ visible }: Pick<PhotosModalProps, 'visible'>) => void;
  modalProps?: Omit<ModalProps, 'visible'>;
}

export interface MeasureValues {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export interface ListItemProps
  extends Pick<NetworkLoaderProps, 'renderNetworkLoader'> {
  item: ArrayData;
  onPress: (args: MeasureValues) => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<AnimateStyle<ViewStyle>>;
  imageProps?: Omit<AnimateProps<ImageProps>, 'source' | 'defaultSource'>;
  networkLoaderProps?: ActivityIndicatorProps;
  networkImageProps?: Partial<ImageProps>;
}

export interface TargetValues extends Pick<MeasureValues, 'x' | 'y'> {
  opacity: number;
}

// this type is written for range between 15-150 for size
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface ModalContentProps {
  contentStyle?: StyleProp<
    Omit<
      AnimateStyle<ViewStyle>,
      | 'top'
      | 'left'
      | 'height'
      | 'width'
      | 'opacity'
      | 'position'
      | 'backgroundColor'
    >
  >;
  contentProps?: Omit<AnimateProps<ViewProps>, 'style'>;
}

export interface PhotosModalProps
  extends Pick<
      PhotoModalFooterProps,
      | 'thumbnailListImageHeight'
      | 'thumbnailListImageWidth'
      | 'thumbnailListImageSpace'
    >,
    Omit<ModalProps, 'visible'>,
    Pick<ListItemProps, 'networkLoaderProps' | 'networkImageProps'>,
    Pick<NetworkLoaderProps, 'renderNetworkLoader'> {
  visible: boolean;
  children: React.ReactElement;
  origin: Omit<MeasureValues, 'pageX' | 'pageY'>;
  renderHeader?: (args: () => void) => React.ReactElement;
  onClose: () => void;
  data: Array<ArrayData>;
  index: number;
  item: ArrayData;
  modalBackgroundProps?: Omit<AnimateProps<ViewProps>, 'style'>;
  animationCloseSpeed?: Range<200, 500>;
  animatedThumbnailScrollSpeed?: 10 | 20 | 30;
  animatedImageDelay?: 20 | 30 | 60 | 90;
  modalHeaderProps?: Pick<
    PhotoModalHeaderProps,
    'containerProps' | 'containerStyle'
  >;
  modalFooterProps?: Pick<
    PhotoModalFooterProps,
    'thumbnailFlatListProps' | 'footerContainerProps' | 'footerContainerStyle'
  >;
  modalContentProps?: ModalContentProps;
  modalBackgroundStyle?: StyleProp<
    Omit<
      AnimateStyle<ViewStyle>,
      'top' | 'left' | 'width' | 'height' | 'position'
    >
  >;
}

export interface PhotoModalHeaderProps {
  close: () => void;
  boxOpacityStyle: Pick<TargetValues, 'opacity'>;
  containerProps?: Omit<AnimateProps<ViewProps>, 'style'>;
  containerStyle?: StyleProp<
    Omit<AnimateStyle<ViewStyle>, 'opacity' | 'position' | 'width'>
  >;
}

export interface PhotoModalFooterProps {
  handleScroll: () => void;
  currentItem: ArrayData;
  setCurrentItem: React.Dispatch<React.SetStateAction<ArrayData>>;
  animatedProps: Partial<{
    contentOffset: {
      x: number;
      y: number;
    };
  }>;
  thumbnailFlatListProps?: Omit<
    AnimateProps<FlatListProps<any>>,
    'data' | 'renderItem' | 'onScrollToIndexFailed' | 'onScroll' | 'horizontal'
  >;
  footerContainerProps?: Omit<AnimateProps<ViewProps>, 'style'>;
  footerContainerStyle?: StyleProp<
    Omit<AnimateStyle<ViewStyle>, 'position' | 'bottom'>
  >;
  getFooterContainerHeight: (height: number) => void;
  thumbnailListImageHeight?: number;
  thumbnailListImageWidth?: number;
  thumbnailListImageSpace?: Range<5, 35>;
}

export interface GlobalConstantType {
  animationCloseSpeedMargin: number;
  originExtraLeft: number;
  originExtraTop: number;
  originExtraWidth: number;
  originExtraHeight: number;
}

export interface ScrollToIndexFailErrorType {
  index: number;
  highestMeasuredFrameIndex: number;
  averageItemLength: number;
}

export interface NetworkLoaderProps extends ActivityIndicatorProps, ViewProps {
  renderNetworkLoader?: () => React.ReactElement;
}

export interface AnimatedImageProps
  extends Pick<
      ListItemProps,
      | 'item'
      | 'networkImageProps'
      | 'networkLoaderProps'
      | 'renderNetworkLoader'
    >,
    Omit<AnimateProps<ImageProps>, 'source' | 'defaultSource'> {
  enableNetworkHandling?: boolean;
}

type RenderItemStyle = {
  width: number | undefined;
  height: number | undefined;
};

type MarginHorizontal = {
  marginHorizontal: number;
};

export interface RenderFooterItemProps
  extends Pick<
      PhotosModalProps,
      'renderNetworkLoader' | 'networkImageProps' | 'networkLoaderProps'
    >,
    Pick<PhotoModalFooterProps, 'currentItem' | 'setCurrentItem'> {
  renderItem: ArrayData;
  marginHorizontal: MarginHorizontal;
  renderItemStyle: RenderItemStyle;
}
