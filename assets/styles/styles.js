import {StyleSheet, Platform, Dimensions} from 'react-native';

const statusBar =
  Dimensions.get('screen').height - Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe',
    paddingTop: 20,
  },
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
