import { PhotoGallery } from 'react-native-photos-gallery';
import { data } from '../../constant';
import styles from '../Styles';

const TwoColumnExample = () => (
  <PhotoGallery
    data={data}
    animatedImageDelay={60}
    modalBackgroundStyle={styles.modalBackgroundStyle}
  />
);

export default TwoColumnExample;
