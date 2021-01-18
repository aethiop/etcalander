import {View, Button, Text} from 'react-native';
import CustomCalendar from '../components/customCalendar';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles/styles';
import {toEthiopian, toGregorian} from 'ethiopian-date';

const CalendarScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomCalendar />
    </View>
  );
};
export default CalendarScreen;
