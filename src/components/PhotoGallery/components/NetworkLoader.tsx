import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './NetworkLoaderStyle';
import type { NetworkLoaderProps } from '../Types';

const NetworkLoader = ({
  renderNetworkLoader,
  ...rest
}: NetworkLoaderProps) => {
  return renderNetworkLoader ? (
    <View {...rest} style={styles.container}>
      {renderNetworkLoader()}
    </View>
  ) : (
    <ActivityIndicator size={'small'} style={styles.container} {...rest} />
  );
};

export default NetworkLoader;
