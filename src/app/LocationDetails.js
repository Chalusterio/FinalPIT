import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LocationDetails = ({ route }) => {
  // Safely access route parameters
  const location = route?.params?.location || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Details</Text>
      <Text>Name: {location.name || 'Unknown'}</Text>
      <Text>Latitude: {location.latitude || 'N/A'}</Text>
      <Text>Longitude: {location.longitude || 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LocationDetails;
