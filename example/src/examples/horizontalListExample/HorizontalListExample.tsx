import { PhotoGallery } from 'react-native-photos-gallery';
import { data } from '../../constant';
import styles from './HorizontalListExampleStyle';

const HorizontalListExample = () => (
  <PhotoGallery
    data={data}
    flatListProps={{ horizontal: true, numColumns: 1 }}
    listItemProps={{ containerStyle: styles.listItemContainer }}
    animationCloseSpeed={300}
  />
);

export default HorizontalListExample;
