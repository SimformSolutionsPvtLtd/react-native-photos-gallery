import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './AppStyles';
import type { ItemData, ListItem } from './Types';
import { listData } from './constant';
import {
  HorizontalListExample,
  OneColumnExample,
  TwoColumnExample,
} from './examples';

const ListItem = ({ item, data, setData }: ListItem) => (
  <TouchableOpacity
    style={[
      styles.touchableStyle,
      item.isSelected && styles.activeTouchableStyle,
    ]}
    onPress={() => {
      const newData = data.map((oldData: ItemData) => ({
        ...oldData,
        isSelected: oldData.id === item.id,
      }));
      setData(newData);
    }}>
    <Text style={[styles.textStyle, item.isSelected && styles.activeTextStyle]}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

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

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={data}
        style={styles.flatListStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ListItem {...{ item, setData, data }} />}
        keyExtractor={item => item.id.toString()}
      />
      {renderExample()}
    </SafeAreaView>
  );
};

export default App;
