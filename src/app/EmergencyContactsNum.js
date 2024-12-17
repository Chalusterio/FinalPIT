import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { db } from './firebase'; // Import Firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const { width } = Dimensions.get('window');

const EmergencyContactsNum = () => {
  const router = useRouter();
  const [contactName, setContactName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [relation, setRelation] = useState('');

  const handleSave = async () => {
    if (!contactName || !mobileNumber || !relation) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(mobileNumber)) {
      Alert.alert('Error', 'Please enter a valid mobile number.');
      return;
    }

    try {

      // Save contact to Firestore
      await addDoc(collection(db, 'emergencyContactsNum'), {
        contactName: contactName.trim(),
        mobileNumber: mobileNumber.trim(),
        relation: relation.trim(),
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Contact saved successfully!');
      router.push('/EmergencyContacts');
    } catch (error) {
      console.error('Error saving contact:', error.message);
      Alert.alert('Error', 'Could not save contact. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#4B79A1" />
      </TouchableOpacity>

      <Text style={styles.header}>Add Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name of Contact Person"
        value={contactName}
        onChangeText={setContactName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Relationship (e.g., Friend, Parent)"
        value={relation}
        onChangeText={setRelation}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B79A1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: width * 0.045,
  },
  saveButton: {
    backgroundColor: '#4B79A1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
});

export default EmergencyContactsNum;

