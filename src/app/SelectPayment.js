import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SelectPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigation = useNavigation();

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method); // Highlight the selected method
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
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <MaterialIcons name="close" size={28} color="#4B79A1" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Payment</Text>
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
            style={[
              styles.paymentOption,
              selectedPayment === 'Cards' && styles.selectedPayment, // Highlight if selected
            ]}
            onPress={() => handlePaymentSelect('Cards')}
          >
            <Text style={styles.paymentText}>Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === 'GCash' && styles.selectedPayment, // Highlight if selected
            ]}
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
    backgroundColor: '#EAF2F8',
    padding: 10,
  },
  header: {
    height: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  closeButton: {
    paddingHorizontal: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  locationContainer: {
    marginTop: 120,
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
    color: '#4B79A1',
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
  },
  selectedPayment: {
    backgroundColor: '#4B79A1',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  bookButton: {
    backgroundColor: '#4B79A1',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectPayment;
