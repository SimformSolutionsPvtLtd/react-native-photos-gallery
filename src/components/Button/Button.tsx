import React from 'react';
import { SafeAreaView, Text, Pressable } from 'react-native';
import styles from './styles';
import type { ButtonProps } from './types';

const Button = ({ text }: ButtonProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.text}>{text?.toUpperCase()}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Button;
