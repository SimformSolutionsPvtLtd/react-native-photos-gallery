import { PhotoGallery } from 'react-native-photos-gallery';
import { data } from '../../constant';

const OneColumnExample = () => (
  <PhotoGallery data={data} flatListProps={{ numColumns: 1 }} />
);

export default OneColumnExample;
