import React from 'react';
import { Image, ImageProps } from 'react-native';
import { images } from '../../../assets';
import { NetworkImageStyle as styles } from './styles';

const NetworkImage = ({ ...rest }: Partial<ImageProps>) => {
  return (
    <Image
      source={images.errorImage}
      style={styles.container}
      resizeMode="contain"
      {...rest}
    />
  );
};

export default NetworkImage;
