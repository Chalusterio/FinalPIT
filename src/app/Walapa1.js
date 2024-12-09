import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Walapa1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Walapa1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F8',
  },
  text: {
    fontSize: 20,
    color: '#4B79A1',
  },
});

export default Walapa1;
