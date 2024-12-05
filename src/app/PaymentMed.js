import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentMed = () => {
  const router = useRouter();

  // Animation states for buttons
  const [scaleClose] = useState(new Animated.Value(1));
  const [scaleAddPayment] = useState(new Animated.Value(1));
  const [scaleAddGcash] = useState(new Animated.Value(1));

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale, action) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      action();
    });
  };

  const handleClose = () => {
    router.push('/Dashboard/(tabs)/Account');
  };

  const handleAddPaymentMethod = () => {
    // Add your logic for adding a payment method here
    alert("Add Payment Method clicked!");
  };

  const handleAddGcash = () => {
    // Add your logic for adding GCash here
    alert("Add GCash clicked!");
  };

  return (
    <View style={styles.background}>
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
          <Text style={styles.headerText}>Payment Methods</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.overlay}>
        <Animated.View style={{ transform: [{ scale: scaleAddPayment }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scaleAddPayment)}
            onPressOut={() => handlePressOut(scaleAddPayment, handleAddPaymentMethod)}
            style={[styles.option, styles.shadow]}
          >
            <Text style={styles.optionText}>+ADD PAYMENT METHOD</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleAddGcash }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scaleAddGcash)}
            onPressOut={() => handlePressOut(scaleAddGcash, handleAddGcash)}
            style={[styles.option, styles.shadow]}
          >
            <Text style={styles.optionText}>+ADD GCASH</Text>
          </TouchableOpacity>
          <Text style={styles.gcashText}>Enjoy cashless ride experience!</Text>
        </Animated.View>
      </View>
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
    textAlign: 'center',
  },
  gcashText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4B79A1',
    textAlign: 'center',
  },
});

export default PaymentMed;
