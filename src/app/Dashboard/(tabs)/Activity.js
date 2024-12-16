import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db, auth } from '../../../config/firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { format } from 'date-fns';

const { width } = Dimensions.get('window');

const Activity = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // Track selected booking

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!currentUser) return;

      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where('userID', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        const userBookings = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.timestamp?.toDate();
          userBookings.push({
            id: doc.id,
            ...data,
            formattedDate: date ? format(date, 'PPP p') : 'No Date Provided',
          });
        });

        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserBookings();
    }
  }, [currentUser]);

  const handleStatusChange = async (bookingId) => {
    try {
      const bookingDocRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingDocRef, { status: 'Completed' });
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: 'Completed' } : booking
        )
      );
      setSelectedBooking(null); // Deselect booking after update
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.bookingItem, selectedBooking === item.id && styles.selectedBookingItem]}
      onPress={() => setSelectedBooking(selectedBooking === item.id ? null : item.id)}
    >
      <View style={styles.bookingInfo}>
        <FontAwesome name="bus" size={24} color="black" style={styles.busIcon} />
        <View>
          <Text style={styles.bookingTitle}>
            Ride from {item.l_spot} to {item.ul_spot}
          </Text>
          <Text style={styles.bookingDate}>{item.formattedDate}</Text>
          <Text style={styles.bookingType}>Status: {item.status}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.bookingPrice}>₱{item.price ? item.price.toFixed(2) : '0.00'}</Text>
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
        {bookings.length > 0 && <Text style={styles.sectionSubtitle}>Recent</Text>}
      </View>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noBookingsContainer}>
          <Text style={styles.noBookingsText}>You have no bookings yet.</Text>
          <Text style={styles.noBookingsSubText}>Start your journey by booking your first ride!</Text>
        </View>
      )}
      {selectedBooking && (
        <View style={styles.actionButtonContainer}>
          <Button
            title="Mark as Completed"
            onPress={() => handleStatusChange(selectedBooking)}
            color="#4B79A1"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: width * 0.05,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F8',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B79A1',
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4B79A1',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 10,
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
    backgroundColor: '#D6E6F2',
    borderRadius: 12,
    elevation: 4,
  },
  selectedBookingItem: {
    backgroundColor: '#BFD9E5',
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busIcon: {
    marginRight: 10,
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
  bookingType: {
    fontSize: 14,
    color: '#4B79A1',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B79A1',
    marginBottom: 10,
  },
  noBookingsSubText: {
    fontSize: 16,
    color: '#666',
  },
  actionButtonContainer: {
    padding: 20,
    backgroundColor: '#EAF2F8',
  },
});

export default Activity;
