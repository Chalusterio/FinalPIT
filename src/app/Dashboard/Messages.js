import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Messages = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Messages</Text>
      <Text style={styles.subtitle}>Enjoy exploring the app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Messages;
