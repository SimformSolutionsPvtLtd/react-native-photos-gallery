import type {
  PhotoGalleryProps,
  GlobalConstantType,
} from '../components/PhotoGallery/types';

const GlobalConstant: Required<
  Pick<
    PhotoGalleryProps,
    | 'scaledImageResizeMode'
    | 'animatedHorizontalScrollSpeed'
    | 'animatedImageDelay'
    | 'animationCloseSpeed'
    | 'horizontalListImageHeight'
    | 'horizontalListImageSpace'
    | 'horizontalListImageWidth'
  >
> &
  GlobalConstantType = {
  scaledImageResizeMode: 'cover',
  animationCloseSpeed: 350,
  animatedHorizontalScrollSpeed: 30,
  animatedImageDelay: 90,
  horizontalListImageHeight: 120,
  horizontalListImageWidth: 120,
  horizontalListImageSpace: 10,
  animationCloseSpeedMargin: 150,
  originExtraLeft: 15,
  originExtraTop: 5,
  originExtraWidth: 30,
  originExtraHeight: 10,
};

export default GlobalConstant;
