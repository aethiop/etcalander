import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

const DrawerComponent = ({...props}) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text>Copyright</Text>
    </DrawerContentScrollView>
  );
};

export default DrawerComponent;
