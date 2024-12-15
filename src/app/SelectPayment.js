import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../config/firebaseConfig'; // Ensure auth is imported
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const SelectPayment = () => {
  const router = useRouter(); // Initialize router
  const route = useRoute();

  const { loadingSpot, unloadingSpot } = route.params;
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch the current logged-in user
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handlePaymentSelect = (paymentMethod) => {
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to book a ticket.');
      return;
    }

    Alert.alert(
      'Confirm Payment',
      `You have selected ${paymentMethod} as your payment method. Do you want to confirm?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              // Fetch all bookings to determine the next booking ID
              const bookingsCollection = collection(db, 'bookings');
              const querySnapshot = await getDocs(bookingsCollection);

              const bookingID = querySnapshot.size + 1; // Increment the last ID

              const newBooking = {
                bookingID,
                l_spot: loadingSpot.name,
                ul_spot: unloadingSpot.name,
                payment_method: paymentMethod,
                price: 12, // Static value
                status: 'Ongoing', // Static value
                userID: currentUser.uid, // Add the logged-in user's ID
              };

              // Add the booking to Firestore
              await addDoc(bookingsCollection, newBooking);

              // Show success pop-up
              Alert.alert('Success', 'Your ticket has been successfully booked!', [
                {
                  text: 'OK',
                  onPress: () => router.push('/Dashboard/(tabs)'), // Correct route for the "Home" tab
                },
              ]);              
            } catch (error) {
              console.error('Error saving booking: ', error);
              Alert.alert('Error', 'Failed to book your ticket. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Payment</Text>
      </View>

      <View style={styles.spotDetailsContainer}>
        <View style={styles.spotDetail}>
          <Text style={styles.spotLabel}>Loading Spot</Text>
          <Image source={loadingSpot.image} style={styles.spotImage} />
          <Text style={styles.spotName}>{loadingSpot.name}</Text>
        </View>
        <View style={styles.spotDetail}>
          <Text style={styles.spotLabel}>Unloading Spot</Text>
          <Image source={unloadingSpot.image} style={styles.spotImage} />
          <Text style={styles.spotName}>{unloadingSpot.name}</Text>
        </View>
      </View>

      <Text style={styles.paymentTitle}>Choose a Payment Method</Text>

      <View style={styles.paymentMethodsContainer}>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => handlePaymentSelect('Cash')}
        >
          <Text style={styles.paymentButtonText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => handlePaymentSelect('Credit Card')}
        >
          <Text style={styles.paymentButtonText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => handlePaymentSelect('E-Wallet')}
        >
          <Text style={styles.paymentButtonText}>E-Wallet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  header: {
    backgroundColor: '#4B79A1',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  spotDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  spotDetail: {
    alignItems: 'center',
  },
  spotLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  spotImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0D7E3',
  },
  spotName: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 20,
  },
  paymentMethodsContainer: {
    marginHorizontal: 20,
  },
  paymentButton: {
    backgroundColor: '#4B79A1',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectPayment;
