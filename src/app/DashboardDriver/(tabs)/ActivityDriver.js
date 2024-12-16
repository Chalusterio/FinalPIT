import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ActivityDriver = () => {
  const [bookings, setBookings] = useState([]); // Stores bookings from the backend
  const [loading, setLoading] = useState(false); // Loading state
  const [buttonState, setButtonState] = useState('Time In'); // Tracks button state

  const db = getFirestore(); // Firestore instance
  const auth = getAuth(); // Firebase Auth instance

  const handleButtonClick = async () => {
    try {
      const currentUser = auth.currentUser; // Get the currently logged-in user

      if (!currentUser) {
        console.error('No user is currently logged in');
        return;
      }

      const newState = buttonState === 'Time In' ? 'Time Out' : 'Time In';

      // Save data to Firestore
      await addDoc(collection(db, 'driverTito'), {
        type: buttonState, // Save current state (before toggling)
        userID: currentUser.uid, // Save the user ID
        createdAt: serverTimestamp(), // Save the timestamp
      });

      // Update button state
      setButtonState(newState);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

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
        <Text style={styles.sectionSubtitle}>Recent</Text>
      </View>

      <Button
        title={buttonState}
        onPress={handleButtonClick}
        color={buttonState === 'Time In' ? '#4CAF50' : '#F44336'}
      />

      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
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
          )}
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
