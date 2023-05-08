import { PhotoGallery } from 'react-native-photos-gallery';
import { data } from '../../constant';
import styles from '../Styles';

const OneColumnExample = () => (
  <PhotoGallery
    data={data}
    flatListProps={{ numColumns: 1 }}
    modalBackgroundStyle={styles.modalBackgroundStyle}
  />
);

export default OneColumnExample;
