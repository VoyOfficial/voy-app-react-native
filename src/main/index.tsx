import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const Main: React.FC = () => {
  return (
    <View style={styles.sectionContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Voy!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Main;
