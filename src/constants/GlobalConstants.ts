import type {
  PhotoGalleryProps,
  GlobalConstantType,
} from '../components/PhotoGallery/Types';

const GlobalConstant: Required<
  Pick<
    PhotoGalleryProps,
    | 'scaledImageResizeMode'
    | 'animatedThumbnailScrollSpeed'
    | 'animatedImageDelay'
    | 'animationCloseSpeed'
    | 'thumbnailListImageHeight'
    | 'thumbnailListImageSpace'
    | 'thumbnailListImageWidth'
    | 'maxZoomScale'
  >
> &
  GlobalConstantType = {
  scaledImageResizeMode: 'cover',
  animationCloseSpeed: 350,
  animatedThumbnailScrollSpeed: 30,
  animatedImageDelay: 90,
  thumbnailListImageHeight: 120,
  thumbnailListImageWidth: 120,
  thumbnailListImageSpace: 10,
  animationCloseSpeedMargin: 150,
  originExtraLeft: 15,
  originExtraTop: 5,
  originExtraWidth: 30,
  originExtraHeight: 10,
  maxZoomScaleThreadSold: 6,
  minZoomScaleThreadSold: 2,
  maxZoomScale: 3,
  minZoomScale: 1,
};

export default GlobalConstant;
