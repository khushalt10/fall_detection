/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Value = ({name, value}) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{String(value).substr(0, 8)}</Text>
  </View>
);

setUpdateIntervalForType(SensorTypes.accelerometer, 800);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [ax, setX] = useState(0);
  const [ay, setY] = useState(0);
  const [az, setZ] = useState(0);
  const [oldRootSquare, setOldRootSquare] = useState(0);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    accelerometer.subscribe(({x, y, z}) => {
      setX(x);
      setY(y);
      setZ(z);
      const rootSquare = Math.sqrt(
        Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2),
      );
      console.log('difff', Math.abs(rootSquare - oldRootSquare));
      if (rootSquare < 2.0) {
        Alert.alert('Fall Detetced', rootSquare.toString(), [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        console.log('rootSquare');
      }
      setOldRootSquare(rootSquare);

      // next: add code for detecting if car goes out of bounds
    });
  }, [oldRootSquare]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.container}>
            <Text style={styles.headline}>Accelerometer values</Text>
            <Value name="x" value={ax} />
            <Value name="y" value={ay} />
            <Value name="z" value={az} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20,
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
