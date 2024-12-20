import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

const ActivityDriver = () => {
  const [bookings, setBookings] = useState([]); // Stores bookings from the backend
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a backend API call with mock data
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Mock data to simulate a response from the backend
        const data = [
          { id: 1, title: "Drive to USTP", date: "04 Dec 2024, 15:00", price: 69.0 },
          { id: 2, title: "Drive to Snooks", date: "04 Dec 2024, 15:00", price: 100.0 },
          { id: 3, title: "Drive to DTL", date: "04 Dec 2024, 15:00", price: 69.0 },
          { id: 4, title: "Drive to SM Uptown", date: "04 Dec 2024, 15:00", price: 110.0 },
        ];
        setBookings(data); // Update bookings state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchBookings();
  }, []);

  // Renders individual booking items
  const renderBookingItem = ({ item }) => (
    <TouchableOpacity style={styles.bookingItem}>
      <View style={styles.bookingInfo}>
        <FontAwesome name="bus" size={24} color="black" style={styles.busIcon} />
        <View>
          <Text style={styles.bookingTitle}>{item.title}</Text>
          <Text style={styles.bookingDate}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.bookingPrice}>₱{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    // Show loading spinner while fetching data
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
        {bookings.length > 0 && <Text style={styles.sectionSubtitle}>Recent</Text>}
      </View>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()} // Use `id` as a unique key
          renderItem={renderBookingItem} // Render individual booking items
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
    backgroundColor: "#EAF2F8",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF2F8",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4B79A1",
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#4B79A1",
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bookingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  busIcon: {
    marginRight: 10,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B79A1",
  },
  bookingDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  priceContainer: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B79A1",
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noBookingsText: {
    fontSize: 16,
    color: "#4B79A1",
  },
});

export default ActivityDriver;
