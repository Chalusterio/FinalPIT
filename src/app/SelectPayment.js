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
    <View style={styles.background}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="close" size={28} color="#4B79A1" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Select Payment</Text>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.overlay}>
        {/* Location Section */}
        <View style={[styles.option, styles.shadow]}>
          <Image
            source={require('../../assets/loading2.png')} // Replace with actual image path
            style={styles.locationImage}
          />
          <Text style={styles.optionText}>Location 1: SM Downtown Premiere</Text>
          <Image
            source={require('../../assets/unloading3.png')} // Replace with actual image path
            style={styles.locationImage}
          />
          <Text style={styles.optionText}>Location 2: Dunkin Gusa</Text>
        </View>

        {/* Bus and Time Section */}
        <View style={[styles.option, styles.shadow]}>
          <Text style={styles.optionText}>Bus</Text>
          <Text style={styles.timeText}>19:53 - 20:03 drop off</Text>
          <Text style={styles.priceText}>₱12.00</Text>
        </View>

        {/* Payment Method Section */}
        <View style={styles.option}>
          <Text style={styles.optionText}>Payment Method:</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'Cards' && styles.selectedPayment, // Highlight if selected
              ]}
              onPress={() => handlePaymentSelect('Cards')}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedPayment === 'Cards' && styles.selectedPaymentText,
                ]}
              >
                Cards
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'GCash' && styles.selectedPayment, // Highlight if selected
              ]}
              onPress={() => handlePaymentSelect('GCash')}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedPayment === 'GCash' && styles.selectedPaymentText,
                ]}
              >
                GCash
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={[styles.bookButton, styles.shadow]}
          onPress={handleBook}
        >
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EAF2F8',
  },
  header: {
    height: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B79A1',
  },
  locationImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: 'cover',
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
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  selectedPaymentText: {
    color: '#FFFFFF', // Ensure the text remains visible
    fontWeight: '700',
  },
  bookButton: {
    backgroundColor: '#4B79A1',
    borderRadius: 25,
    paddingVertical: 12,
    alignSelf: 'center',
    width: '90%',
    marginTop: 40,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default SelectPayment;
