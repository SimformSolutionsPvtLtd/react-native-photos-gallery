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
};

export default GlobalConstant;
