import {Text, View, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
