import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentMethods = () => {
  const router = useRouter();
  
  const [gcashNumber, setGcashNumber] = useState(''); // State for GCash number
  const [cardNumber, setCardNumber] = useState(''); // State for Card number
  const [isGcashLinked, setIsGcashLinked] = useState(false); // Track GCash link state
  const [isCardLinked, setIsCardLinked] = useState(false); // Track Card link state

  const handleSave = () => {
    // Saving logic for GCash and Card numbers
    console.log('Payment methods saved:', { gcashNumber, cardNumber });

    // Assume saving is successful; mark both as linked
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
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="#4B79A1" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Edit Payment Methods</Text>

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
      <Button title="Save Payment Methods" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EAF2F8',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#4B79A1',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#4B79A1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  linkedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DFF0D8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  linkedText: {
    fontSize: 16,
    color: '#4B79A1',
  },
  unlinkButton: {
    color: '#D9534F',
    fontWeight: '600',
  },
});

export default PaymentMethods;
