import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const Activity = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://your-backend-url.com/api/bookings'); // Replace with your backend URL
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingTitle}>{item.title}</Text>
      <Text style={styles.bookingDate}>{item.date}</Text>
      <Text style={styles.bookingDetails}>{item.details}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4B79A1" />
        <Text>Loading your booking history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Booking History</Text>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()} // Ensure `id` is unique and exists
          renderItem={renderBookingItem}
        />
      ) : (
        <Text style={styles.noBookingsText}>You have no bookings yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookingItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B79A1',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  bookingDetails: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
  },
  noBookingsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Activity;
