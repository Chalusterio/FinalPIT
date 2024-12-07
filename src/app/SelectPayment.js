import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelectPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigation = useNavigation(); // Hook to access navigation

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleBook = () => {
    if (selectedPayment) {
      alert('Payment Selected: ' + selectedPayment);
    } else {
      alert('Please select a payment method');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Payment</Text>
      </View>

      {/* Location Section */}
      <View style={styles.locationContainer}>
        <Image
          source={require('../../assets/loading2.png')} // Replace with actual image path
          style={styles.locationImage}
        />
        <Text style={styles.locationText}>Location 1: SM Downtown Premiere</Text>
        <Image
          source={require('../../assets/unloading3.png')} // Replace with actual image path
          style={styles.locationImage}
        />
        <Text style={styles.locationText}>Location 2: Dunkin Gusa</Text>
      </View>

      {/* Bus and Time Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.busText}>Bus</Text>
        <Text style={styles.timeText}>19:53 - 20:03 drop off</Text>
        <Text style={styles.priceText}>₱12.00</Text>
      </View>

      {/* Payment Method Section */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>Payment Method:</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[styles.paymentOption, selectedPayment === 'Cards' && styles.selectedPayment]}
            onPress={() => handlePaymentSelect('Cards')}
          >
            <Text style={styles.paymentText}>Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentOption, selectedPayment === 'GCash' && styles.selectedPayment]}
            onPress={() => handlePaymentSelect('GCash')}
          >
            <Text style={styles.paymentText}>GCash</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5, // Add padding for proper spacing from the edges
    paddingTop: 0, // Ensure it's not too close to the top of the screen
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 50, // Adjusted for visibility and proper size
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Make sure the title is centered by taking the remaining space
    textAlign: 'center', // Center the title
    marginLeft: 10, // Adds some space between the back button and the title
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  locationText: {
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#4B79A1',
    padding: 5,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  busText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    color: '#555',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentMethods: {
    flexDirection: 'row',
    marginTop: 10,
  },
  paymentOption: {
    flex: 1,
    padding: 12,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPayment: {
    backgroundColor: '#007BFF',
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectPayment;
