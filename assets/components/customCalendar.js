import React, {useState} from 'react';
import {View, Text, Button, NativeModules} from 'react-native';
import {v4 as uuidv4} from 'uuid';

const SharedStorage = NativeModules.SharedStorage;

import {
  toEthiopian,
  startDayOfEthiopian,
  toGregorian,
} from '../helper/ethiopic';
import {DateTime} from 'luxon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Geezify = require('geezify-js');

var geez = Geezify.create();

const CustomCalendar = () => {
  const etCalendar = {
    et_months: [
      'መስከረም',
      'ጥቅምት',
      'ኅዳር',
      'ታህሣሥ',
      'ጥር',
      'የካቲት',
      'መጋቢት',
      'ሚያዝያ',
      'ግንቦት',
      'ሰኔ',
      'ሐምሌ',
      'ነሐሴ',
      'ጳጉሜ',
    ],
    et_weekDays: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሓሙስ', 'ዓርብ', 'ቅዳሜ'],
    et_days: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5],
  };

  const [state, setState] = useState({
    activeDate: new Date(),
    selectedDate: new Date(),
    todaysDate: new Date(),
  });

  var [etYear, etMonth, etDate] = toEthiopian(
    state.activeDate.getFullYear(),
    state.activeDate.getMonth() + 1,
    state.activeDate.getDate(),
  );

  var [tdYear, tdMonth, tdDate] = toEthiopian(
    state.todaysDate.getFullYear(),
    state.todaysDate.getMonth() + 1,
    state.todaysDate.getDate(),
  );

  function dateClicked(year, month, day) {
    var [yr, mth, selectedDate] = toGregorian(year, month, day);
    if (!day.match && day != -1) {
      setState((prevState) => {
        return {
          ...prevState,
          selectedDate: new Date(yr, mth - 1, selectedDate),
        };
      });
    }
  }

  function generateCalendar(type = 'en') {
    var enYear = state.activeDate.getFullYear();
    var enMonth = state.activeDate.getMonth();

    var matrix = [];

    if (type == 'en') {
      matrix = [];
      var firstDay = new Date(enYear, enMonth, 1).getDay();
      var maxDays = enCalendar.en_days[enMonth];
      if (enMonth == 13) {
        if ((enYear % 4 == 0 && enYear % 100 != 0) || enYear % 400 == 0) {
          maxDays += 1;
        }
      }

      matrix[0] = enCalendar.en_weekDays;

      var counter = 1;
      for (var row = 1; row < 7; row++) {
        matrix[row] = [];
        for (var col = 0; col < 7; col++) {
          matrix[row][col] = -1;
          if (row == 1 && col >= firstDay) {
            matrix[row][col] = counter++;
          } else if (row > 1 && counter <= maxDays) {
            matrix[row][col] = counter++;
          }
        }
      }
    } else if (type == 'et') {
      matrix = [];
      var startDayOfYear = startDayOfEthiopian(etYear);

      // var firstDay = startOfYear + (30 % startDayOfYear);
      var firstDayOfYear = new Date(enYear, 8, startDayOfYear).getDay();
      var firstDay =
        (etMonth - 1) * 2 + firstDayOfYear > 7
          ? ((etMonth - 1) * 2 + firstDayOfYear) % 7
          : (etMonth - 1) * 2 + firstDayOfYear;
      var maxDays = etCalendar.et_days[etMonth - 1];

      if (etMonth == 13) {
        if (etYear % 4 == 3) {
          maxDays += 1;
        }
      }

      matrix[0] = etCalendar.et_weekDays;

      var counter = 1;
      for (var row = 1; row < 7; row++) {
        matrix[row] = [];
        for (var col = 0; col < 7; col++) {
          matrix[row][col] = -1;
          if (row == 1 && col >= firstDay) {
            matrix[row][col] = counter++;
          } else if (row > 1 && counter <= maxDays) {
            matrix[row][col] = counter++;
          }
        }
      }
    }
    return matrix;
  }

  function changeEtMonth(date, n) {
    var oDate = new Date(date);
    var [dYear, dMonth, dDay] = toEthiopian(
      oDate.getFullYear(),
      oDate.getMonth() + 1,
      oDate.getDate(),
    );
    if (dMonth == 1 && n < 1) {
      oDate.setDate(oDate.getDate() - dDay);
    } else {
      oDate.setDate(oDate.getDate() + 30 * n);
    }

    var [eYear, eMonth, eDay] = toEthiopian(
      oDate.getFullYear(),
      oDate.getMonth() + 1,
      oDate.getDate(),
    );
    if (dMonth == 12 && eMonth != 13) {
      oDate.setDate(oDate.getDate() - eDay);
    }
    // If month was 13, set to same day in next month
    if (dMonth == 13) {
      oDate.setDate(oDate.getDate() - eDay + dDay);
    }

    return oDate;
  }

  function changeMonth(n) {
    setState((prevState) => {
      return {
        ...prevState,
        activeDate: new Date(changeEtMonth(state.activeDate, n)),
      };
    });
  }

  var matrix = generateCalendar('et');
  var [selectedYear, selectedMonth, selectedDate] = toEthiopian(
    state.selectedDate.getFullYear(),
    state.selectedDate.getMonth() + 1,
    state.selectedDate.getDate(),
  );
  var [acYr, acMt, acDt] = toEthiopian(
    state.activeDate.getFullYear(),
    state.activeDate.getMonth() + 1,
    state.activeDate.getDate(),
  );
  var rows = [];

  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <View
          key={item == -1 ? item * Math.random() : item}
          style={{
            justifyContent: 'space-around',
            width: 48,
            height: 48,
            borderRadius: 16,
            backgroundColor:
              item == selectedDate && selectedMonth == acMt
                ? '#333'
                : 'transparent',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              textAlign: 'center',
              color:
                rowIndex == 0 || (item == selectedDate && selectedMonth == acMt)
                  ? '#fff'
                  : '#333',

              fontVariant: ['tabular-nums'],
            }}
            onPress={() => dateClicked(acYr, acMt, item)}>
            {item != -1 ? item : ' '}
          </Text>
        </View>
      );
    });

    React.useEffect(() => {
      SharedStorage.set(
        JSON.stringify({
          text: `${etCalendar.et_weekDays[state.todaysDate.getDay()]}፣${
            etCalendar.et_months[tdMonth - 1]
          } ${tdDate}፣${tdYear}`,
        }),
      );
    });

    return (
      <View
        style={{
          backgroundColor: rowIndex == 0 ? '#3dcc8e' : 'transparent',
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          marginVertical: 3,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {rowItems}
      </View>
    );
  });
  return (
    <View style={{paddingTop: 15}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <View style={{flexDirection: 'row', alignSelf: 'baseline'}}>
          <Ionicons
            name="chevron-back-outline"
            size={28}
            onPress={() => changeMonth(-1)}
          />
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              alignSelf: 'baseline',
              marginVertical: 3,
            }}>
            {etCalendar.et_months[acMt - 2]}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'left',
              alignSelf: 'flex-start',
            }}>
            {etCalendar.et_months[etMonth - 1]} {etYear}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'baseline'}}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'left',
              alignSelf: 'baseline',
              marginVertical: 3,
            }}>
            {etCalendar.et_months[acMt]}
          </Text>

          <Ionicons
            name="chevron-forward-outline"
            size={28}
            onPress={() => changeMonth(+1)}
          />
        </View>
      </View>
      {rows}

      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          margin: 10,
          paddingTop: 15,
        }}>
        {etCalendar.et_weekDays[state.selectedDate.getDay()]}፣
        {etCalendar.et_months[selectedMonth - 1]} {selectedDate}፣{selectedYear}
      </Text>
    </View>
  );
};

export default CustomCalendar;
