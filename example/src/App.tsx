import React from 'react';
import { SafeAreaView } from 'react-native';
import { PhotoGallery } from 'react-native-photos-gallery';
import styles from './AppStyles';
import { data } from './constant';

const App = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <PhotoGallery data={data} />
    </SafeAreaView>
  );
};

export default App;
