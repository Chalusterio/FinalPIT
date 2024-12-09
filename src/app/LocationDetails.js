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

      <Text style={styles.subTitle}>Bookings:</Text>
      {location.bookings && location.bookings.length > 0 ? (
        location.bookings.map((booking, index) => (
          <Text key={index} style={styles.bookingText}>
            {index + 1}. {booking}
          </Text>
        ))
      ) : (
        <Text>No bookings available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  bookingText: {
    fontSize: 16,
  },
});

export default LocationDetails;
