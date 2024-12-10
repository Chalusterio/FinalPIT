import React, { useState, useEffect } from 'react';
import {
  Alert,
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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const SelectPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false); // Modal visibility state
  const [route, setRoute] = useState('SM Downtown Premiere - Dunkin Gusa'); // Example route
  const navigation = useNavigation();

  // Example for backend fetch
  useEffect(() => {
    // Simulated backend fetch - replace with actual API call when needed
    setTimeout(() => {
      setRoute('SM Downtown Premiere - Dunkin Gusa'); // Set example route
    }, 1000);
  }, []);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleBook = () => {
    if (selectedPayment) {
      setIsConfirmed(true); // Show the confirmation modal
    } else {
      Alert.alert('Error', 'Please select a payment method.');
    }
  };

  const closeModal = () => {
    setIsConfirmed(false); // Close modal
    navigation.navigate('Dashboard/(tabs)', { screen: 'index' }); // Navigate to index.js in Dashboard (tabs)
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
          <View style={styles.busInfo}>
            <Text style={styles.text}>Bus</Text>
            <Text style={styles.price}>₱12.00</Text>
          </View>
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
                  {route && (
                    <>
                      {/* Split the route into two lines */}
                      <Text style={styles.routeText}>
                        {route.split(' - ')[0]}
                      </Text>
                      <Text style={styles.routeText}>
                        - {route.split(' - ')[1]}
                      </Text>
                    </>
                  )}
                </View>
                <Text style={styles.price}>₱12.00</Text>
              </View>
            </View>
            <Text style={styles.confirmText}>
              Your Booking has been confirmed!
            </Text>
            <FontAwesome6 name="check-circle" size={60} color="#A1EEBD" />
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
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  busInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B79A1',
    textAlign: 'center',
    marginTop: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B79A1',
    marginTop: 5,
  },
  locationImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  paymentButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F7F9FC',
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0D7E3',
    transform: [{ scale: 1 }],
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
    elevation: 3,
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
    marginTop: 20,
    elevation: 2,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  confirmText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B79A1',
    marginVertical: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4B79A1',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default SelectPayment;
