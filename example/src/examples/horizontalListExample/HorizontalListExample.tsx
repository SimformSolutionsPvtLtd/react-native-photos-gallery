import { PhotoGallery } from 'react-native-photos-gallery';
import { data } from '../../constant';
import styles from './HorizontalListExampleStyle';
import style from '../styles';

const HorizontalListExample = () => (
  <PhotoGallery
    data={data}
    flatListProps={{ horizontal: true, numColumns: 1 }}
    listItemProps={{ containerStyle: styles.listItemContainer }}
    animationCloseSpeed={300}
    modalBackgroundStyle={style.modalBackgroundStyle}
  />
);

export default HorizontalListExample;
