import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SelectPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false); // Modal visibility state
  const navigation = useNavigation();

  // Handle Payment Selection
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  // Handle Booking Confirmation
  const handleBook = () => {
    if (selectedPayment) {
      setIsConfirmed(true); // Show the confirmation modal
    } else {
      Alert.alert('Error', 'Please select a payment method.');
    }
  };

  // Close Confirmation Modal
  const closeModal = () => {
    setIsConfirmed(false); // Close modal
    navigation.goBack('Home'); // Navigate back after confirming the booking
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

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Location Details */}
        <View style={[styles.card, styles.shadow]}>
          <Image
            source={require('../../assets/loading2.png')}
            style={styles.locationImage}
          />
          <Text style={styles.text}>Location 1: SM Downtown Premiere</Text>

          <Image
            source={require('../../assets/unloading3.png')}
            style={styles.locationImage}
          />
          <Text style={styles.text}>Location 2: Dunkin Gusa</Text>
        </View>

        {/* Bus & Fare Details */}
        <View style={[styles.card, styles.shadow]}>
          <Text style={styles.text}>Bus</Text>
          <Text style={styles.price}>₱12.00</Text>
        </View>

        {/* Payment Selection */}
        <View style={styles.card}>
          <Text style={styles.text}>Payment Method:</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentButton,
                selectedPayment === 'Cards' && styles.selected,
              ]}
              onPress={() => handlePaymentSelect('Cards')}
            >
              <Text
                style={[
                  styles.paymentText,
                  selectedPayment === 'Cards' && styles.selectedText,
                ]}
              >
                Cards
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentButton,
                selectedPayment === 'GCash' && styles.selected,
              ]}
              onPress={() => handlePaymentSelect('GCash')}
            >
              <Text
                style={[
                  styles.paymentText,
                  selectedPayment === 'GCash' && styles.selectedText,
                ]}
              >
                GCash
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Booking Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal visible={isConfirmed} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalCard}>
              <View style={styles.busInfo}>
                <MaterialIcons name="directions-bus" size={28} color="#4B79A1" />
                <View style={styles.busDetails}>
                  <Text style={styles.text}>Bus</Text>
                </View>
                <Text style={styles.price}>₱12.00</Text>
              </View>
            </View>
            <Text style={styles.confirmText}>Your Ticket has been confirmed!</Text>
            <MaterialIcons name="check-circle" size={60} color="green" />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Stylesheet
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
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
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B79A1',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#555555',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B79A1',
    marginTop: 5,
  },
  locationImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paymentButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F7F9FC',
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D0D7E3',
    borderWidth: 1,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B79A1',
  },
  selected: {
    backgroundColor: '#4B79A1',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bookButton: {
    backgroundColor: '#4B79A1',
    borderRadius: 25,
    paddingVertical: 12,
    alignSelf: 'center',
    width: '90%',
    marginTop: 15,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  confirmText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B79A1',
    marginVertical: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4B79A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SelectPayment;
