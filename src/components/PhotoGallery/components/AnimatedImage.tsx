import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import styles from '../Styles';
import type { AnimatedImageProps } from '../Types';
import NetworkImage from './NetworkImage';
import NetworkLoader from './NetworkLoader';

const AnimatedImage = ({
  item,
  networkImageProps,
  networkLoaderProps,
  renderNetworkLoader,
  enableNetworkHandling = false,
  ...rest
}: AnimatedImageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      <Animated.Image
        source={item.source}
        style={styles.imageStyle}
        onLoadStart={() => {
          setLoading(true);
          setError(false);
        }}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
        {...rest}
      />
      {enableNetworkHandling && loading && (
        <NetworkLoader {...{ renderNetworkLoader }} {...networkLoaderProps} />
      )}
      {enableNetworkHandling && error && (
        <NetworkImage {...networkImageProps} />
      )}
    </>
  );
};

export default AnimatedImage;
