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
    backgroundColor: '#EAF2F8', // Matches the Transport.js background color
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B79A1', // Matches the header theme
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  backButton: {
    paddingHorizontal: 5,
  },
  backButtonText: {
    fontSize: 20,
    color: '#FFFFFF', // White for better visibility
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginLeft: -30, // Align the title centrally without adjusting back button spacing
  },
  locationContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  locationImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  locationText: {
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#4B79A1',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  busText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B79A1', // Matches the theme
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F7F9FC',
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0D7E3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  selectedPayment: {
    backgroundColor: '#4B79A1', // Matches the header and theme
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  bookButton: {
    backgroundColor: '#4B79A1',
    padding: 16,
    borderRadius: 30, // Rounded pill shape
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectPayment;
