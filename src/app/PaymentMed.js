import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, db } from '../config/firebaseConfig';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

const { height, width } = Dimensions.get('window');

const PaymentMed = () => {
  const router = useRouter();

  const [gcashNumber, setGcashNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isGcashLinked, setIsGcashLinked] = useState(false);
  const [isCardLinked, setIsCardLinked] = useState(false);

  const scaleProceed = new Animated.Value(1);

  // Helper to check and load linked payment methods
  const loadLinkedMethods = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const docRef = doc(db, 'paymentMethods', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setGcashNumber(data.gcashNumber || '');
      setCardNumber(data.cardNumber || '');
      setIsGcashLinked(!!data.gcashNumber);
      setIsCardLinked(!!data.cardNumber);
      
    }
  };
  
  React.useEffect(() => {
    loadLinkedMethods();
  }, []);

  const savePaymentToFirebase = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You need to be logged in to save your payment methods.');
      return;
    }

    const paymentData = {
      gcashNumber: gcashNumber || null,
      cardNumber: cardNumber || null,
      timestamp: new Date(),
    };

    try {
      await setDoc(doc(db, 'paymentMethods', user.uid), paymentData, { merge: true });
      Alert.alert('Success', 'Payment methods saved successfully!');
    } catch (error) {
      console.error('Error saving payment data:', error);
      Alert.alert('Error', 'Failed to save payment methods. Please try again.');
    }
  };

  const linkGcash = async () => {
    if (!gcashNumber) {
      Alert.alert('Error', 'Please enter a GCash number to link.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You need to be logged in to link GCash.');
      return;
    }

    try {
      await updateDoc(doc(db, 'paymentMethods', user.uid), {
        gcashNumber: gcashNumber,
      });
      setIsGcashLinked(true);
      Alert.alert('Success', 'GCash number linked successfully!');
    } catch (error) {
      console.error('Error linking GCash:', error);
      Alert.alert('Error', 'Failed to link GCash. Please try again.');
    }
  };

  const unlinkGcash = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You need to be logged in to unlink GCash.');
      return;
    }

    try {
      await updateDoc(doc(db, 'paymentMethods', user.uid), {
        gcashNumber: null,
      });
      setGcashNumber('');
      setIsGcashLinked(false);
      Alert.alert('Success', 'GCash number unlinked successfully!');
    } catch (error) {
      console.error('Error unlinking GCash:', error);
      Alert.alert('Error', 'Failed to unlink GCash. Please try again.');
    }
  };

  const linkCard = async () => {
    if (!cardNumber) {
      Alert.alert('Error', 'Please enter a card number to link.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You need to be logged in to link a card.');
      return;
    }

    try {
      await updateDoc(doc(db, 'paymentMethods', user.uid), {
        cardNumber: cardNumber,
      });
      setIsCardLinked(true);
      Alert.alert('Success', 'Card number linked successfully!');
    } catch (error) {
      console.error('Error linking card:', error);
      Alert.alert('Error', 'Failed to link card. Please try again.');
    }
  };

  const unlinkCard = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You need to be logged in to unlink a card.');
      return;
    }

    try {
      await updateDoc(doc(db, 'paymentMethods', user.uid), {
        cardNumber: null,
      });
      setCardNumber('');
      setIsCardLinked(false);
      Alert.alert('Success', 'Card number unlinked successfully!');
    } catch (error) {
      console.error('Error unlinking card:', error);
      Alert.alert('Error', 'Failed to unlink card. Please try again.');
    }
  };

  const handleProceed = async () => {
    if (!gcashNumber && !cardNumber) {
      Alert.alert(
        'Missing Payment Method',
        'Please enter at least one payment method to proceed.'
      );
      return;
    }

    await savePaymentToFirebase();
    router.push('/Dashboard/(tabs)'); // Replace with your dashboard route
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Edit Payment Methods</Text>
        </View>
      </View>

      {/* GCash Section */}
      <Text style={styles.label}>GCash Number</Text>
      {isGcashLinked ? (
        <View style={styles.linkedContainer}>
          <Text style={styles.linkedText}>Linked: {gcashNumber}</Text>
          <TouchableOpacity onPress={unlinkGcash}>
            <Text style={styles.unlinkButton}>Unlink</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter GCash Number"
            value={gcashNumber}
            onChangeText={setGcashNumber}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={linkGcash}>
            <Text style={styles.linkButton}>Link GCash</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Card Section */}
      <Text style={styles.label}>Card Number</Text>
      {isCardLinked ? (
        <View style={styles.linkedContainer}>
          <Text style={styles.linkedText}>Linked: {cardNumber}</Text>
          <TouchableOpacity onPress={unlinkCard}>
            <Text style={styles.unlinkButton}>Unlink</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={linkCard}>
            <Text style={styles.linkButton}>Link Card</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleProceed}>
        <Text style={styles.saveButtonText}>Proceed</Text>
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
    marginTop: height * 0.02,
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
    backgroundColor: '#E3F4FF',
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

export default PaymentMed;