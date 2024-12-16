import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const PaymentMethods = () => {
  const router = useRouter();

  const [gcashNumber, setGcashNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isGcashLinked, setIsGcashLinked] = useState(false);
  const [isCardLinked, setIsCardLinked] = useState(false);

  const scaleClose = new Animated.Value(1);

  const handlePressIn = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (animatedValue, action) => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => action());
  };

  const handleClose = () => {
    router.back();
  };

  const handleSave = () => {
    console.log('Payment methods saved:', { gcashNumber, cardNumber });
    if (gcashNumber) setIsGcashLinked(true);
    if (cardNumber) setIsCardLinked(true);
  };

  const handleUnlinkGcash = () => {
    setGcashNumber('');
    setIsGcashLinked(false);
  };

  const handleUnlinkCard = () => {
    setCardNumber('');
    setIsCardLinked(false);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Animated.View style={{ transform: [{ scale: scaleClose }] }}>
            <TouchableOpacity
              onPressIn={() => handlePressIn(scaleClose)}
              onPressOut={() => handlePressOut(scaleClose, handleClose)}
            >
              <MaterialIcons name="close" size={28} color="#4B79A1" />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.headerText}>Edit Payment Methods</Text>
        </View>
      </View>

      {/* GCash Section */}
      <Text style={styles.label}>GCash Number</Text>
      {isGcashLinked ? (
        <View style={styles.linkedContainer}>
          <Text style={styles.linkedText}>Linked: {gcashNumber}</Text>
          <TouchableOpacity onPress={handleUnlinkGcash}>
            <Text style={styles.unlinkButton}>Unlink</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter GCash Number"
          value={gcashNumber}
          onChangeText={setGcashNumber}
          keyboardType="numeric"
        />
      )}

      {/* Card Section */}
      <Text style={styles.label}>Card Number</Text>
      {isCardLinked ? (
        <View style={styles.linkedContainer}>
          <Text style={styles.linkedText}>Linked: {cardNumber}</Text>
          <TouchableOpacity onPress={handleUnlinkCard}>
            <Text style={styles.unlinkButton}>Unlink</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Payment Methods</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.12,
    backgroundColor: '#EAF2F8',
  },
  header: {
    height: height * 0.12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E4E8',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
  },
  headerText: {
    textAlign: 'center',
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#4B79A1',
    flex: 1,
  },
  label: {
  fontSize: 16,
  color: '#4B79A1',
  marginBottom: 8,
  fontWeight: '600',
  marginHorizontal: width * 0.04,
  marginTop: height * 0.02, // Add this line to push the label down slightly
},
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    marginHorizontal: width * 0.04,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  linkedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: width * 0.04,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'linear-gradient(90deg, #E3F4FF 0%, #BDE7FF 100%)',
    borderColor: '#4B79A1',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  linkedText: {
    fontSize: 16,
    color: '#4B79A1',
    fontWeight: '500',
  },
  unlinkButton: {
    fontSize: 16,
    color: '#FA4032',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#4B79A1',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: width * 0.04,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});


export default PaymentMethods;
