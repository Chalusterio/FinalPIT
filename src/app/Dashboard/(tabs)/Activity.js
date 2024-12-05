import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

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
    <TouchableOpacity style={styles.bookingItem}>
      <View>
        <Text style={styles.bookingTitle}>{item.title}</Text>
        <Text style={styles.bookingDate}>{item.date}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.bookingPrice}>₱{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4B79A1" />
        <Text style={styles.loaderText}>Loading your booking history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Activity</Text>
        {/* Show "Recent" only if there are bookings */}
        {bookings.length > 0 && <Text style={styles.sectionSubtitle}>Recent</Text>}
      </View>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noBookingsContainer}>
          <Text style={styles.noBookingsText}>You have no bookings yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 20,
  },
  header: {
    marginTop: 30, // Added margin to push the header down
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 35, // Increased font size for "Activity"
    fontWeight: 'bold',
    color: '#4B79A1',
    textAlign: 'left', // Aligned to the left
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 10, // Added margin for spacing between "Activity" and "Recent"
    textAlign: 'left',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B79A1',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  priceContainer: {
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B79A1',
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  noBookingsText: {
    fontSize: 16,
    color: '#4B79A1',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B79A1',
  },
});

export default Activity;
