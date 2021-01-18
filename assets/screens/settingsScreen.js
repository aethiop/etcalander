import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/styles';

const SettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffe',
        paddingTop: 50,
      }}>
      <Text style={styles.title}>Calendar Type</Text>
    </View>
  );
};

export default SettingsScreen;
