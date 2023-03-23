import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './AppStyles';
import { listData } from './constant';
import {
  HorizontalListExample,
  OneColumnExample,
  TwoColumnExample,
} from './examples';
import type { ListItem } from './types';

const App = () => {
  const [data, setData] = useState(listData);

  const renderExample = () => {
    const { title } = data.find(oldData => oldData.isSelected) || {};
    switch (title) {
      case 'Two Column List':
        return <TwoColumnExample />;
      case 'One Column List':
        return <OneColumnExample />;
      case 'Horizontal List':
        return <HorizontalListExample />;
      default:
        return <TwoColumnExample />;
    }
  };

  const ListItem = ({ item }: ListItem) => (
    <TouchableOpacity
      style={[
        styles.touchableStyle,
        item.isSelected && styles.activeTouchableStyle,
      ]}
      onPress={() => {
        const newData = data.map(oldData => ({
          ...oldData,
          isSelected: oldData.id === item.id,
        }));
        setData(newData);
      }}>
      <Text
        style={[styles.textStyle, item.isSelected && styles.activeTextStyle]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={data}
        style={styles.flatListStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ListItem {...{ item }} />}
        keyExtractor={item => item.id.toString()}
      />
      {renderExample()}
    </SafeAreaView>
  );
};

export default App;
