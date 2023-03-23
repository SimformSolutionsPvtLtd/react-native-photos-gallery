import { PhotoGallery } from 'react-native-photos-gallery';
import { data } from '../../constant';

const TwoColumnExample = () => (
  <PhotoGallery data={data} animatedImageDelay={60} />
);

export default TwoColumnExample;
